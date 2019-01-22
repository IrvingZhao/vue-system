import Api from './api';

export default {
    namespaced: true,
    getters: {
        api() {
            return Api;
        }
    }
}