<template>
<div class="main_page_promotions">
  ТЕКСТ В ВЕРХНЕМ РЕГИСТРЕ<br>
  <b>ТЕКСТ В ВЕРХНЕМ РЕГИСТРЕ</b><br>
  <i>ТЕКСТ В ВЕРХНЕМ РЕГИСТРЕ</i><br>
  Обычный текст<br>
  <b>Обычный текст</b><br>
  <i>Обычный текст</i><br>
  <input type="text" v-model="test" placeholder="Ввести свой текст"><br>
  {{test}}<br>
  <b>{{test}}</b>
</div>
</template>

<script>
export default {
  name: "MainPagePromotions",
  data(){
    return{
      test:''
    }
  }
}
</script>

<style scoped>

</style>