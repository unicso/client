<template>
<section class="left__banners filters hide__on__mobile" ref="element_filter" v-if="Object.keys(filters).length>0">
  <br><br><br>

  <ul class="" v-if="2==3">
    <li class="selected_filter content_block" v-for="(selected, guid) in $store.state.shop.data_filter_selected">

      {{selected.name}} - {{selected.value}}
    <div class="btn__close" @click="deleteFilter(guid)"></div>

    </li>

  </ul>
  <div class="input__field" v-for="data in filters" >

    <label>{{data['name']}}</label>
    <div class="select_filter">
      <select v-model="$store.state.shop.data_filter[data['guid']]" >
        <option v-for="item in data['child']" :value="item.props_value">{{item.value}}</option>
      </select>
      <div class="btn__close" @click="deleteFilter(data['guid'])"></div>

    </div>
  </div>
  <div class="input__field">
    <button class="btn-std " @click="$store.state.shop.data_filter= {}">Очистить</button>
  </div>



    <div v-html="'<style>.nuxt__content{min-height: ' + filterHeight +  'px}</style>'"></div>
</section>
</template>

<script>
export default {
  name: "ProductFilters",
  data(){
    return{
      filters:false,
      category:'',
      filter_params:{},
      filterHeight:1
    }
  },
  computed: {

  },
  watch:{
    '$store.state.shop.showedProducts'(newVal)
    {
      this.getProductFilter()
    },


  },

  mounted() {
    this.$store.state.shop.data_filter = {};
    this.$store.state.shop.data_filter_selected = {};
    this.category = this.$route.params.catalog;
    this.getProductFilter()
    if(Object.keys(this.filters).length>0)
    new ResizeObserver(this.onResize).observe(this.$refs.element_filter)

  },

  methods:{
    onResize()
    {

  if(this.$refs!=undefined && this.$refs.element_filter!=undefined )
     this.filterHeight = +this.$refs.element_filter.offsetHeight + 200

    },
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
        this.onResize()

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
  margin-left: 0px;
  margin-right: 0px;
}
.select_filter{
  display: inline-flex;
  width: 100%;
  align-items: baseline;
}
.select_filter select, .select_filter .btn__close {
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