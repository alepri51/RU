<template>
    <div>
        <greeting/>
            
        <mobile-menu :menu="$store.state.menu" class="hidden-sm-and-up"/>
        <painpoint id="earthworks"/>
        <products/>
        <demo id="features"/>
        <consulting/>
        <ic-footer/>
    </div>
</template>

<script>
    export default {
        components: {
            greeting: () => import('../components/greeting'),
            mobileMenu: () => import('../components/mobileMenu'),
            painpoint: () => import('../components/painpoint'),
            products: () => import('../components/products'),
            demo: () => import('../components/demo'),
            consulting: () => import('../components/consulting'),
            icFooter: () => import('../components/footer'),
/*             signin: () => import('../components/modals/signin'),
            signup: () => import('../components/modals/signup'),
            signout: () => import('../components/modals/signout') */
        }
    }
</script>

<style scoped>

</style>
