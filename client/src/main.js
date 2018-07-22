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
        primary: '#2C3E50',
        secondary: colors.green.base,
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
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
