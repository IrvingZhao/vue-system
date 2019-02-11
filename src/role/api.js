import Vue from 'vue';

const ROLE_URL = "/api/system/role{/id}";

export default {
    list(searchParam) {
        return Vue.http.get(ROLE_URL, {params: searchParam});
    },
    save(param) {
        if (param.id) {
            return Vue.http.put(ROLE_URL, param);
        } else {
            return Vue.http.post(ROLE_URL, param);
        }
    },
    del(id) {
        return Vue.http.delete(ROLE_URL, {body: {id}});
    },
    getOne(id) {
        return Vue.http.get(ROLE_URL, {params: {id}});
    },
}