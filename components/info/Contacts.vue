<template>
<div class="content_block">
  <h1>Контактная информация</h1>

  <a class="phone" href="tel://+74951980882">Телефон для связи: <b>+7 (495) 198-08-82</b></a><br><br>
  <a class="email" href="mailto:devzak@unicso.ru?subject=Вопросы по поставке товаров" >Предложения от поставщиков и производителей: <b>devzak@unicso.ru</b></a><br><br>
  <a class="email" href="mailto:order@unicso.ru?subject=Вопросы по заказам" >Поддержка клиентов: <b>order@unicso.ru</b></a><br><br>
  <a class="email" href="mailto:contact@unicso.ru?subject=Общие вопросы" >Общие вопросы: <b>contact@unicso.ru</b></a><br><br>
  <a class="email" href="mailto:dev@unicso.ru?subject=Работа интернет-магазина" >Вопросы по работе интернет-магазина: <b>dev@unicso.ru</b></a><br><br>

  <p class="time">	<b>&#9719;</b> Время работы: Понедельник-Пятница с 8:00 до 20:00.</p>


</div>
</template>

<script>
export default {
name: "Contacts"
}
</script>

<style scoped>
a{
  font-size: 1.2rem;
}
.phone:before{
  content: "\260E  ";
}
.email:before{
  content: "\2709  ";
}
.time:before{

}
.time b {
  font-weight: normal;
  font-size: 1.2rem;
}
</style>