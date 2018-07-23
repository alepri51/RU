<template>
  <v-toolbar app class="white" :scroll-threshold="500" scroll-off-screen fixed>
    <!-- <v-icon large class="primary--text">fab fa-galactic-senate</v-icon> -->
    <v-icon large class="primary--text">fas fa-home</v-icon>
    
    <!-- <v-toolbar-title class="toolbar-title">
      <span>ATLANT</span>
      <span class="secondary--text">Club</span>
    </v-toolbar-title> -->

    <v-toolbar-title class="toolbar-title">
        <span>ВСЕ</span>
        <span class="secondary--text">новостройки</span>
    </v-toolbar-title>

    <v-tabs
        class="ml-2"
        v-model="active"
        slider-color="secondary"
    >
        <v-tab
            to="landing"
            ripple
        >
            LANDING
      </v-tab>
<!--       <v-tab
        v-for="n in 3"
        :key="n"
        ripple
      >
        Item {{ n }}

      </v-tab> -->
    </v-tabs>

    <v-spacer/>

    <v-toolbar-items v-if="!$store.state.auth">
        <v-btn flat @click="commit('SHOW_DIALOG', 'signup')" color="primary">
            <v-icon small class="mr-1">fas fa-user-plus</v-icon>Регистрация
        </v-btn>

        <v-btn flat @click="commit('SHOW_DIALOG', 'signin')" color="primary">
            <v-icon small class="mr-1">fas fa-sign-in-alt</v-icon>вход
        </v-btn>
    </v-toolbar-items>

    <v-toolbar-items v-if="$store.state.auth">
        <v-btn flat replace to="account"  color="primary" >
            <v-icon small class="mr-1">fas fa-user-circle</v-icon>{{$store.state.auth.name}}
        </v-btn>

        <v-btn flat @click="commit('SHOW_DIALOG', 'signout')" color="primary">
            Выход<v-icon small class="ml-1">fas fa-sign-out-alt</v-icon>
        </v-btn>
    </v-toolbar-items>

  </v-toolbar>
</template>

<script>
    export default {
        props: ['menu'],
        data() {
            return {
                active: '',
                actions: []
            }
        },
        created() {
            this.actions
        },
        methods: {
/*             call(action) {
                this[action]();
            }
 */        }
    }
</script>

<style scoped>
    .toolbar-title {
        overflow: unset;
    }
</style>
