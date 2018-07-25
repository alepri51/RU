<template>
    <v-dialog v-model="visible" persistent max-width="60vw">
        <v-card flat>
            <v-card-title>
                <v-icon class="mr-1 primary--text">fas fa-home</v-icon>
                <span class="headline primary--text">Подбор квартиры по шагам</span>
            </v-card-title>
            <v-card-text>
                <v-stepper v-model="e1" alt-labels class="elevation-0">
                    <v-stepper-header class="elevation-0">
                        <template v-for="(n, inx) in steps">
                        <v-stepper-step
                            :complete="false"
                            :key="`${inx}-step`"
                            :step="inx + 1"
                            editable
                            edit-icon="fas fa-check"
                            complete-icon="fas fa-eye"
                        >
                            {{ n.text }}
                        </v-stepper-step>

                        <v-divider
                            v-if="inx !== steps.length - 1"
                            :key="inx"
                        ></v-divider>
                        </template>
                    </v-stepper-header>

                    <v-stepper-items>
                        <v-stepper-content
                        v-for="(n, inx) in steps"
                        :key="`${inx}-content`"
                        :step="inx + 1"
                        >
                        <v-card flat
                            class="mb-5"
                            
                            height="200px"
                        >
                            STEP {{n}}
                        </v-card>

                        <div style="display: flex">
                            <v-btn v-if="e1 > 1"
                                flat
                                color="primary"
                                @click="prev"
                            >
                                <v-icon small class="mr-1 mb-1">fas fa-chevron-left</v-icon>
                                Вернуться
                            </v-btn>

                            <v-spacer/>

                            <v-btn v-if="e1 < steps.length" 
                                color="primary" 
                                flat 
                                @click="next"
                            >
                                Далее
                                <v-icon small class="ml-1 mb-1">fas fa-chevron-right</v-icon>
                            </v-btn>
                        </div>
                        </v-stepper-content>
                    </v-stepper-items>
                    </v-stepper>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn color="inactive" flat @click.native="commit('HIDE_DIALOG', 'stepper')">Закрыть</v-btn>
                <v-btn dark class="default-action" flat @click.native="commit('HIDE_DIALOG', 'stepper')">Показать подборку</v-btn>
            </v-card-actions>

        </v-card>

    </v-dialog>
</template>

<script>
    export default {
        props: ['visible'],
        data: () => {
            return {
                e1: 1,
                //steps: 4,
                steps: [
                    {
                        text: 'Цель'
                    },
                    {
                        text: 'Бюджет'
                    },
                    {
                        text: 'Удобства'
                    }
                ]
            }
        },
        methods: {
            prev() {
                this.e1 > 1 && this.e1--;
            },
            next() {
                this.e1 < this.steps.length && this.e1++;
            }
        }
    }    
</script>