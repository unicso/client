<template>
<section>
  <div class="btn-std-2 show_catalog on_top_1  hide__on__mobile" @click="show_catalog = !show_catalog">
    <div class="hamburger" :class="{'active':show_catalog}">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
    <div class="image-1"></div>
    <div class="image-2"></div>

    Каталог товаров
  </div>




    <div  v-if="show_catalog" class="product_category show_catalog_in hide__on__mobile" :class="show_subcategory?'':''" @mouseleave="show_subcategory = false">
  <ul class="parent_category content_block dropdown_forward on_top_1">
    <li  class="std_link" v-for="(main, index) in $store.state.shop.category"
         :key="main.id"
        @mouseover="selectCategory(main)">
      <div class="item_name">
        <div class="icons icons16 custom_icon" :class="main.cef_name" v-if="main.icon!='false' && main.icon!=''" :style="'background-image: url('+main.icon+ '); background-size: contain;'"></div>
        <div class="icons icons16" :class="main.cef_name" v-else></div>

        <nuxt-link class="std_link" :to="'/catalog/'+main.cef_name" @click="show_catalog = false">
          <div>{{main.name}}</div>
        </nuxt-link>
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
 /* position: absolute;*/
 /* width: 250px;*/
  margin-left: 8px;
  width: 170px;
  display: inline-flex;

}
.sub_menu, .show_catalog{

}

.parent_category {
  padding-top: 15px;
  align-self: baseline;
  min-width: 300px;
  /*font-size: 1.2rem;*/
  margin-top: 5px;
  left: 10px;

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
  margin-left: -50px;

}
.sub_menu{
  position: relative;
/*  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
*/
  column-count: 2;
  min-height: 500px;
  height: 100%;
  margin-left: 4px;
  width: 800px;

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
  width: 100%;

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
  min-height: 100%;

  z-index: 100;
}
.btn-std-2{
  position: relative;
  height: 37px;
  align-items: center;
  border-top: 3px solid var(--base-color);
  border-bottom: 3px solid var(--base-color);

}
.btn-std-2:hover{
  cursor: pointer;
  transform: scale(1.1);
  transition: 0.5s ease-in-out;
}
.custom_icon{
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.btn-std{
  margin-top: 0;
  padding: 5px;
  border: 2px solid var(--base-color);
}
.image-1{
  background-image: url("/files/client/images/template2.png");
  background-size: contain;
  background-repeat: no-repeat;
  height: 44px;
  width: inherit;
  position: absolute;
  left: -15px;
  top: -3px;
}
.image-2{
  background-image: url("/files/client/images/template2.png");
  background-size: contain;
  background-repeat: no-repeat;
  height: 44px;
  width: inherit;
  position: absolute;
  left: -6px;
  transform: scale(-1, 1);
  margin-left: 20px;
  top: -3px;
}

.btn-std{

}

input{
  padding: 7px;
}
/**
HAMBURGER
 */
.hamburger{
  width: 30px;
  margin-right: 10px;
  zoom: 0.8;
}
.hamburger .line{
  width: inherit;
  height: 5px;
  background-color: black;
  margin-bottom: 5px;
  border-radius: 8px;
  opacity: 1;
  transform: rotate(0) translate(0, 0);
  transition: 0.5s ease-in-out;
}
.hamburger.active .line:nth-child(2){
  opacity: 0;

  transform: rotate(0deg);
}
.hamburger.active .line:nth-child(1){
  transform: rotate(45deg) translate(8px, 12px);
}
.hamburger.active .line:nth-child(3){
  transform: rotate(-45deg) translate(3px, -5px);
}
.btn-std-2{
  font-size: 1.1rem;
}


</style>