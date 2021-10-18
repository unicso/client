<template>
<section>
  <div class="btn-std show_catalog on_top_1 hide__on__mobile" @click="show_catalog = !show_catalog">Каталог товаров</div>




    <div  v-if="show_catalog" class="product_category show_catalog_in hide__on__mobile" :class="show_subcategory?'':''" @mouseleave="show_subcategory = false">
  <ul class="parent_category content_block dropdown_forward on_top_1">
    <li  class="std_link" v-for="(main, index) in $store.state.shop.category"
         :key="main.id"
        @mouseover="selectCategory(main)">
      <div class="item_name">
        <div class="icons icons16" :class="main.cef_name"></div>
        <div>{{main.name}}</div>
      </div>
    </li>
  </ul>
  <div class="sub_menu content_block " v-show="show_subcategory" :class="[show_subcategory?'on_top_1':'']" @click="show_subcategory=false">
    <div class="sub_category" v-for="item in sub_category" :key="item.name">

      <ul>
        <li>
          <h4>
            <nuxt-link class="std_link" :to="'/catalog/'+item.cef_name" @click="show_catalog = false">
              {{ item.name}}
            </nuxt-link>
          </h4>
        </li>
        <li   v-for="child in item.child" :key="child.name"  @click="show_catalog = false">
         <nuxt-link class="std_link" :to="'/catalog/'+child.cef_name"> {{child.name}}</nuxt-link>
        </li>
      </ul>

    </div>
  </div>

</div>



</section>
</template>

<script>
import ProductFilters from "../common/ProductFilters";
export default {
name: "ProductCategory",
  components: {ProductFilters},
  data(){
    return{

      show_subcategory:false,
      sub_category:{},
      show_catalog:false
    }
  },
  watch:{
  '$route.fullPath'(newVal, oldVal){
    this.show_catalog = false
  },
  '$store.state.user.isAuth'(newVal){
    this.$store.dispatch('config/getConfig')
    this.$store.dispatch('shop/fetchShopData')
  }
  },
  methods:{
    selectCategory(parent)
    {
      this.show_subcategory = true
      this.sub_category = parent.child
    }
  }
}
</script>

<style scoped>
.show_catalog{
  position: absolute;
  width: 250px;
  margin-left: 8px;

}
.sub_menu, .show_catalog{

}
.product_category{
  margin-top: 40px;
}
.parent_category {
padding-top: 15px;
  align-self: baseline;
  min-width: 300px;
  /*font-size: 1.2rem;*/

}
li p{
  margin: 0px;
  padding: 0px;
}
ul{
  list-style: none;
  padding:0px;
  margin-left: 0px;
}
li{
  padding:5px 5px 5px 10px
}
li:hover{
  background-color: rgba(20,20,20, 0.05);
}
.product_category{
  position: absolute;
  grid-column-gap: 0px;
  max-width: 1200px;
}
.sub_menu{
  position: relative;
/*  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
*/
  column-count: 2;
}
.sub_menu{
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 15px rgba(0,0,0,0.22);
}

.icons{

}


@media screen and (max-width: 480px){

}
.item_name{
  display: inline-flex;
}
.item_name div:first-child{


}
.item_name div:last-child{
  margin-left: 10px;
  padding-top: 3px;
}
.sub_category{
  word-spacing: normal;
  display: inline-flex;
  max-width: 390px;
  min-width: 200px;

}
.sub_category ul li:not(:first-child){
  margin-left: 10px;
}
.sub_category ul li:first-child{
  margin-left: -10px;
}
.sub_category ul li h4{
  margin-bottom: 5px;
}
.sub_menu{
  min-height: 200px;
  z-index: 100;
}
</style>