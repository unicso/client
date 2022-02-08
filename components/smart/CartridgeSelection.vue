<template>
<section>
  <h1>Подбор картриджей</h1>

  <div class="cartridge_select">
    <div class="input__field">
      <label>Производитель</label>
      <select v-model="manufactor" >
        <option v-for="(item, index) in items">{{index}}</option>
      </select>
    </div>
    <div class="input__field" v-if="manufactor!=false">
      <label>Модель</label>
      <select v-model="model">
        <option v-for="(item, index) in items[manufactor]">{{index}}</option>
      </select>
    </div>
    <br><br>
    <div class="result" v-if="result!=false">
         <table class="table">
           <thead>
            <tr>
              <th>Производитель</th>
              <th>Наименование</th>
              <th>Модель картриджа</th>
              <th>Цвет</th>

              <th></th>
            </tr>
           </thead>
           <tbody>
           <tr v-for="item in result">
             <td>{{item.manufacturer}}</td>
             <td>{{item.name}}</td>
             <td>{{item.model_value}}</td>
             <td>{{item.color_value}}</td>

             <td><button class="btn-std" @click="addToOrder(item)">Добавить</button> </td>
           </tr>

           </tbody>
         </table>


      </div>
    <div class="client_support content_block">
      <header>Отправить запрос</header>
      <main>

        <div class="field__block">
          <label>Ваши ФИО</label>
          <input type="text">
        </div>
        <div class="field__block">
          <label>Ваш номер телефона</label>
          <input type="text"  >
        </div>
        <div class="field__block">
          <label>Email</label>
          <input type="text" >
        </div>
        <div class="field__block">
          <label>Должность</label>
          <input type="text">
        </div>



        <div class="field__block">
          <label>Выбранные товары</label>
          <div class="selected_services">
              <div v-for="(printer, model ) in ordered" class="selected_cartridge">
                {{printer}} - {{model}}  <b @click="deleteItem(model)" class="btn__close"></b>
              </div>
          </div>
        </div>

        <div class="field__block">
          <label>
            Уважаемый клиент! Если Вы не нашли в списке нужных услуг, то что искали, напишите нам. Мы обязательно подберем для Вас лучшее предложение
          </label>
          <textarea rows="9" >
      </textarea>
        </div>
        <div class="field__block">
          <label>Добавить вложение</label>
          <input type="file" id="files" ref="files" multiple  class="btn-std"/>

        </div>
        <div class="field__block">
          <label></label>
          <input type="button" value="Отправить" class="btn-std base_shadow_hover" >
        </div>

      </main>


    </div>



  </div>




</section>
</template>

<script>
import SmartRequest from "./SmartRequest";
import CatalogItemListView from "../catalog/CatalogItemListView";
export default {
  name: "CartridgeSelection",
  components: {CatalogItemListView, SmartRequest},
  data(){
    return{
      items:false,
      manufactor:false,
      show_model:false,
      model:false,
      search:false,
      searchItems:false,
      ordered:{}

    }
  },
  computed:{
    result()
    {
      if(this.manufactor && this.model){

        return this.items[this.manufactor][this.model]
      }
      else
      {
        return false

      }


    }

  },
  watch:{
    result(newVal){

      if(newVal != false)
        this.getItems(newVal)

    }

  },
  mounted() {
    this.getCartridges();

 //   this.loadItems()
  },

  methods:{
    async getCartridges()
    {
      const result = await  this.$store.dispatch('api/get', {endpoint:'smart/cartridge'})

      this.items = result.body

    },
    async getItems(codes)
    {
    //  const result = await  this.$store.dispatch('api/get', {endpoint:'smart/cartridge?codes='+codes})
     //
   //   this.searchItems = result.body

    },

    addToOrder(item)
    {
      let color = (item.color_value != null)?'('+ item.color_value +')':''
      this.ordered[item.model_value + color] = item.manufacturer + ' ' + item.prop_value


      this.$forceUpdate()
    },
    deleteItem(item)
    {
      delete this.ordered[item]
      this.$forceUpdate()
    }

  }

}
</script>

<style scoped>
.selected_cartridge{
  padding: 5px 1px 0px 5px;
  border: 1px solid grey;
  border-radius: 10px;
  display: inline-flex;

}
.btn__close{
  font-size: 30px;
  top:-1px;
}

.cartridge_select{
 /* width: 500px;*/
  margin: 0 auto;
}
h1{
  font-size: 2rem;
}
.cartridge_select .input__field{
  width: 300px;
  margin: 0 auto;
}
.result h3{
 text-align: center;
}

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
.selected_services b:not(:last-child):after{
  content: ", ";
}
</style>