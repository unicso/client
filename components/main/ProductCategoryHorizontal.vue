<template>
  <section>
    <div class="btn-std product_category_horizontal on_top_1 hide__on__mobile" @click="show_catalog = !show_catalog">
      <div class="hamburger" :class="{'active':show_catalog}">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
      <div class="title">
        Каталог товаров
      </div>
    </div>

    <div class="sub_categories">
      <ul>
        <li v-for="(main, index) in $store.state.shop.category">{{main.name}}</li>



      </ul>




    </div>


  </section>
</template>

<script>
export default {
  name: "ProductCategoryHorizontal",
  data() {
    return {
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

.product_category_horizontal{
display: inline-flex;
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
/**
SUBCATEGORIES
 */
.sub_categories{
  position: absolute;
  background-color: red;
  width: 100%;
  left: 0;
  z-index: 100;
}
.sub_categories >ul{
  list-style: none;
  display: flex;
}
.sub_categories >ul li{
  flex-wrap: wrap;
  white-space: pre-wrap;
}



</style>