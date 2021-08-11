<template>
<section class="left__banners filters hide__on__mobile">
  <br><br><br>

  <ul class="" >
    <li class="selected_filter content_block" v-for="(selected, guid) in $store.state.shop.data_filter_selected">

      {{selected.name}} - {{selected.value}}
    <div class="btn__close" @click="deleteFilter(guid)"></div>

    </li>

  </ul>
  <div class="input__field" v-for="data in filters">

    <label>{{data['name']}}</label>
    <div class="select_filter">
      <select v-model="$store.state.shop.data_filter[data['guid']]" >
        <option v-for="item in data['child']" :value="item.props_value">{{item.value}}</option>
      </select>
      <div class="btn__close" @click="deleteFilter(data['guid'])"></div>

    </div>
  </div>
  <div class="input__field">
    <button class="btn-std" @click="$store.state.shop.data_filter= {}">Очистить</button>
  </div>


</section>
</template>

<script>
export default {
  name: "ProductFilters",
  data(){
    return{
      filters:false,
      category:'',
      filter_params:{}
    }
  },
  computed: {

  },
  watch:{
    '$store.state.shop.showedProducts'(newVal)
    {
      this.getProductFilter()
    }

  },

  mounted() {
    this.category = this.$route.params.catalog;
    this.getProductFilter()

  },

  methods:{

    async getProductFilter()
    {
      let products = JSON.stringify(this.$store.state.shop.showedProducts)
      let params = {
        endpoint:'shop/category/filters/'+this.category,
        params:{
          products:products
        }

      }
      this.changeFilter()
      const result = await this.$store.dispatch('api/post', params)

      if(result.error == false)
      {
        this.filters = result.body


      }



    },
    deleteFilter(filter){

      this.$delete(this.$store.state.shop.data_filter, filter)
      this.$delete(this.$store.state.shop.data_filter_selected, filter)



    },
   changeFilter(){


     for (var key in this.$store.state.shop.data_filter){
       if(typeof this.$store.state.shop.data_filter[key] == 'undefined')
         delete this.$store.state.shop.data_filter[key]
     }

     for (var key in this.$store.state.shop.data_filter){
          let temp1 = this.$store.state.shop.data_filter[key]
       if(typeof this.filters[key] != 'undefined') {

         for(var temp2 in this.filters[key].child)
            if(this.filters[key].child[temp2].props_value == temp1)
              this.$store.state.shop.data_filter_selected[key] = this.filters[key].child[temp2]

       }
     }

     // console.log(this.$store.state.shop.data_filter)
   }


  }


}
</script>

<style scoped>
.filters{
width: 200px;
  margin-left: 40px !important;
}

.btn-std{
  width: 100%;
}
.select_filter{
  display: inline-flex;
  width: 100%;
  align-items: baseline;
}
.select_filter select, .select_filter .btn__close, {
  display: inline-flex;
}
.selected_filter{
  display: inline-flex;
}
.selected_filter .btn__close{
font-size: 30px;
  align-items: baseline;
}
.content_block{
  margin-left: 0px;
  width: 100%;
}
</style>