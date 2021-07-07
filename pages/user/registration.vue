<template>
  <section >


    <div class="client_support content_block" v-if="email_sended==false">
      <header>Запрос на регистрацию</header>
      <main>
        <div class="field__block">
          <label>Название вашей компании <sup>*</sup></label>
          <input type="text" v-model="company">
        </div>
        <div class="field__block">
          <label>ИНН <sup>*</sup></label>
          <input type="text" v-model="inn">
        </div>
        <div class="field__block">
          <label>КПП <sup>*</sup></label>
          <input type="text" v-model="kpp">
        </div>

        <div class="field__block">
          <label>Ваши ФИО, должность <sup>*</sup></label>
          <input type="text" v-model="name">
        </div>
        <div class="field__block">
          <label>Email <sup>*</sup></label>
          <input type="text" v-model="email">
        </div>
        <div class="field__block">
          <label>Ваш номер телефона</label>
          <input type="text"  v-model="phone">
        </div>
        <div class="field__block">
          <label></label>
          <input type="button" value="Отправить" class="btn-std base_shadow_hover" @click="sendMessage">
        </div>
        <div class=" error" v-if="error">
          {{error}}
        </div>
      </main>


    </div>
    <div v-else>
      <h3>Запрос на регистрацию отправлен.<br> В ближайшее время менеджер свяжется с вами.</h3>

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
      inn:'',
      kpp:'',
      email:'',
      phone:'',
      message:'',
      to:'order@unicso.ru',
      subject:'Поддержка клиентов',
      email_sended:false,
      error:false

    }
  },
  watch:{
    company(){this.error=false},
    name(){this.error=false},
    email(){this.error=false},
    message(){this.error=false},
    inn(){this.error=false},
    kpp(){this.error=false},

  },
  methods:{

    async sendMessage(){

      this.message = 'ИНН компании: '+ this.inn + '<br>КПП компании: '+ this.kpp
      if(this.company=='' || this.inn=='' || this.kpp=='' || this.email==''  )
        this.error = 'Название вашей компании, ИНН, КПП, email, Ваши ФИО, должность обязательны для заполнения.'
      let params = {
        company:this.company,
        name:this.name,
        email:this.email,
        phone:this.phone,
        message:this.message,
        to:this.to,
        subject:'Запрос на регистрацию',


      }

        if(this.error == false)
        {
          const result = await this.$store.dispatch('api/post', {endpoint:'support/email', params:params})

          if(result.error == false)
            this.email_sended = true
        }
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
  margin-top: 40px;

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

@media screen and (max-width: 720px){
  .client_support main{
    padding: 2px;
  }
  .client_support .field__block{
    display: block;
    margin-bottom: 10px;
  }
  .client_support{
    width: 100%;
  }
  .client_support .field__block label, .client_support .field__block input[type=text],  .client_support .field__block textarea{
    width: 100%;
    max-width: 100%;
    text-align: left;
    min-width: 100%;
    display: block;
  }

}
.error{
  color: red;
  font-size: 1.2rem;
  margin-top: 15px;
}
</style>