<template>
  <div class="widget">
      <v-card>
            <v-card-text>
                <h1>Ваш баланс:</h1>
                <div><v-icon small class="mr-1" color="green darken-2">fas fa-money-bill-alt</v-icon>{{balance.btc}} BTC</div>
                <div><v-icon small class="mr-1" color="green darken-2">far fa-money-bill-alt</v-icon>{{balance.bonus}} BONUS</div>
            </v-card-text>
      </v-card>
      <div style="position: absolute; bottom: 4px; right: 8px; font-size: 10px" class="grey--text">баланс</div>
  </div>
</template>

<script>
    export default {
        computed: {
            /* balance() {
                return this.account.balance || {}
            } */
        }
    }
</script>

<style scoped>
    .widget {
        width: 100%;
    }

    .widget div:first-child {
        height: 100%;
    }
</style>

