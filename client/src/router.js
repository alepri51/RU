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
            redirect: '/about'
        }
    ]
});

router.beforeEach((to, from, next) => {
    let name = to.path.slice(1);
    console.log(name);

    Vue.component(
        name,
        async () => import(`./views/${name}`).catch(() => {

                return import(`./views/not-found`);
            }
        )
    );

    store.commit('location', name);

    next();
});

export default router;
