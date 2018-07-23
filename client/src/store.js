import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
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
            },
            signout: {
                visible: false
            }
        },
        token: void 0,
        auth: void 0,
        snackbar: {
            visible: false,
            color: 'red darken-2',
            timeout: 4000,
            text: '',
            caption: 'Закрыть',
            icon: '',
            vertical: false
        },
        notFound: false,
        /* menu: [
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
            }
        ] */
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

                !rest.auth && (router.replace('landing'));
                //!rest.auth && (this.commit('REGISTER_COMPONENT', 'landing'), this.commit('LOCATION', 'landing'));

                this.commit('SET_AUTH', rest.auth);
                this.commit('SET_TOKEN', token);

                if(rest.error) {
                    let vertical = rest.error.length > 50;
                    this.commit('SHOW_SNACKBAR', { text: `ОШИБКА: ${rest.error}`, vertical });
                }

                return response;
            });
            
            let onError = (error => {
                //Promise.reject(error);
                this.commit('SHOW_SNACKBAR', { text: `ОШИБКА: ${error.message}` });
            });

            state.api.interceptors.request.use(onRequest, onError);
            
            state.api.interceptors.response.use(onResponse, onError);

            state.api.get('auth');
        },
        LOADING(state, value) {
            state.loading = value;
        },
        REGISTER_COMPONENT(state, name) {
            Vue.component(
                name,
                async () => import(`./views/${name}`).catch(() => {
                    debugger;
                    return import(`./views/not-found`);
                })
            );
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
        SHOW_SNACKBAR(state, options) {
            state.snackbar.visible = true;
            Object.assign(state.snackbar, options);
            console.log(state.snackbar);
        },
        HIDE_SNACKBAR(state) {
            state.snackbar.visible = false;
        }
    },
    actions: {
        async execute({ commit, state }, { method, endpoint, payload, callback }) {
            //debugger;
            commit('LOADING', true);

            try {
                let response = await state.api[method](endpoint, payload);
                callback && callback(response);
            }
            catch(err) {
                console.log('ERROR', err);
            };

            commit('LOADING', false);
        }
    }
});
