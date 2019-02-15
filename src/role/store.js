import Vue from 'vue';
import Api from './api';
import {Store} from 'xlb-platform'

export default {
    namespaced: true,
    state: {
        ...Store.pageStates,
        // ...pageStates,
        roles: [],
        allAuthMenuTree: [],
        pageMap: {},
        pageKeyMap: {},
        allOperatorMap: {}
    },
    mutations: {
        ...Store.pageMutations,
        // ...pageMutations,
        updateRoles(state, roles) {
            state.pageInfo.total = roles.total;
            state.roles = roles.list;
        },
        updateAllAuthObject(state, {menus, operators}) {
            state.allAuthMenuTree = Vue.$util.generateTree(menus);

            let pageMap = {};
            let operatorMap = {};
            //构建 page key value对象
            operators.forEach((item) => {
                if (item.type === "page") {
                    pageMap[item.id] = item;
                    state.pageKeyMap[item.key] = item;
                } else if (item.type === "operator") {
                    operatorMap[item.id] = item;
                }
            });
            for (let operatorKey in operatorMap) {
                if (operatorMap.hasOwnProperty(operatorKey)) {
                    let itemOperator = operatorMap[operatorKey];
                    let page = pageMap[itemOperator.pageId];
                    let refPage = pageMap[itemOperator.refPageId];
                    if (page) {
                        //关联 page 和 operators
                        (page.operators = page.operators || []).push(itemOperator);
                    }
                    if (refPage) {
                        //构建 operator 树
                        itemOperator.children = (refPage.operators = refPage.operators || []);
                    }
                }
            }
            state.pageMap = pageMap;
            state.allOperatorMap = operatorMap;
        }
    },
    actions: {
        updateAllAuthObject(context) {
            Api.auth.getAllAuthObject().then(({body}) => {
                const {code, data} = body;
                if ("000000" === code) {
                    context.commit("updateAllAuthObject", data);
                }
            })
        },
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
        },
        getPageOperators: (state) => (pageId) => {
            return state.pageMap[pageId].operators;
        }
    }
}