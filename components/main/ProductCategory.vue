<template>
<div class="product_category" :class="show_subcategory?'foreground':''" @mouseleave="show_subcategory = false">

  <ul class="parent_category content_block on_top">
    <li  class="std_link" v-for="(main, index) in $store.state.shop.category"
         :key="main.id"
        @mouseover="selectCategory(main)">
      <p>
        {{main.name}}
      </p>
    </li>
  </ul>
  <div class="sub_menu content_block" v-show="show_subcategory" :class="[show_subcategory?'on_top':'on_down']" @click="show_subcategory=false">
    <div class="sub_category" v-for="item in sub_category" :key="item.name">
      <h4>
        <nuxt-link class="std_link" :to="'/catalog/'+item.cef_name">
          {{ item.name}}
        </nuxt-link>
      </h4>
      <ul>
        <li   v-for="child in item.child" :key="child.name" >
         <nuxt-link class="std_link" :to="'/catalog/'+child.cef_name"> {{child.name}}</nuxt-link>
        </li>
      </ul>

    </div>
  </div>

</div>
</template>

<script>
export default {
name: "ProductCategory",
  data(){
    return{

      show_subcategory:false,
      sub_category:{}
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
.parent_category {
padding-top: 15px;
  align-self: baseline;
  /*font-size: 1.2rem;*/

}
li p{
  margin: 0px;
  padding: 0px;
}
ul{
  list-style: none;
  padding:0px;
  margin-left: 20px;
}
li{
  padding:5px 5px 5px 10px
}
li:hover{
  background-color: rgba(20,20,20, 0.05);
}
.product_category{
  position: absolute;
  grid-column-gap: 20px;
  max-width: 1200px;
}
.sub_menu{
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;

}
.sub_menu{
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 15px rgba(0,0,0,0.22);
}
.foreground{
  z-index: 200;
}
@media screen and (max-width: 480px){

}


</style>