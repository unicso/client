<template>
<section v-if="registration_user == false">
  <h1>Список клиентов</h1>
  <details>
    <summary>Справка по регистрации</summary>
    <p>
      Чтобы была возможность регистрации пользователя для клиента необходимо в 1С в индивидуальном соглашении во вкладке <i>Прочие условия</i>
      поставить галочку <i>Доступно внешним пользователям и для обмена с сайтом.</i>. Соглашение должно быть действующим, чтобы установились цены на номеклатуру.<br>
      Индивидуальные соглашения и список клиентов выгружаются 1 раз в час или по запросу на dev@unicso.ru (временной интервал будет уменьшен). <br>
      Для регистрации клиента необходимо в списке клиентов нажать на нужного и откроется форма регистрации пользователя и список уже зарегистрированных.
    </p>
  </details>
  <br>
  <input type="text" v-model="filter" placeholder="Поиск"/>
  <table class="table">
    <thead>
    <tr>
      <th>Рабочее</th>
      <th>Сокр. наименование</th>
      <th>ИНН</th>

    </tr>

    </thead>
    <tbody>
    <tr v-for="contragent in contragents" class="contragent__item"
        v-if="
        contragent.name.toUpperCase().indexOf(filter.toUpperCase())>=0
        || contragent.official_name.toUpperCase().indexOf(filter.toUpperCase())>=0
        || (''+contragent.inn).toUpperCase().indexOf(''+filter)>=0

        "
        @click="contragent_name=contragent.name; show_registration(contragent.guid)"
        >
      <td>{{contragent.name}}</td>
      <td>{{contragent.official_name}}</td>
      <td>{{contragent.inn}}</td>


    </tr>
    </tbody>
  </table>
</section>

<section v-else>

    <details>
      <summary>Справка по регистрации пользователя.</summary>
      <p>
        Для привязки пользователя к контрагенту необходимо ввести все данные формы (телефон не обязателен)
        и выбрать доступное соглашение по умолчанию.<br>
        Пароль можно оставлять автоматически сгенерированным, а можно указать вручную. <br>
        После регистрации приходит письмо с регистрационными данными на вашу почту и почту указанную при регистрации.<br>
        В форме регистрации необходимо обратить внимание на галочку <i>Отображать товары только из соглашения</i>:<br>
         - Если данный пункт отмечен, то в каталоге товаров будут отображаться только товары из соглашения, а остальные товары
        будут убраны из каталога.<br>
        - Если пункт не отмечен, то цены на товары, которые присутствуют в соглашении, будут изменены на цены соглашения, а остальные товары будут по РРЦ.


      </p>
    </details><br>

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
      <tr v-for="c_user in contragent_users" >
        <td @click="$router.push('/user/lk/manager/client_edit?user='+c_user.user)"  class="std_link">{{c_user.user_name}}</td>
        <td @click="$router.push('/user/lk/manager/client_edit?user='+c_user.user)"  class="std_link">{{c_user.email}}</td>
        <td @click="$router.push('/user/lk/manager/client_edit?user='+c_user.user)"  class="std_link">{{c_user.phone}}</td>

        <td @click="$router.push('/user/lk/manager/client_edit?user='+c_user.user)"  class="std_link">{{c_user.price_type}}</td>

      </tr>
      </tbody>
    </table>

<div class="btn-std cancel__registration" @click="registration_user=false; show_user=false; ">Отмена</div>

  <div v-if="registration_user!=false && show_user==false">


  <h1>Добавления пользователя к {{contragent_name}}</h1>
<div class="registration__form">
  <div class="input__field">
    <label>Контактное имя</label>
    <input type="text" v-model="registration_name">
  </div>
  <div class="input__field">
    <label>email</label>
    <input type="text" v-model="registration_email">
    <label class="checkbox std_link">
      <input type="checkbox" v-model="registration_email_send">
      Отправлять сообщение о регистрации
    </label>
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
    <label v-if="2==3" class="checkbox std_link"><input type="checkbox" v-model="price_type_strong">Отображать товары только из соглашения</label>
  </div>
  <div class="input__field">
    <button class="btn-std" @click="registrationClient">Зарегистрировать</button>
  </div>
  <div v-if="error" class="error">{{error}}</div>
</div>
  </div>
</section>

</template>

<script>
import ClientInfo from "./ClientInfo";
export default {
  name: "ManagerClients",
  components: {ClientInfo},
  data(){
    return{
      contragents:{},
      new_client:false,
      email:'',
      password:'',
      client:false,
      filter_name:'',
      filter:'',
      filter_official_name:'',
      registration_user:false,
      filter_inn:'',
      contragent_name:'',
    //------------------------
      registration_name:'',
      registration_email:'',
      registration_email_send:true,
      registration_phone:'',
      registration_role:'',
      registration_password:'',
      contragent_price_type:false,
      price_type_strong:false,
      default_price_type:'',

      contragent_users:false,
      error:false,
      show_user:false,
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
              price_type_strong:this.price_type_strong,
              contragent:this.registration_user,
              price_type:this.default_price_type,
              email_send:this.registration_email_send

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
p i{
  font-weight: bold;
}
details, summary{
  cursor: pointer;
}
.checkbox{
  cursor:  pointer;

}
.error{
  color: red;
  font-size: 1.2rem;
}
</style>