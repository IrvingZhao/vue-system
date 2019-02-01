import Api from './api'

export default {
    namespaced: true,
    state: {
        resources: []
    },
    mutations: {
        updateResource(state, resources) {
            state.resources = resources;
        }
    },
    actions: {
        updateResource(context) {
            Api.list().then(({body}) => {
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