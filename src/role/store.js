import Api from './api';
import {pageStates, pageMutations} from "../base/BaseStore";

export default {
    namespaced: true,
    state: {
        ...pageStates,
        roles: []
    },
    mutations: {
        ...pageMutations,
        updateRoles(state, roles) {
            state.pageInfo.total = roles.total;
            state.roles = roles.list;
        }
    },
    actions: {
        updateRoles(context) {
            Api.list({
                pageIndex: context.state.pageInfo.pageIndex,
                pageSize: context.state.pageInfo.pageSize,
                ...context.state.query
            }).then(({body}) => {
                const {code, data} = body;
                if ("000000" === code) {
                    context.commit("updateRoles", data);
                }
            })
        },
    },
    getters: {
        api() {
            return Api;
        }
    }
}