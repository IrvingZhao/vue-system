import Api from './api';
import Vue from "vue";

export default {
    namespaced: true,
    state: {
        moduleMap: {},
        modules: [],
        disabledId: "",
        pageList: [],
        pageMap: {},
        operators: [],
        operatorMap: {},
        modulePageTree: [],
        modulePageTreeMap: {},
        resourceList: []
    },
    mutations: {
        updateModules(state, modules) {
            let moduleMap = {};
            state.modules = Vue.$util.generateTree(modules, "parentNode", moduleMap);
            state.moduleMap = moduleMap;

            if (state.disabledId && moduleMap[state.disabledId]) {
                moduleMap[state.disabledId].disabled = true;
            }
        },
        clearDisable(state) {
            state.disabledId = "";
            for (let item in state.moduleMap) {
                if (state.moduleMap.hasOwnProperty(item)) {
                    state.moduleMap[item].disabled = false;
                }
            }
        },
        setDisabled(state, disableId) {
            state.disabledId = disableId;
            if (state.moduleMap[disableId]) {
                state.moduleMap[disableId].disabled = true;
            }
        },
        updatePages(state, pages) {
            pages.forEach(item => {
                state.pageMap[item.id] = item;
            });
            state.pageList = pages;
        },
        updateOperators(state, operators) {
            operators.forEach((item) => {
                Vue.set(state.operatorMap, item.id, item);
            });
            state.operators = operators;
        },
        updateAllModulePage(state, modulePages) {
            let moduleTreeMap = {};
            state.modulePageTree = Vue.$util.generateTree(modulePages, "parentNode", moduleTreeMap);
            for (let key in moduleTreeMap) {
                if (moduleTreeMap.hasOwnProperty(key)) {
                    let item = moduleTreeMap[key];
                    if (item.type === "module" && !item.children) {
                        item.disabled = true;
                    }
                }
            }
            state.modulePageTreeMap = moduleTreeMap;
        },
        updateResource(state, resources) {
            state.resourceList = resources;
        }
    },
    actions: {
        updateModules(context) {
            Api.list().then(({body}) => {
                const {code, data} = body;
                if ("000000" === code) {
                    context.commit("updateModules", data);
                }
            })
        },
        updatePages(context, moduleId) {
            if (context.state.modules.length === 0) {
                context.dispatch("updateModules");
            }
            Api.page.list(moduleId).then(({body}) => {
                const {code, data} = body;
                if ("000000" === code) {
                    context.commit("updatePages", data);
                }
            })
        },
        updateOperators(context, {moduleId, pageId}) {
            if (context.state.pageList.length === 0) {
                context.dispatch("updatePages", moduleId)
            }
            Api.operator.list(pageId).then(({body}) => {
                const {code, data} = body;
                if ("000000" === code) {
                    context.commit("updateOperators", data);
                }
            });
        },
        updateAllModulePage(context) {
            Api.modulePage.list().then(({body}) => {
                const {code, data} = body;
                if ("000000" === code) {
                    context.commit("updateAllModulePage", data);
                }
            })
        },
        updateResource(context, {type, sourceId}) {
            Api.resource.list(type, sourceId).then(({body}) => {
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