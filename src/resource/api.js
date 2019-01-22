import Vue from 'vue';

const RESOURCE_URL = "/api/system/resource";

export default {
    list(params) {
        return Vue.http.get(RESOURCE_URL, {params: params});
    },
    save(param) {
        if (param.id) {
            return Vue.http.put(RESOURCE_URL, param);
        } else {
            return Vue.http.post(RESOURCE_URL, param);
        }
    },
    getOne(id) {
        return Vue.http.get(RESOURCE_URL + "/" + id);
    },
    del(id) {
        return Vue.http.delete(RESOURCE_URL, {params: {id: id}});
    }
}
