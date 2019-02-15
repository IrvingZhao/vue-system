import Vue from 'vue';

const PROPERTY_URL = "/api/system/property{/id}";

export default {
    list(searchParam) {
        return Vue.http.get(PROPERTY_URL, {params: searchParam});
    },
    save(param) {
        if (param.id) {
            return Vue.http.put(PROPERTY_URL, param);
        } else {
            return Vue.http.post(PROPERTY_URL, param);
        }
    },
    del(id) {
        return Vue.http.delete(PROPERTY_URL, {body: {id}});
    },
    getOne(id) {
        return Vue.http.get(PROPERTY_URL, {params: {id}});
    },
}