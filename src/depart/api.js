import Vue from 'vue';

const DEPART_URL = "/api/system/depart{/id}";

export default {
    list() {
        return Vue.http.get(DEPART_URL)
    },
    save(param) {
        if (param.id) {
            return Vue.http.put(DEPART_URL, param);
        } else {
            return Vue.http.post(DEPART_URL, param);
        }
    },
    getOne(id) {
        return Vue.http.get(DEPART_URL, {params: {id}});
    },
    delete(id) {
        return Vue.http.delete(DEPART_URL, {body: {id}});
    }
}