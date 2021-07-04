<template>
<section v-if="registration_user == false">
  <h1>Список клиентов</h1>
  <table class="table">
    <thead>
    <tr>
      <th>наименование</th>
      <th>Офиициальное название</th>
      <th>ИНН</th>
      <th>Зарегистрирован</th>
    </tr>
    <tr>
      <th><input type="text" v-model="filter_name"></th>
      <th><input type="text" v-model="filter_official_name"></th>
      <th></th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="contragent in contragents" class="contragent__item"
        v-if="
        contragent.name.toUpperCase().indexOf(filter_name.toUpperCase())>=0
        &&
        contragent.official_name.toUpperCase().indexOf(filter_official_name.toUpperCase())>=0
        "
        @click="contragent_name=contragent.name; show_registration(contragent.guid)"
        >
      <td>{{contragent.name}}</td>
      <td>{{contragent.official_name}}</td>
      <td>{{contragent.inn}}</td>
      <td></td>

    </tr>
    </tbody>
  </table>
</section>

<section v-else>
    <table class="table">
      <thead>
      <tr>
        <th>Имя</th>
        <th>email</th>
        <th>Телефон</th>
        <th>Соглашение</th>

      </tr>
      </thead>
      <tbody>
      <tr v-for="c_user in contragent_users">
        <td>{{c_user.user_name}}</td>
        <td>{{c_user.email}}</td>
        <td>{{c_user.phone}}</td>

        <td>{{c_user.price_type}}</td>

      </tr>
      </tbody>
    </table>

<div class="btn-std cancel__registration" @click="registration_user=false">Отмена</div>
  <h1>Добавления пользователя к {{contragent_name}}</h1>
<div class="registration__form">
  <div class="input__field">
    <label>Контактное имя</label>
    <input type="text" v-model="registration_name">
  </div>
  <div class="input__field">
    <label>email</label>
    <input type="text" v-model="registration_email">
  </div>
  <div class="input__field">
    <label>Пароль</label>
    <input type="text" v-model="registration_password">
  </div>

  <div class="input__field">
    <label>Телефон</label>
    <input type="text" v-model="registration_phone">
  </div>
  <div class="input__field">
    <label>Соглашение по умолчанию</label>
    <select v-model="default_price_type">
      <option v-for="price_type in contragent_price_type" :value="price_type.guid">{{price_type.name}}</option>

    </select>
  </div>
  <div class="input__field">
    <button class="btn-std" @click="registrationClient">Зарегистрировать</button>
  </div>
</div>

</section>

</template>

<script>
export default {
  name: "ManagerClients",

  data(){
    return{
      contragents:{},
      new_client:false,
      email:'',
      password:'',
      client:false,
      filter_name:'',
      filter_official_name:'',
      registration_user:false,
      filter_inn:'',
      contragent_name:'',
    //------------------------
      registration_name:'',
      registration_email:'',
      registration_phone:'',
      registration_role:'',
      registration_password:'',
      contragent_price_type:false,
      default_price_type:'',

      contragent_users:false,

      result:{}
    }
  },
  watch:{
    registration_user(newVal){
      this.genPassword()
      this.getContragentUsers()
    }
  },
  mounted() {
    this.getContragents()
    this.genPassword()
  },

  methods:{
    async show_registration(guid){
      this.registration_user = guid
      this.getContragentPriceTypes()
    },
    async getContragents(){
      const result = await this.$store.dispatch('api/get',{endpoint:'lk/manager/clients'})
      if(result.error == false)
      {
        this.contragents = result.body
      }


    },
    async getContragentPriceTypes(){
      const result = await this.$store.dispatch('api/get',{endpoint:'lk/manager/clients/price_types/'+this.registration_user})
      if(result.error == false)
      {
        this.contragent_price_type = result.body
      }
    },
    async getContragentUsers(){
      const result = await this.$store.dispatch('api/get',{endpoint:'lk/manager/clients/users/'+this.registration_user})
      if(result.error == false)
      {
        this.contragent_users = result.body
      }
    },


    async registrationClient()
    {
      let params ={
        endpoint:'lk/manager/client',
        params:
            {
              email:this.registration_email,
              name:this.registration_name,
              password:this.registration_password,
              phone:this.registration_phone,
              role:10,

              contragent:this.registration_user,
              price_type:this.default_price_type

            }
      }

      const result = await this.$store.dispatch('api/post', params);
      this.result = result

      if(result.error == false)
      {
        location.reload()
      }
      else{
        this.error = result.body
      }
    },

    async genPassword(){
      const result = await this.$store.dispatch('api/get', {endpoint:'helper/generator/password/8'})
      if(result.error == false)
        this.registration_password = result.body
    },



    //lk/manager/clients/price_types
  }


}
</script>

<style scoped>
.registration__client, .cancel__registration{
  width: 300px;
}
.contragent__item{
  cursor: pointer;
}
.registration__form{
  width: 400px;
}
</style>