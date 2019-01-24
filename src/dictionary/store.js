import Vue from 'vue';
import Api from './api';

export default {
    namespaced: true,
    state: {
        dicTypeMap: {},
        dicTypes: [],
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
        }
    }
}