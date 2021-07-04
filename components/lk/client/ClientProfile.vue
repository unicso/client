<template>
<section>
<h1>Личный кабинет</h1>
  <div class="user_info">
    <div class="input__field">
      <label>Имя</label>
      <input type="text" v-model="user_info.name">
    </div>
    <div class="input__field">
      <label>Телефон</label>
      <input type="text" v-model="user_info.phone">
    </div>
    <div class="input__field">
      <label>email</label>
      <input type="text" v-model="user_info.email" disabled>
    </div>
    <div class="input__field">
      <label>Компания</label>
      <input type="text" v-model="user_info.contragent_official_name"  disabled>
    </div>
    <div class="input__field">
      <label>ИНН</label>
      <input type="text" v-model="user_info.contragent_inn"  disabled>
    </div>
    <div class="input__field">
      <label>КПП</label>
      <input type="text" v-model="user_info.contragent_kpp"  disabled>
    </div>

    <div class="input__field">
      <label>Ваш менеджер</label>
      <input type="text" v-model="user_info.manager_name"  disabled>
    </div>
    <div class="input__field">
      <label>Email менеджера</label>
      <input type="text" v-model="user_info.manager_email" disabled>
    </div>

    <button class="btn-std" @click="saveInfo">Сохранить изменения</button>
    <div class="message" v-if="message">{{message}}</div>

  </div>

</section>
</template>

<script>
export default {
  name: "ClientProfile",

  data(){
    return{
      user_info:false,
      message:false
    }
  },
  mounted() {
    this.getInfo()
  },
  methods:{
    async getInfo()
    {
      const result = await this.$store.dispatch('api/get', {endpoint:'lk/client/info'})
      if(result.error == false)
        this.user_info = result.body
    },
    async saveInfo()
    {
      let params = {
        name:this.user_info.name,
        phone:this.user_info.phone
      }
      const result = await this.$store.dispatch('api/put', {endpoint:'lk/client/info',params:params})
      if(result.error == false) {
        this.message = result.body
        setTimeout(()=>{this.message = false}, 3000)
        this.getInfo()
      }

    }

  }

}
</script>

<style scoped>
.user_info{
  width: 300px;
  margin-left: auto;
  margin-right: auto;
}
.input__field input:not(:disabled){
  background-color: transparent;
}
.message{
  font-size: 1.3rem;
  color:green;
}
</style>