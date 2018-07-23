<template>
    <v-dialog v-model="visible" persistent max-width="500px">
        <v-card>
            <v-card-title>
                <v-icon class="mr-1 primary--text">fas fa-user-circle</v-icon>
                <span class="headline primary--text">Выход</span>
            </v-card-title>
            <v-card-text>
                <v-card-text>
                    Вы покидаете личный кабинет. Пожалуйста подтвердите Ваше решение
                </v-card-text>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="inactive" flat @click.native="commit('HIDE_DIALOG', 'signout')">Не выходить</v-btn>
                <v-btn dark class="default-action" flat @click.native="submit">Выйти</v-btn>
            </v-card-actions>

        </v-card>

    </v-dialog>
</template>

<script>
    export default {
        props: ['visible'],
        data: () => {
            return {
            }
        },
        methods: {
            submit() {
                //this.$refs.form.validate() && this.$store.actions.signin({ email: this.email, password: this.password });'
                //debugger;
                this.execute({ method: 'post', endpoint: 'signout.submit' });
                this.commit('HIDE_DIALOG', 'signout');
                this.$router.replace('landing');
            }
        }
    }    
</script>