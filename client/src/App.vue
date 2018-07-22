<template>
    <v-app>
        <div class="loader-overlay" v-if="$store.state.loading">
            <div style="" class="spinner spinner--circle-4"></div>
        </div>

        <navigation :menu="$store.state.menu"/>
        <v-content>
            <greeting/>
            
            <mobile-menu :menu="$store.state.menu" class="hidden-sm-and-up"/>
            <painpoint id="earthworks"/>
            <products/>
            <demo id="features"/>
            <consulting/>
            <ic-footer/>
        </v-content>

        <signin :visible="dialogs.signin.visible" />
        <signup :visible="dialogs.signup.visible" />

    </v-app>
</template>

<script>
import { RotateSquare2 } from 'vue-loading-spinner';

export default {
    name: 'App',
    components: {
        navigation: () => import('./components/navigation'),
        greeting: () => import('./components/greeting'),
        mobileMenu: () => import('./components/mobileMenu'),
        painpoint: () => import('./components/painpoint'),
        products: () => import('./components/products'),
        demo: () => import('./components/demo'),
        consulting: () => import('./components/consulting'),
        icFooter: () => import('./components/footer'),
        signin: () => import('./components/signin'),
        signup: () => import('./components/signup'),
        RotateSquare2
    },
    data () {
        return {

        }
    }
}
</script>

<style scoped>
    .loader-overlay::before {
        background-color: #212121;
    }
    .loader-overlay {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 999;
    }

    .spinner {
        position: fixed;
        z-index: 999;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 60px;
        height: 60px;
        box-sizing: border-box;
        /*position: relative;*/
        border: 3px solid transparent;
        border-top-color: #f7484e;
        border-radius: 50%;
        animation: circle-4-spin 2s linear infinite;
    }
    .spinner:before, .spinner:after {
        content: '';
        box-sizing: border-box;
        position: absolute;
        border: 3px solid transparent;
        border-radius: 50%;
    }

    .spinner:before {
        border-top-color: #f8b334;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        animation: circle-4-spin 3s linear infinite;
    }

    .spinner:after {
        border-top-color: #41b883;
        top: 6px;
        left: 6px;
        right: 6px;
        bottom: 6px;
        animation: spin 4s linear infinite;
    }

    @keyframes circle-4-spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .application, .application .display-2 {
        font-family: 'Roboto Condensed'!important;
    }

    .brand-logo {
        font-family: 'Roboto Condensed', serif;
        font-size: 36px!important;
        font-weight: bold!important;
        color: #2c3e50;
    }
    .brand-spacer {
        margin-left: -10px!important;
    }
    .brand-icon {
        margin-top: -3px;
    }
    .accented-text {
        font-family: 'Roboto Condensed', sans-serif;
    }
    .product-title {
        font-family: 'Roboto Condensed', sans-serif;
        font-weight: bold!important;
        color: #2c3e50;
    }
    p {
        font-family: 'Roboto Condensed', sans-serif;
    }
    .hero-text-header {
        font-family: 'Roboto Condensed', serif;
    }
    .hero-text-sub {
        font-family: 'Roboto Condensed', sans-serif;
    }
    .brand-text {
        font-weight: bold;
    }

</style>
