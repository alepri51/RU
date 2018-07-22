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
                                        prepend-icon="fas fa-at"
                                        autofocus
                                        color="primary"
                                        :rules="[
                                            () => !!email || 'This field is required',
                                        ]"
                        ></v-text-field>
                        <v-text-field v-model="password"
                                        label="Password"
                                        type="password"
                                        required
                                        prepend-icon="fas fa-key"
                                        color="primary"
                                        :rules="[
                                            () => !!password || 'This field is required',
                                        ]"
                        ></v-text-field>
                    </v-form>
                    <small>*indicates required field</small>
                </v-card-text>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary" flat @click.native="commit('HIDE_DIALOG', 'signin')">Не входить</v-btn>
                <v-btn color="primary" flat @click.native="submit">Войти</v-btn>
            </v-card-actions>

        </v-card>

    </v-dialog>
</template>

<script>
    export default {
        props: ['visible'],
        data: () => {
            return {
                email: 'ap@aa.ru',
                password: '123123'
            }
        },
        methods: {
            submit() {
                //this.$refs.form.validate() && this.$store.actions.signin({ email: this.email, password: this.password });'
                //debugger;
                this.$refs.form.validate() && this.execute({ method: 'post', endpoint: 'signin.submit', payload: { email: this.email, password: this.password }});
                this.commit('HIDE_DIALOG', 'signin');
            }
        }
    }    
</script>