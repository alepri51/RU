<template>
  <div class="widget">
      <v-card>
            <v-card-text>
                <h1><v-icon large color="blue" class="mr-2">fab fa-gripfire</v-icon>Мои мечты:</h1>
            </v-card-text>
      </v-card>
      <div style="position: absolute; bottom: 4px; right: 8px; font-size: 10px" class="grey--text">мечты</div>
  </div>
</template>

<script>
    export default {
        computed: {
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

