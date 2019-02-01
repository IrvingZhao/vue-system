import Vue from 'vue';

const RESOURCE_URL = "/api/system/resource{/id}";

export default {
    list() {
        return Vue.http.get(RESOURCE_URL);
    },
    save(param) {
        if (param.id) {
            return Vue.http.put(RESOURCE_URL, param);
        } else {
            return Vue.http.post(RESOURCE_URL, param);
        }
    },
    del(id) {
        return Vue.http.delete(RESOURCE_URL, {body: {id}});
    },
    getOne(id) {
        return Vue.http.get(RESOURCE_URL, {params: {id}});
    },
}