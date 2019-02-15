import Api from './api';
import {pageStates, pageMutations} from "../base/BaseStore";

export default {
    namespaced: true,
    state: {
        ...pageStates,
        properties: [],
    },
    mutations: {
        ...pageMutations,
        updateProperties(state, data) {
            state.pageInfo.total = data.total;
            state.properties = data.list;
        }
    },
    actions: {
        updateProperties(context) {
            Api.list({
                pageIndex: context.state.pageInfo.pageIndex,
                pageSize: context.state.pageInfo.pageSize,
                ...context.state.query
            }).then(({body}) => {
                const {code, data} = body;
                if ("000000" === code) {
                    context.commit("updateProperties", data);
                }
            })
        }
    },
    getters: {
        api() {
            return Api;
        }
    }
}