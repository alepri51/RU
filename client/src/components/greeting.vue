<template>
  <v-parallax :src="require('../assets/150289557589.jpg')">
    <!-- <v-layout
      column
      align-center
      justify-center
      class="white--text"
    >
      <div class="subheading mb-1 hero-text-sub text-xs-center">Жизнь | Мечта | Счастье</div>
      <p class="white--text hero-text-header mb-2 display-2 text-xs-center">Воплоти свою мечту в жизнь и стань счастливым!</p>
      <div class="subheading mb-3 hero-text-sub text-xs-center">Узнайте как <span>ATLANT</span><span class="secondary--text">Club</span> может помочь осуществить давнюю мечту</div>
      <v-btn
        class="mt-3 green darken-1 accented-text" dark @click="commit('SHOW_DIALOG', 'signup')"
      >
        Зарегистрироваться
      </v-btn>
    </v-layout> -->
    <v-layout
      column
      align-center
      justify-center
      class="white--text"
    >
      <div class="subheading mb-1 hero-text-sub text-xs-center">Жизнь | Мечта | Счастье</div>
      <p class="white--text hero-text-header mb-2 display-2 text-xs-center">Купи квартиру и стань счастливым!</p>
      <div class="subheading mb-3 hero-text-sub text-xs-center">Узнайте как <span>ВСЕ</span><span class="secondary--text">Новостройки</span> могут помочь осуществить давнюю мечту</div>
      <v-btn
        class="mt-3 green darken-1 accented-text" dark @click="commit('SHOW_DIALOG', 'stepper')"
      >
        НАЙДИТЕ МНЕ КВАРТИРУ
      </v-btn>
      <div>ИЛИ</div>
      <v-btn
        class="mt-1 green darken-1 accented-text" dark @click="false"
      >
        Я СПРАВЛЮСЬ БЕЗ ВАС
      </v-btn>
      <!-- <div style="width:300px">
        <v-text-field
            dark
            solo-inverted
            v-model="search_string"
            append-icon="fas fa-search"
            label="Я справлюсь без вас..."
            hint="адрес, район, округ"
            @click:append="search"
            @keyup.enter="search"
        ></v-text-field> -->

    </v-layout>
  </v-parallax>
</template>

<script>
    export default {
        data() {
            return {
                search_string: ''
            }
        },
        methods: {
            search() {
                console.log(this.search_string);
                this.search_string = this.search_string || 'Москва';
                this.commit('SHOW_SNACKBAR', {text: this.search_string});
                this.search_string = '';
            }
        }
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
