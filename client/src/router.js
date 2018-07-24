import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

Vue.use(Router);

let router = new Router({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            redirect: '/landing'
        }
    ]
});

router.beforeEach((to, from, next) => {
    let name = to.path.slice(1);
    
    to.query.ref && store.commit('REFERER', to.query.ref);
    store.commit('REGISTER_VIEW', name);
    store.commit('LOCATION', name);

    next();
});

export default router;
