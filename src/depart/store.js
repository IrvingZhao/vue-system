import Vue from 'vue';
import Api from './api';

export default {
    namespaced: true,
    state: {
        departList: [],
        departMap: {},
        disabledId: ""
    },
    mutations: {
        updateDeparts(state, departs) {
            let departMap = {};
            state.departList = Vue.$util.generateTree(departs, "parentNode", departMap);
            state.departMap = departMap;
            if (state.disabledId && departMap[state.disabledId]) {
                departMap[state.disabledId].disabled = true;
            }
        },
        clearDisable(state) {
            state.disabledId = "";
            for (let item in state.departMap) {
                if (state.departMap.hasOwnProperty(item)) {
                    state.departMap[item].disabled = false;
                }
            }
        },
        setDisabled(state, disableId) {
            state.disabledId = disableId;
            if (state.departMap[disableId]) {
                state.departMap[disableId].disabled = true;
            }
        }
    },
    actions: {
        updateDeparts(context) {
            Api.list().then(({body}) => {
                const {code, data} = body;
                if ("000000" === code) {
                    context.commit("updateDeparts", data);
                }
            });
        },
    },
    getters: {
        api() {
            return Api;
        }
    }
}