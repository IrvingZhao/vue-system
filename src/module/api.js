import Vue from 'vue';

const MODULE_URL = "/api/system/module{/id}";

export default {
    list() {
        return Vue.http.get(MODULE_URL);
    },
    save(param) {
        if (param.id) {
            return Vue.http.put(MODULE_URL, param);
        } else {
            return Vue.http.post(MODULE_URL, param);
        }
    },
    del(id) {
        return Vue.http.delete(MODULE_URL, {body: {id}});
    },
    getOne(id) {
        return Vue.http.get(MODULE_URL, {params: {id}});
    }
}