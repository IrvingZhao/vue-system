import Vue from 'vue';
import Api from './api';

export default {
    namespaced: true,
    state: {
        menus: [],
        menuMap: {}
    },
    getters: {
        menuPath: (state) => (menuId) => {
            let pathArr = [menuId];
            let parent = state.menuMap[menuId];
            while (parent) {
                pathArr.push(parent.id);
                parent = parent.parentNode;
            }
            return pathArr.reverse();
        },
        api(state) {
            return Api;
        }
    },
    actions: {
        updateMenus(context) {
            Api.menu.list().then(({body}) => {
                const {code, msg, data} = body;
                if (code === "000000") {
                    context.commit("updateMenus", data);
                }
            });
        }
    },
    mutations: {
        updateMenus(state, menus) {
            let menuMap = {};
            state.menus = Vue.$util.generateTree(menus, "parentNode", menuMap);

            state.menuMap = menuMap;

        }
    }
}