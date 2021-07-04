<template>
  <section v-if="type=='client'">
    <div class="input__field">
      <label>email</label>
      <input type="text" v-model="email" placeholder="email">
    </div>
    <div class="input__field">
      <label>Пароль</label>
      <input type="text" v-model="password" placeholder="Пароль">
    </div>
    <div class="input__field">
      <button class="btn-std">Зарегистрировать</button>
    </div>
  </section>
  <section v-else-if="type=='manager'">
    <div class="input__field">
      <label>Контактное имя</label>
      <input type="text" v-model="name" placeholder="Контактное имя">
    </div>
    <div class="input__field">
      <label>email</label>
      <input type="text" v-model="email" placeholder="email">
    </div>
    <div class="input__field">
      <label>Пароль</label>
      <input type="text" v-model="password" placeholder="Пароль">
    </div>

    <div class="input__field">
      <label>Менеджер</label>
      <select v-model="manager_email">
        <option></option>
        <option v-for="value in managers" :value="value.email">{{value.fullname}} - {{value.email}}</option>

      </select>
    </div>
    <div class="">
      <button class="btn-std" @click="registrationManager">Зарегистрировать</button>
    </div>
    <div class="error">{{error}}</div>
  </section>
  <section v-else>
    TEST
  </section>

</template>

<script>

export default {
  name: "RegistrationForm",
  props:[
    'type'
  ],
  data(){
    return{
      email:'',
      password:'',
      name:'',
      managers:{},
      manager_email:'',
      error:false

    }
  },
  watch:{
    manager_email(newVal){
      this.email  = newVal
    }
  },
  mounted(){
    this.genPassword()
    if(this.type == 'manager')
      this.getManagers()
  },
  methods:{
    async genPassword(){
      const result = await this.$store.dispatch('api/get', {endpoint:'helper/generator/password/2'})
      if(result.error == false)
        this.password = result.body
    },
    async getManagers(){
      const result = await this.$store.dispatch('api/get', {endpoint:'lk/admin/managers'})
      if(result.error == false)
        this.managers = result.body
    },
    async registrationManager(){
      let params ={
        endpoint:'lk/admin/users/manager',
        params:
            {
              email:this.email,
              name:this.name,
              password:this.password,
              role:50
            }
      }

       const result = await this.$store.dispatch('api/post', params);

      if(result.error == false)
      {
        location.reload()
      }
      else{
        this.error = result.body
      }
    }

  }
}
</script>

<style scoped>
.error{
  color:red;
  font-size: 1.2rem;
}
</style>