<template>
<div class="main_menu_desktop">
  <ul>
    <li><nuxt-link to="/">Главная</nuxt-link></li>
    <li><nuxt-link to="/catalog/catalog">Каталог</nuxt-link></li>

    <li v-if="!$store.state.user.isAuth"><nuxt-link to="/user/auth">Личный кабинет</nuxt-link></li>
    <li v-else><nuxt-link to="/user/profile">{{ $store.state.user.username }}</nuxt-link></li>


  </ul>
</div>
</template>

<script>
export default {
name: "MainMenuDesktop"
}
</script>

<style scoped>
ul{
  list-style: none;
  margin: 0px;
  padding: 0px;
}
ul{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>