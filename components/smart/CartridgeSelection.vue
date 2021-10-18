<template>
<section>
  <h1>Подбор картриджей</h1>

  <div class="cartridge_select">
    <div class="input__field">
      <label>Производитель</label>
      <select v-model="manufactor"  @change="model=false">
        <option v-for="(item, index) in items">{{index}}</option>
      </select>
    </div>
    <div class="input__field" v-if="show_model">
      <label>Модель</label>
      <select v-model="model">
        <option v-for="(item1, index1) in items[manufactor]">{{index1}}</option>
      </select>
    </div>

    <div class="result" v-if="result!=false">
      <h3>Картридж для {{manufactor}} {{model}}: {{result.model}}</h3>
      <div v-if="search==false" class="not_found">
        <h2>Данный картридж отсутствует на сайте. <br>
        Вы можете заказать его у нас.
        </h2>

      <smart-request/>
      </div>
    </div>


  </div>

</section>
</template>

<script>
import SmartRequest from "./SmartRequest";
export default {
  name: "CartridgeSelection",
  components: {SmartRequest},
  data(){
    return{
      items:{
        'HP':{
          '2200':{model:'TEST1', link:false},
          '2201':{model:'TEST2', link:'/info/about'},
        },
        'Canon':{
          '1122':{model:'TEST3', link:'/info/about'},
          '1123':{model:'TEST4', link:false},
        }
      },
      manufactor:false,
      show_model:false,
      model:false,
      search:false

    }
  },
  computed:{
    result(){

      if(this.manufactor==false || this.model==false)
        return false

      if(typeof this.items[this.manufactor][this.model] == "undefined")
        return false
      else
        return this.items[this.manufactor][this.model]

    }

  },
  watch:{
    manufactor(newVal){
      if(newVal!=false)
        this.show_model = true
    },
    result(newVal){
      if(newVal!=false)
        this.loadItems()

    }

  },
  mounted() {
    this.loadItems()
  },

  methods:{

   async loadItems(){
     let search = 'Бизнес-тетрадь 120л,А5,Space Galaxy,210х152мм,70квм,белый,карман'

     const result = await this.$store.dispatch('api/get', {endpoint:'shop/search', params:{search:search}})
    //  const result = await this.$store.dispatch('api/get', {endpoint:'shop/item/'+item_id})

     if(result.error != false)
     {
        this.search = false
     }
     else
     {

     }
    }


  }

}
</script>

<style scoped>
.cartridge_select{
  width: 500px;
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
</style>