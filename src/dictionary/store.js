import Vue from 'vue';
import Api from './api';

export default {
    namespaced: true,
    state: {
        dicTypeMap: {},
        dicTypes: [],
        disabledId: ""
    },
    getters: {
        api(state) {
            return Api;
        }
    },
    actions: {
        updateDicTypes(context) {
            Api.dicType.list().then(({body}) => {
                const {code, msg, data} = body;
                if ("000000" === code) {
                    context.commit("updateDicTypes", data);
                }
            })
        }
    },
    mutations: {
        updateDicTypes(state, dicTypes) {
            let dicTypeMap = {};
            state.dicTypes = Vue.$util.generateTree(dicTypes, "parentNode", dicTypeMap);
            state.dicTypeMap = dicTypeMap;

            if (state.disabledId && dicTypeMap[state.disabledId]) {
                dicTypeMap[state.disabledId].disabled = true;
            }
        },
        clearDisable(state) {
            state.disabledId = "";
            for (let item in state.dicTypeMap) {
                if (state.dicTypeMap.hasOwnProperty(item)) {
                    state.dicTypeMap[item].disabled = false;
                }
            }
        },
        setDisabled(state, disableId) {
            state.disabledId = disableId;
            if (state.dicTypeMap[disableId]) {
                state.dicTypeMap[disableId].disabled = true;
            }
        }
    }
}