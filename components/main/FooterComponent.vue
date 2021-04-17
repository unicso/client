<template>
<footer class="content_block">

  <section>
    <header>Информация</header>
    <main>
      <nuxt-link to="/info/contacts">Контакты</nuxt-link>
      <nuxt-link to="/info/politika-konfidentsialnosti">Политика конфиденциальности</nuxt-link>


    </main>
  </section>

  <section>

  </section>

  <section>

  </section>


</footer>
</template>

<script>
export default {
  name: "FooterComponent"
}
</script>

<style scoped>

footer{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 10px;
  text-align: center;
  width: 100%;
}
header{
  font-size: 17px;
}
main{
  display: grid;
  grid-template-columns: 1fr 1fr ;
  grid-column-gap: 10px;
  text-align: left;
  border-right: 1px solid rgba(171, 171, 171, 0.3);
  font-size: 12px;
  height: 80%;
}
</style>