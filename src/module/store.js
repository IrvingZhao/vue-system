import Api from './api';
import Vue from "vue";

export default {
    namespaced: true,
    state: {
        moduleMap: {},
        modules: [],
        pageList: [],
        pageMap: {}
    },
    mutations: {
        updateModules(state, modules) {
            let moduleMap = {};
            state.modules = Vue.$util.generateTree(modules, "parentNode", moduleMap);

            state.moduleMap = moduleMap;
        },
        updatePages(state, pages) {
            pages.forEach(item => {
                state.pageMap[item.id] = item;
            });
            state.pageList = pages;
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
        },
        updatePages(context, moduleId) {
            Api.page.list(moduleId).then(({body}) => {
                const {code, msg, data} = body;
                if ("000000" === code) {
                    context.commit("updatePages", data);
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