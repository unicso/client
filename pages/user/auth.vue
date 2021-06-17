<template>
<div class="authorization_fields">
  <div class="input_fields">
    <label>Логин</label>
    <input type="text" name="username" v-model="username">
  </div>
  <div class="input_fields">
    <label>Пароль</label>
    <input type="text" name="password" v-model="password">
  </div>
  <div class="input_fields">

    <button @click="login">Войти</button><br>
    <div v-if="error">{{error}}</div>
  </div>
</div>
</template>

<script>
export default {
  name: "auth",

  data(){
    return{
      username:'test',
      password:'241185',
      error: false
    }
  },
  watch:{
    '$store.state.user.isAuth'(newVal){
      if(newVal == true)
        this.$router.replace('/user/profile')
    }
  },
  mounted() {
    if(this.$store.state.user.isAuth == true)
      this.$router.replace('/user/profile')
  },
  methods:{

    async login(){
      var params ={
        'username':this.username,
        'password':this.password
      };
      const response = await this.$store.dispatch('api/put',{'endpoint':'user/auth', 'params':params});

      if(response.error == false)
      {
        this.$store.commit('user/login', response.body)
      }
      else
      {
        this.error = response.body
      }
    }
  }

}
</script>

<style scoped>

</style>