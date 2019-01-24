import Api from './api';
import Vue from "vue";

export default {
    namespaced: true,
    state: {
        moduleMap: {},
        modules: []
    },
    mutations: {
        updateModules(state, modules) {
            let moduleMap = {};
            state.modules = Vue.$util.generateTree(modules, "parentNode", moduleMap);

            state.moduleMap = moduleMap;
        }
    },
    actions: {
        updateModules(context) {
            Api.list().then(({body}) => {
                const {code, msg, data} = body;
                if ("000000" === code) {
                    context.commit("updateModules", data);
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