<template>
    <v-dialog v-model="visible" persistent max-width="500px">
        <v-card>
            <v-card-title>
                <v-icon class="mr-1 primary--text">fas fa-user-circle</v-icon>
                <span class="headline primary--text">Аутентификация</span>
            </v-card-title>
            <v-card-text>
                <v-card-text>
                    <v-form ref="form" class="form" lazy-validation @submit.prevent>
                        <v-text-field v-model="email"
                                        label="Email"
                                        required
                                        autofocus
                                        color="primary"
                                        :rules="[
                                            () => !!email || 'This field is required',
                                        ]"
                                        @keyup.enter="submit"
                        ></v-text-field>
                        <v-text-field v-model="password"
                                        label="Password"
                                        type="password"
                                        required
                                        color="primary"
                                        :rules="[
                                            () => !!password || 'This field is required',
                                        ]"
                                        @keyup.enter="submit"
                        ></v-text-field>
                    </v-form>
                    <small>*indicates required field</small>
                </v-card-text>
            </v-card-text>
            <v-card-actions>
                <v-btn color="inactive" flat @click.native="commit('HIDE_DIALOG', 'signin')">Вспомнить пароль</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="inactive" flat @click.native="commit('HIDE_DIALOG', 'signin')">Не входить</v-btn>
                <v-btn dark class="default-action" flat @click.native="submit">Войти</v-btn>
            </v-card-actions>

        </v-card>

    </v-dialog>
</template>

<script>
    export default {
        props: ['visible'],
        data: () => {
            return {
                email: 'club@atlant.club',
                password: 'DerGfhjkm100'
            }
        },
        methods: {
            submit() {
                //this.$refs.form.validate() && this.$store.actions.signin({ email: this.email, password: this.password });'
                //debugger;
                this.$refs.form.validate() ? 
                    this.execute({ 
                        method: 'post', 
                        endpoint: 'signin.submit', 
                        payload: this.$data, 
                        callback: (response) =>  !response.data.error && (this.commit('HIDE_DIALOG', 'signin'), this.$router.replace('account')) 
                    })
                    :
                    this.commit('SHOW_SNACKBAR', {text: 'Не корректно введены данные' });
            }
        }
    }    
</script>