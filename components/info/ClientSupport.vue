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
        <label>Добавить вложение</label>
        <input type="file" id="files" ref="files" multiple  v-on:change="handleFileUpload()" class="btn-std"/>

      </div>
      <div class="field__block">
        <label></label>
        <input type="button" value="Отправить" class="btn-std base_shadow_hover" @click="sendMessage">
      </div>
      <div class="input__field error" v-if="error">
        {{error}}
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
      email_sended:false,
      error:false,
      files:false

    }
  },
  watch:{
    company(){this.error=false},
    name(){this.error=false},
    email(){this.error=false},
    message(){this.error=false},

  },
  mounted() {
   this.selectTo()
  },
  methods:{
    selectTo(){
      if(this.$route.query.email == 'devzak@unicso.ru' ||
          this.$route.query.email == 'contact@unicso.ru' ||
          this.$route.query.email == 'dev@unicso.ru' ||
        this.$route.query.email == 'order@unicso.ru' ) {
        this.to = this.$route.query.email
        this.subject = this.$route.query.subject
      }

  },

    handleFileUpload(){
      this.files = this.$refs.files.files;
    },
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
      for( var i = 0; i < this.files.length; i++ ){
        let file = this.files[i];

        params['files[' + i + ']'] = file;
      }
      const result = await this.$store.dispatch('api/post', {endpoint:'support/email', params:params})


      if(result.error == false)
        this.email_sended = true
      else
        this.error = result.body
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
   background: linear-gradient(45deg, var(--base-color), rgb(255, 100, 50));
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
}
</style>