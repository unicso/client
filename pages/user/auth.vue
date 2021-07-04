<template>
  <section v-if="$store.state.user.isAuth == false">


    <div class="authorization_block content_block">
      <header>Вход в личный кабинет</header>
      <main>
        <div class="field__block">
          <label>Email</label>
          <input type="text" v-model="email">
        </div>

        <div class="field__block">
          <label>Пароль</label>
          <input type="password" v-model="password">
        </div>

        <div class="signin">
          <button class="btn-std base_shadow_hover"  @click="login">Войти</button>
        </div>
        <div class="error" v-if="error">{{error}}</div>


      </main>


    </div>

  </section>
</template>

<script>
export default {
  name: "auth",

  data(){
    return{
      username:'test',
      email:'',
      password:'',
      error: false
    }
  },
  watch:{
    '$store.state.user.isAuth'(newVal){
      if(newVal == true)
        this.$router.replace(this.$store.state.user.lk_link)
    },
    email(){this.error=false},
    password(){this.error=false},

  },
  mounted() {
    if(this.$store.state.user.isAuth == true)
      this.$router.replace(this.$store.state.user.lk_link)
  },
  methods:{

    async login(){
      var params ={
        'email':this.email,
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
section{
  text-align: center;
}
.authorization_block{
  width: 400px;
  padding: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: 70px;

}
.authorization_block header{
  background: linear-gradient(45deg, rgb(255,73,0), rgb(255, 100, 50));
  border-radius: inherit;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  padding:  10px;
  font-size: 1.3rem;
  color: white;
}
.authorization_block main{
  padding: 30px ;

}
.authorization_block .field__block{
  display: inline-flex;
  margin-bottom: 10px;
}
.authorization_block .field__block label{
  width: 100px;
  text-align: right;
  padding-right: 20px;
}
.authorization_block{
  text-align: left;
}
.authorization_block .field__block input[type=text],.field__block input[type=password]
{
  width: 200px;
  max-width: 200px;
  min-width: 200px;
}
h1{
  font-size: 2rem;
}
input[type=button]{
  width: 150px;
}
.field__block label, .field__block input{
  display: inline-flex;
  width: 200px;
}
.signin{
  width: 100%;
  text-align: center;
  margin-top: 10px;
}
button{
  width: 200px;
  margin-left: auto;
  margin-right: auto;
}
.error{
  color:red;
  text-align: center;
  margin-top: 10px;
}
</style>