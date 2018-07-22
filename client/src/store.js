import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {
        api: void 0,
        loading: false,
        view: '',
        dialogs: {
            signin: {
                visible: false
            },
            signup: {
                visible: false
            }
        },
        token: void 0,
        auth: void 0,
        notFound: false,
        menu: [
            {
                icon: '',
                name: 'Home',
                action: 'home'
            },
            {
                icon: '',
                name: 'Регистрация',
                action: 'signup.show'
            },
            {
                icon: '',
                name: 'Вход',
                action: 'signin.show'
            },
            /* {
                icon: '',
                name: 'Выход',
                action: 'signout.submit'
            } */
        ]
    },
    mutations: {
        INIT(state) {
            state.api = axios.create({ 
                baseURL: 'https://localhost:8000/api'
            });

            state.token = sessionStorage.getItem('token');
            //state.api.defaults.headers.common['Authorization'] = state.token ? state.token : '';

            let onRequest = (config => {
                state.token && (config.headers.common.authorization = state.token);
                return config;
            });

            let onResponse = (response => {
                let {token, ...rest} = response.data;

                this.commit('SET_AUTH', rest.auth);
                this.commit('SET_TOKEN', token);

                rest.error && console.error(rest.error);

                return response;
            });
            
            let onError = (error => Promise.reject(error));

            state.api.interceptors.request.use(onRequest, onError);
            
            state.api.interceptors.response.use(onResponse, onError);

            state.api.get('auth');
        },
        LOADING(state, value) {
            state.loading = value;
        },
        LOCATION(state, view) {
            state.view = view;
            state.notFound = false;
        },
        NOT_FOUND(state) {
            state.notFound = true;
        },
        SHOW_DIALOG(state, dialog) {
            state.dialogs[dialog].visible = true;
        },
        HIDE_DIALOG(state, dialog) {
            state.dialogs[dialog].visible = false;
        },
        SET_TOKEN(state, token) {
            token ? sessionStorage.setItem('token', token) : sessionStorage.removeItem('token');
            state.token = token;
        },
        SET_AUTH(state, auth) {
            state.auth = auth;
        },
    },
    actions: {
        async execute({ commit, state }, { method, endpoint, payload }) {
            //debugger;
            commit('LOADING', true);

            try {
                let response = await state.api[method](endpoint, payload);
            }
            catch(err) {
                console.log('ERROR', err);
            };

            commit('LOADING', false);
        },
        'signin.show': ({ commit, state }) => {
            //debugger;
            commit('SHOW_DIALOG', 'signin');
        },
        'signup.show': ({ commit, state }) => {
            //debugger;
            commit('SHOW_DIALOG', 'signup');
        },
        'signout.submit': async ({ commit, state }, payload) => {
            //debugger;
            console.log(payload);
            try {
                let response = await state.api.post('signout.submit', payload);
                console.log(response);
            }
            catch(err) {
                console.log('ERROR', err);
            }
            //commit('HIDE_DIALOG', 'signout');
        }
    }
});
