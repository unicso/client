<template>
<section>
  <ul>
    <li>
      <nuxt-link to="/user/lk/manager/documents">Документы</nuxt-link>
    </li>

    <li>
      <nuxt-link to="/user/lk/manager/clients">Клиенты</nuxt-link>
    </li>

  </ul>

<hr>
</section>
</template>

<script>
export default {
  name: "ManagerMenu"
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