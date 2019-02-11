import Vue from 'vue';
import Api from './api';

export default {
    namespaced: true,
    state: {
        menus: [],
        menuMap: {},
        disabledId:""
    },
    getters: {
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

            if (state.disabledId && menuMap[state.disabledId]) {
                menuMap[state.disabledId].disabled = true;
            }
        },
        clearDisable(state) {
            state.disabledId = "";
            for (let item in state.menuMap) {
                if (state.menuMap.hasOwnProperty(item)) {
                    state.menuMap[item].disabled = false;
                }
            }
        },
        setDisabled(state, disableId) {
            state.disabledId = disableId;
            if (state.menuMap[disableId]) {
                state.menuMap[disableId].disabled = true;
            }
        }
    }
}