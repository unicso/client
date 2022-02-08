<template>
  <section>
    <ul>
      <li><a href="tel://+74951980882">Позвонить (+74951980882)</a> </li>
      <li>Заказать звонок</li>
      <li><nuxt-link to="/info/support" class="std_link">Написать нам</nuxt-link></li>

    </ul>


  </section>
</template>

<script>
export default {
  name: "OnlineHelperContacts",
  data() {
    return {}
  },
  mounted() {
  },
  methods: {}


}
</script>

<style scoped>
li{
  background-color: rgba(200,200,200, 0.4);
  padding: 7px;
  margin: 10px;
  border-radius: 5px;
}
</style>