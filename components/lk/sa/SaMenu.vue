<template>
<section>
  <ul>
    <li>
      <nuxt-link to="/user/lk/sa/users">Пользователи</nuxt-link>
    </li>

    <li>
      <nuxt-link to="/user/lk/sa/clients">Клиенты</nuxt-link>
    </li>
    <li>
      <nuxt-link to="/user/lk/sa/product_report">Продукты</nuxt-link>
    </li>
    <li>
      <nuxt-link to="/user/lk/sa/sachat">Чат</nuxt-link>
    </li>
    <li>
      <nuxt-link to="/user/lk/sa/config">Конфигуратор</nuxt-link>
    </li>
    <li>
      <nuxt-link to="/user/lk/sa/general">Основные параметры</nuxt-link>
    </li>
    <li>
      <nuxt-link to="/user/lk/sa/permissions">Роли</nuxt-link>
    </li>



  </ul>

<hr>
</section>
</template>

<script>
export default {
  name: "SaMenu",


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