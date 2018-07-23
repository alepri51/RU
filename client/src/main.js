import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';
import axios from 'axios';
 
import App from './App.vue';
import router from './router';
import store from './store';

import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify, {
    theme: {
        primary: colors.indigo.darken2,
        secondary: colors.amber.darken2,
        accent: colors.shades.black,
        'primary-light': '#F5F5F5',
        error: colors.red.darken2,
        inactive: colors.blueGrey.base,
        'default-action': colors.green.darken2
    }
});

Vue.config.productionTip = false;

let mapStoreActions = () => {
    let actions = Object.keys(store._actions);
    let map = actions.reduce((memo, name) => {
        memo[name] = store._actions[name][0];
        return memo;
    }, {});

    map.commit = store.commit;
    return map;
};

Vue.mixin({
    methods: {
        ...mapStoreActions(),
        call(action) {
            this[action]();
        }
    },
    computed: {
        api() {
            return this.$store.state.api;
        },
        dialogs() {
            return this.$store.state.dialogs;
        }
    }
});

new Vue({
    router,
    store,
    render: h => h(App),
    created() {
        this.$store.commit('INIT');
    }
}).$mount('#app');
