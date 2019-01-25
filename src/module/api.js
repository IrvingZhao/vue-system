import Vue from 'vue';

const MODULE_URL = "/api/system/module{/id}";
const PAGE_URL = "/api/module/{moduleId}/page{/id}";

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
    },
    page: {
        list(moduleId) {
            return Vue.http.get(PAGE_URL, {params: {moduleId}})
        },
        save(moduleId, param) {
            if (param.id) {
                return Vue.http.put(PAGE_URL, {body: param, params: {moduleId}});
            } else {
                return Vue.http.post(PAGE_URL, {body: param, params: {moduleId}});
            }
        },
        getOne(moduleId, id) {
            return Vue.http.get(PAGE_URL, {params: {moduleId, id}});
        },
        del(moduleId, id) {
            return Vue.http.delete(PAGE_URL, {params: {moduleId}, body: {id}});
        }
    }
}