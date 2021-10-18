<template>
<section class="smart_request">
  <div class="input__field">
    <label>Ваше имя:</label>
    <input type="text" v-model="name">
  </div>
  <div class="input__field">
    <label>Ваш email для ответа:</label>
    <input type="text" v-model="email">
  </div>
  <div class="input__field">
    <label>Текст запроса:</label>
    <textarea type="text" v-model="message" rows="6"> </textarea>
  </div>

</section>
</template>

<script>
export default {
  props:[

  ],
  name: "SmartRequest",
  data(){
    return{
      name:'',
      email:'',
      message:''

    }
  }
}
</script>

<style scoped>
.smart_request{
  width: inherit;

}
</style>