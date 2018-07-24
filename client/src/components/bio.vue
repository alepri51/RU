<template>
  <div class="widget">
      <v-card>
            <v-card-text>
                <h1><v-icon large color="primary" class="mr-2">fas fa-user-circle</v-icon>{{auth.name}}</h1>
                <div class="ml-2 mt-2"><v-icon small color="secondary" class="mr-1">fas fa-at</v-icon>{{auth.email || 'e-mail'}}</div>
            </v-card-text>
      </v-card>
      <div style="position: absolute; bottom: 4px; right: 8px; font-size: 10px" class="grey--text">bio</div>
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

