<template>
  <v-toolbar app class="white" :scroll-threshold="500" scroll-toolbar-off-screen fixed>
    <v-icon large class="primary--text hidden-sm-and-down brand-icon">fab fa-galactic-senate</v-icon>
    <v-spacer class="hidden-sm-and-up brand-spacer"/>
    <v-toolbar-title class="text-xs-center brand-logo">
      <span>ATLANT</span>
      <span class="blue--text text--darken-3 accented-text">Club</span>
    </v-toolbar-title>
    <v-spacer/>
<!--     <v-toolbar-items class="hidden-xs-only">
        <v-btn v-for="item in menu" :key="item.name" @click="call(item.action)" flat class="blue--text text--darken-2 accented-text">{{ item.name }}</v-btn>
    </v-toolbar-items> -->

    <v-toolbar-items v-if="!$store.state.auth">
        <v-btn flat @click="call('signup.show')" class="blue--text text--darken-2 accented-text">
            <v-icon small class="mr-1">fas fa-user-plus</v-icon>Регистрация
        </v-btn>

        <v-btn flat @click="call('signin.show')" class="blue--text text--darken-2 accented-text">
            <v-icon small class="mr-1">fas fa-sign-in-alt</v-icon>вход
        </v-btn>
    </v-toolbar-items>

    <v-toolbar-items v-if="$store.state.auth">
        <v-btn flat @click="call('account.show')" class="blue--text text--darken-2 accented-text">
            <v-icon small class="mr-1">fas fa-user-circle</v-icon>{{$store.state.auth.name}}
        </v-btn>

        <v-btn flat @click="call('signout.submit')" class="blue--text text--darken-2 accented-text">
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