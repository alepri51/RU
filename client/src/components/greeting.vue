<template>
  <v-parallax :src="require('../assets/demo.jpg')">
    <v-layout
      column
      align-center
      justify-center
      class="white--text"
    >
      <div class="subheading mb-1 hero-text-sub text-xs-center">Жизнь | Мечта | Счастье</div>
      <p class="white--text hero-text-header mb-2 display-2 text-xs-center">Воплоти свою мечту в жизнь и стань счастливым!</p>
      <div class="subheading mb-3 hero-text-sub text-xs-center">Узнайте как <span class="brand-text">ATLANT Club</span> может помочь осуществить давнюю мечту</div>
      <v-btn
        class="mt-3 green darken-1 accented-text" dark @click="call('signup.show')"
      >
        Зарегистрироваться
      </v-btn>
    </v-layout>
  </v-parallax>
</template>

<script>
    export default {
    
    }
</script>

<style>
/* .hero-text-header {
  font-family: 'Zilla Slab', serif;
}
.hero-text-sub {
  font-family: 'Raleway', sans-serif;
}
.brand-text {
  font-weight: bold;
} */
</style>
