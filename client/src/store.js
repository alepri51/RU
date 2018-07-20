import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        view: ''
    },
    mutations: {
        location(state, view) {
        state.view = view;
        }
    },
    actions: {

    }
});
