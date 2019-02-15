import Api from './api'
import {Store} from 'xlb-platform'

export default {
    namespaced: true,
    state: {
        resources: [],
        ...Store.pageStates
    },
    mutations: {
        updateResource(state, resources) {
            state.pageInfo.total = resources.total;
            state.resources = resources.list;
        },
        ...Store.pageMutations
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