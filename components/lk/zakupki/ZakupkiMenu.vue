<template>
<section>
  <ul>
    <li>
      <nuxt-link to="/user/lk/zakupki/product_report">Продукты</nuxt-link>
    </li>
    <li>
      <nuxt-link to="/user/lk/zakupki/chat">Чат</nuxt-link>
    </li>
    <li>
      <nuxt-link to="/user/lk/zakupki/config">Конфигуратор</nuxt-link>
    </li>

  </ul>

<hr>
</section>
</template>

<script>
export default {
  name: "ZakupkiMenu"
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