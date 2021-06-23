<template>
<section>
  <h1>Пользователи сайта</h1>

 <div class="registration__block">
   <div class="btn-std" @click="show_registration_form=!show_registration_form">Зарегистрировать нового</div>
   <registration-form v-if="show_registration_form"/>
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
      show_registration_form:false
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

    async registrationUser(){
      let params ={
        endpoint:'lk/admin/users',
        params:
            {
              email:this.email,
              password:this.password
            }
      }

      const result = await this.$store.dispatch('api/post', params);
      console.log(result)

    }
  }

}
</script>

<style scoped>
.action{
  zoom:1.5;
  transform: rotate(120deg);
  cursor: pointer;
}
.registration__block{
  width: 250px;
}


</style>