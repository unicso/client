<template>
<section>

  <section class="left__banners hide__on__mobile" v-if="$store.state.shop.current_category==false">

    <div class="banner"  v-for="banner in banners" :style="'width:'+coof+'%;height:'+coof+'%;'">
      <nuxt-link v-if="banner.link" :to="banner.link">
        <img :src="banner.uri" class="content_block" width="100%" height="100%"/>
      </nuxt-link>
      <img v-else :src="banner.uri" class="content_block" width="100%" height="100%"/>
    </div>

  </section>
  <product-filters v-else/>


</section>


</template>

<script>
import ProductFilters from "../common/ProductFilters";
export default {
  name: "LeftBanners",
  components: {ProductFilters},
  data(){
    return{
      banners:[
        {uri:"/files/client/images/slider/left/unicare.jpg", link: '/catalog/manufacturer?manufacturer=unicare'},
        {uri:"/files/client/images/slider/left/canc.jpg", link: '/catalog/ofisnye-prinadlezhnosti'},
      ],
      coof:100,
      show_filters:false
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
    .left__banners{
      position: absolute;
      margin-top: 75px;
      margin-left: 7px;
    }
    .left__banners .banner{
      background-size: cover;
      margin-bottom: 10px;
      margin-left: auto;
      margin-right: auto;

    }
    .left__banners .banner img{
      padding: 0px;


    }
</style>