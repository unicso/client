<template>
<section>
  <ul>
    <li>
      <nuxt-link to="/user/lk/client/profile">Профиль</nuxt-link>
    </li>
    <li>
      <nuxt-link to="/user/lk/client/orders">Заказы</nuxt-link>
    </li>

  </ul>
</section>
</template>

<script>
export default {
  name: "ClientMenu"
}
</script>

<style scoped>
ul{
  list-style: none;
  display: inline-flex;
}
ul li:not(:last-child){
  border-right: 1px solid grey;

}
ul li{
  padding-right: 5px;
  padding-left: 5px;
}
</style>