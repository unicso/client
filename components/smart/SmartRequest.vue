<template>
<section class="smart_request">
  <h1>{{$store.state.helper.smart_request.subject}}</h1>

  <div class="client_support content_block">
    <header>Отправить запрос</header>
    <main>

      <div class="field__block">
        <label>Ваши ФИО</label>
        <input type="text" v-model="$store.state.helper.smart_request.name">
      </div>
      <div class="field__block">
        <label>Ваш номер телефона</label>
        <input type="text"   v-model="$store.state.helper.smart_request.phone">
      </div>
      <div class="field__block">
        <label>Email</label>
        <input type="text"  v-model="$store.state.helper.smart_request.email">
      </div>
      <div class="field__block">
        <label>Должность</label>
        <input type="text" v-model="$store.state.helper.smart_request.position">
      </div>
      <div class="field__block">
        <label>Назначение объекта (склад, банк, ТЦ, БЦ и т.д.)</label>
        <input type="text" v-model="$store.state.helper.smart_request.object">
      </div>
      <div class="field__block">
        <label>Место расположения объекта</label>
        <input type="text" v-model="$store.state.helper.smart_request.position">
      </div>
      <div class="field__block">
        <label>Примерная площадь</label>
        <input type="text" v-model="$store.state.helper.smart_request.area">
      </div>
      <div class="field__block">
        <label>Выбранные услуги</label>
        <div class="selected_services">
          {{($store.state.helper.smart_request.services).join()}}
        </div>
      </div>

      <div class="field__block">
        <label>
          Уважаемый клиент! Если Вы не нашли в списке нужных услуг, то что искали, напишите нам. Мы обязательно подберем для Вас лучшее предложение
        </label>
        <textarea rows="9"  v-model="$store.state.helper.smart_request.area">
      </textarea>
      </div>
      <div class="field__block" v-if="2==3">
        <label>Добавить вложение</label>
        <input type="file" id="files" ref="files" multiple  class="btn-std"/>

      </div>
      <div class="field__block">
        <label></label>
        <input type="button" value="Отправить" class="btn-std base_shadow_hover" @click="send">
      </div>

    </main>
    <div class="result" :class="[error?'error':'success']">{{result}}</div>

  </div>

</section>
</template>

<script>
export default {
  props:[
    'title'
  ],
  name: "SmartRequest",
  data(){
    return{
      name:'',
      email:'',
      message:'',
      result:'',
      error:false

    }
  },
  mounted() {
    this.$store.state.helper.smart_request.services = []
  //  (this.request.services).push(this.$route.query.name)
  },
  methods:{

    async send(){
      let params = {
        endpoint:'shop/promotions/smart-request',
        params:this.$store.state.helper.smart_request


      }
      const result = await this.$store.dispatch('api/post', params)


      if(result.error == true)
      {
        this.error = true
        this.result = result.body
      }
      else
      {
        this.error = false
        this.result = result.body
      }


    },
  }


}
</script>

<style scoped>

li{
  margin-left: 30px;

}
label:hover{
  cursor: pointer;
}
.selected_services{
  width: 400px;
}
.selection_block .input__field{
  display: inline-flex;

}
.selection_block .input__field{
  width: 100%;

}
.selection_block label{
  width: 30%;
}
.selection_block select{
  width: 70%;
}

/**
ФОРМА ОБРАТНОЙ СВЯЗИ
 */

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
.result{
  text-align: center;
  padding-bottom: 20px;
}
</style>