<template>
<footer class="content_block">

  <main>
  <section class="logotype">
    <nuxt-link to="/" v-html="$store.state.icons.logotype_vertical"></nuxt-link>
    <div class="copiryght"> © ООО ЮНИКСО, 2021</div>
  </section>
  <section class="links">

      <nuxt-link to="/info/contacts" class="std_link">Контакты</nuxt-link><br>
      <nuxt-link to="/info/about" class="std_link">О компании</nuxt-link><br>
      <nuxt-link to="/info/delivery" class="std_link">Доставка</nuxt-link><br>
      <nuxt-link to="/info/payment" class="std_link">Оплата</nuxt-link><br>
      <nuxt-link to="/info/support" class="std_link">Служба поддержки клиентов</nuxt-link><br>

      <nuxt-link to="/info/politika-konfidentsialnosti" class="std_link">Политика конфиденциальности</nuxt-link><br>
      <nuxt-link to="/sitemap" class="std_link">Карта сайта</nuxt-link>

  </section>

  <section class="contacts">
    <a class="phone" href="tel://+74951980882">+7 (495) 198-08-82</a><br>
    <nuxt-link to="/info/support" class="std_link">contact@unicso.ru</nuxt-link>
    <div>Пн.-Пт. с 8:00 до 20:00</div>
  </section>
  </main>


</footer>
</template>

<script>
export default {
  name: "FooterComponent"
}
</script>

<style scoped>
footer{
  position: absolute;
  left: 0px;
  margin-left: 0px;
  width: 100%;
  padding-bottom: 40px;
}
footer main{

  text-align: center;
  display: inline-flex;
  padding-top: 20px;

}



footer main .copiryght{
  margin-top: -40px;
  font-size: 0.8rem;
}
footer main .logotype{
  width: 30%;
  margin-top: -20px;
  zoom: 1.2;
}
footer main .links{
  width: 40%;
 /* column-count: 2;*/
  display: inline-flex;
  flex-flow: wrap;
  padding-left: 10%;

}
footer main .links a{
  display: inline-flex;
  width: 50%;
  line-height: 1.8rem;
}
footer main  .contacts {
  width: 30%;
}

footer main .contacts a{
  font-size: 1.3rem;
  font-weight: bold;
  line-height: 2rem;
}
</style>