import Vue from 'vue';

const DIC_TYPE_URL = "/api/system/dicType{/id}";
const DIC_ITEM_URL = "/api/system/dicType/{dicTypeId}/dicItem{/id}";

export default {
    dicType: {
        list(params) {
            return Vue.http.get(DIC_TYPE_URL, {params});
        },
        save(param) {
            if (param.id) {
                return Vue.http.put(DIC_TYPE_URL, param);
            } else {
                return Vue.http.post(DIC_TYPE_URL, param);
            }
        },
        del(id) {
            return Vue.http.delete(DIC_TYPE_URL, {body: {id}});
        },
        getOne(id) {
            return Vue.http.get(DIC_TYPE_URL, {params: {id}});
        }
    },
    dicItem: {
        list(dicTypeId, params = {}) {
            params.dicTypeId = dicTypeId;
            return Vue.http.get(DIC_ITEM_URL, {params});
        },
        save(dicTypeId, param) {
            if (param.id) {
                return Vue.http.put(DIC_ITEM_URL, param, {params: {dicTypeId}});
            } else {
                return Vue.http.post(DIC_ITEM_URL, param, {params: {dicTypeId}});
            }
        },
        del(dicTypeId, id) {
            return Vue.http.delete(DIC_ITEM_URL, {params: {dicTypeId}, body: {id}});
        },
        getOne(dicTypeId, id) {
            return Vue.http.get(DIC_ITEM_URL, {params: {dicTypeId, id}});
        }
    },
}