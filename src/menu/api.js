import Vue from 'vue';

const MENU_URL = "/api/system/menu{/id}";
const OPERATOR_URL = "/api/system/menu/{menuId}/operator{/id}";

export default {
    menu: {
        list(params) {
            return Vue.http.get(MENU_URL, {params});
        },
        save(param) {
            if (param.id) {
                return Vue.http.put(MENU_URL, param);
            } else {
                return Vue.http.post(MENU_URL, param);
            }
        },
        getOne(id) {
            return Vue.http.get(MENU_URL, {params: {id}});
        },
        del(id) {
            return Vue.http.delete(MENU_URL, {body: {id}});
        }
    },
    operator: {
        list(menuId, params = {}) {
            params.menuId = menuId;
            return Vue.http.get(OPERATOR_URL, {params});
        },
        save(menuId, param) {
            if (param.id) {
                return Vue.http.put(OPERATOR_URL, param, {params: {menuId}});
            } else {
                return Vue.http.post(OPERATOR_URL, param, {params: {menuId}});
            }
        },
        getOne(menuId, id) {
            return Vue.http.get(OPERATOR_URL, {params: {menuId, id}});
        },
        del(menuId, id) {
            return Vue.http.delete(OPERATOR_URL, {params: {menuId}, body: {id}});
        }
    },
}