<template>
<section >
  <h1>Служба поддержки клиентов</h1>

  <div class="client_support content_block" v-if="email_sended==false">
    <header>Отправить сообщение</header>
    <main>
      <div class="field__block">
        <label>Название вашей компании</label>
        <input type="text" v-model="company">
      </div>
      <div class="field__block">
        <label>Ваши ФИО, должность</label>
        <input type="text" v-model="name">
      </div>
      <div class="field__block">
        <label>Email</label>
        <input type="text" v-model="email">
      </div>
      <div class="field__block">
        <label>Ваш номер телефона</label>
        <input type="text"  v-model="phone">
      </div>
      <div class="field__block">
        <label>Сообщение</label>
        <textarea rows="9"  v-model="message">
      </textarea>
      </div>
      <div class="field__block">
        <label></label>
        <input type="button" value="Отправить" class="btn-std base_shadow_hover" @click="sendMessage">
      </div>

    </main>


  </div>
  <div v-else>
    <h3>Сообщение отправлено</h3>

  </div>
</section>
</template>

<script>
export default {
  name: "ClientSupport",
  data(){
    return{
      company:'',
      name:'',
      email:'',
      phone:'',
      message:'',
      to:'order@unicso.ru',
      subject:'Поддержка клиентов',
      email_sended:false

    }
  },

  methods:{

    async sendMessage(){

      let params = {
        company:this.company,
        name:this.name,
        email:this.email,
        phone:this.phone,
        message:this.message,
        to:this.to,
        subject:this.subject,


      }
      const result = await this.$store.dispatch('api/post', {endpoint:'support/email', params:params})

      if(result.error == false)
        this.email_sended = true

    }

  }


}
</script>

<style scoped>
section{
  text-align: center;
}
.client_support{
  width: 700px;

  padding: 0;
  margin-left: auto;
  margin-right: auto;

}
.client_support header{
   background: linear-gradient(45deg, rgb(255,73,0), rgb(255, 100, 50));
  border-radius: inherit;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  padding:  10px;
  font-size: 1.3rem;
  color: white;
}
.client_support main{
  padding: 30px ;

}
.client_support .field__block{
  display: inline-flex;
  margin-bottom: 10px;
}
.client_support .field__block label{
  width: 200px;
  text-align: right;
  padding-right: 20px;
}
.content_block{
  text-align: left;
}
.client_support .field__block input[type=text],
.client_support .field__block textarea
{
  width: 400px;
  max-width: 400px;
  min-width: 400px;
}
h1{
  font-size: 2rem;
}
input[type=button]{
  width: 150px;
}
</style>