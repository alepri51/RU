<template>
  <div class="not-found">
    <h1>Not found page</h1>
  </div>
</template>

<script>
    export default {

        activated() {
            this.$store.commit('NOT_FOUND');
        }
    }
</script>

<style scoped>
  .not-found h1 {
    text-align: center;
  }
</style>

