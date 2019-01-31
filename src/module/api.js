import Vue from 'vue';

const MODULE_URL = "/api/system/module{/id}";
const PAGE_URL = "/api/system/module/{moduleId}/page{/id}";
const OPERATOR_URL = "/api/system/module/{moduleId}/page/{pageId}/operator{/id}";
const MODULE_PAGE_URL = "/api/system/module/withPage";

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
                return Vue.http.put(PAGE_URL, param, {params: {moduleId}});
            } else {
                return Vue.http.post(PAGE_URL, param, {params: {moduleId}});
            }
        },
        getOne(moduleId, id) {
            return Vue.http.get(PAGE_URL, {params: {moduleId, id}});
        },
        del(moduleId, id) {
            return Vue.http.delete(PAGE_URL, {params: {moduleId}, body: {id}});
        },
    },
    operator: {
        list(moduleId, pageId) {
            return Vue.http.get(OPERATOR_URL, {params: {moduleId, pageId}});
        },
        save(moduleId, pageId, param) {
            if (param.id) {
                return Vue.http.put(OPERATOR_URL, param, {params: {moduleId, pageId}});
            } else {
                return Vue.http.post(OPERATOR_URL, param, {params: {moduleId, pageId}});
            }
        },
        getOne(moduleId, pageId, id) {
            return Vue.http.get(OPERATOR_URL, {params: {moduleId, pageId, id}});
        },
        del(moduleId, pageId, id) {
            return Vue.http.delete(OPERATOR_URL, {params: {moduleId, pageId}, body: {id}});
        }
    },
    modulePage: {
        list() {
            return Vue.http.get(MODULE_PAGE_URL);
        }
    }
}