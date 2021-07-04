<template>
<section>
  <h1>Пользователи сайта</h1>

 <div class="registration__block">
   <button class="btn-std" @click="show_registration_manager=!show_registration_manager; show_registration_client=false"  :disabled="show_registration_manager">Зарегистрировать менеджера</button>
   <button class="btn-std" @click="show_registration_client=!show_registration_client; show_registration_manager=false" :disabled="show_registration_client">Зарегистрировать клиента</button>

   <registration-form class="reg_form" v-if="show_registration_manager" :type="'manager'"/>
    <registration-form class="reg_form" v-if="show_registration_client" :type="'client'"/>

 </div> <br><br>



  <table class="table">
    <thead>
    <tr>
      <th>Логин</th>
      <th>email</th>
      <th>Телефон</th>
      <th>Роль</th>
      <th>Статус</th>
      <th>Создан</th>
      <th>Обновлен</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="user in users">
      <td>{{user.username}}</td>
      <td>{{user.email}}</td>
      <td>{{user.phone}}</td>
      <td>{{user.role}}</td>
      <td>{{user.status}}</td>
      <td>{{user.created_at}}</td>
      <td>{{user.updated_at}}</td>
      <td><div class="action">&#9999;</div> </td>
    </tr>
    </tbody>
  </table>
</section>
</template>

<script>
import RegistrationForm from "../../user/RegistrationForm";
export default {
  name: "SaUsers",
  components: {RegistrationForm},
  data(){
    return{
      users:false,
      show_registration_form:false,
      show_registration_manager:false,
      show_registration_client:false,

    }
  },
  created(){
    this.getUsers()
  },
  methods:{
    async getUsers(){
      const result = await this.$store.dispatch('api/get', {endpoint:'lk/admin/users'})

      if(result.error == false)
      {
        this.users = result.body
      }

    },


  }

}
</script>

<style scoped>
.action{
  zoom:1.5;
  transform: rotate(120deg);
  cursor: pointer;
}
.registration__block .reg_form{
  width: 300px;
}
.registration__block div{
  display: inline-flex;
}

</style>