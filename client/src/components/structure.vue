<template>
  <div class="widget">
      <v-card>
            <v-card-text>
                <h1><v-icon large color="green darken-2" class="mr-2">fas fa-receipt</v-icon>Структура:</h1>
            </v-card-text>
      </v-card>
      <div style="position: absolute; bottom: 4px; right: 8px; font-size: 10px" class="grey--text">структура</div>
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

