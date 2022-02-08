<template>
<section>
<h1>Личный кабинет</h1>
  <div class="user_info">
    <select-price-type :show="true"/>
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

    <div class="input__field" v-if="2==3">
      <label>Ваш менеджер</label>
      <input type="text" v-model="user_info.manager_name"  disabled>
    </div>
    <div class="input__field" v-if="2==3">
      <label>Email менеджера</label>
      <input type="text" v-model="user_info.manager_email" disabled>
    </div>

    <div class="message" v-if="message">{{message}}</div>

    <div class="btn-std-100" @click="saveInfo">Сохранить изменения</div>

    <div class="btn-std-100" @click="change_password=true">Изменить пароль</div>
    <div class="input__field" v-if="change_password">
      <label>Новый пароль (не менее 6 символов)</label>
      <input type="text" v-model="new_password">
      <button class="btn-std" @click="changePassword">Сохранить изменения</button>
    </div>
  </div>

</section>
</template>

<script>
import SelectPriceType from "./SelectPriceType";
export default {
  name: "ClientProfile",
  components: {SelectPriceType},
  data(){
    return{
      user_info:false,
      message:false,
      change_password:false,
      new_password:''
    }
  },
  watch:{
    user_info:{
      handler()
      {
        this.message = false
      },
      deep:true
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

        //this.getInfo()
      }

    },
    async changePassword()
    {
      let params = {
        password:this.new_password
      }
      const result = await this.$store.dispatch('api/post', {endpoint:'lk/client/changepassword',params:params})

        this.message = result.body
        this.change_password = false

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