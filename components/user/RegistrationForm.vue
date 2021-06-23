<template>
<section>
  <div class="">
    <label>email</label>
    <input type="text" v-model="email" placeholder="email">
  </div>
  <div class="">
    <label>Пароль</label>
    <input type="password" v-model="password" placeholder="Пароль">
  </div>
  <div class="">
    <button class="btn-std">Зарегистрировать</button>

  </div>
</section>
</template>

<script>

export default {
  name: "RegistrationForm",
  data(){
    return{
      email:'',
      password:''
    }
  }
}
</script>

<style scoped>

</style>