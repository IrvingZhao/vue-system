import Api from './api'
import {pageStates, pageMutations} from "../base/BaseStore";

export default {
    namespaced: true,
    state: {
        resources: [],
        ...pageStates
    },
    mutations: {
        updateResource(state, resources) {
            state.pageInfo.total = resources.total;
            state.resources = resources.list;
        },
        ...pageMutations
    },
    actions: {
        updateResource(context) {
            Api.list({
                pageIndex: context.state.pageInfo.pageIndex,
                pageSize: context.state.pageInfo.pageSize,
                ...context.state.query
            }).then(({body}) => {
                const {code, data} = body;
                if ("000000" === code) {
                    context.commit("updateResource", data);
                }
            })
        }
    },
    getters: {
        api() {
            return Api;
        },
    }
}