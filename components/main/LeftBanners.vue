<template>
<section >

  <section class="left__banners hide__on__mobile" v-if="$store.state.shop.current_category==false && 2==3">

    <div class="banner"  v-for="banner in banners" :style="'width:'+coof+'%;height:'+coof+'%;'">
      <nuxt-link v-if="banner.link" :to="banner.link">
        <img :src="banner.uri" class="content_block" width="100%" height="100%"/>
      </nuxt-link>
      <img v-else :src="banner.uri" class="content_block" width="100%" height="100%"/>
    </div>

  </section>



  <product-filters />

  <section class="left__banners hide__on__mobile" v-if="2==3">
    <nuxt-link v-for="(item, index) in bannersItems"  :to="item.link" v-if="item.count>0">
      <div class="left_banner_1"  :style="'background-image: url(' + item.image + ')'"></div>
    </nuxt-link>
  </section>

</section>


</template>

<script>
import ProductFilters from "../common/ProductFilters";
import ActionSale from "../promo/LeftBanners/ActionSale";
import ActionSale2 from "../promo/LeftBanners/ActionSale2";
import ActionSale3 from "../promo/LeftBanners/ActionSale3";
export default {
  name: "LeftBanners",
  components: {ActionSale3, ActionSale2, ActionSale, ProductFilters},
  data(){
    return{
      banners:[
        {uri:"/files/client/images/slider/left/unicare.jpg", link: '/catalog/manufacturer?manufacturer=unicare'},
        {uri:"/files/client/images/slider/left/canc.jpg", link: '/catalog/ofisnye-prinadlezhnosti'},
      ],
      coof:100,
      show_filters:false,
      bannersItems:{}
    }
  },
  computed:{
    /**
    left_banner(){
      let banner ={
        left_5:'',
        left_3:'',
      };
      let month = (new Date()).getMonth() + +1
      if(month == 12 || month == 1 || month == 2)
        console.log(123)
      else if(month== 3|| month == 4 || month == 5)
        console.log(123)
      else if(month== 6|| month == 7 || month == 8)
        console.log(123)
      else if(month== 9|| month == 10|| month == 11)
      {

        banner.left_5 = 'background-image: url("/files/client/images/banners/300/Новинки_осени.jpg")'
        banner.left_3 = 'background-image: url("/files/client/images/banners/300/actual_autumn.jpg")'



      }


      return banner
    }
  */
  },
  mounted() {
      this.loadBannerItems()
  },

  methods:{
    async loadBannerItems(){
      const result = await this.$store.dispatch('api/get', {endpoint:'shop/promotions/left_banners'})

      this.bannersItems = result.body

    }

  }
}
</script>

<style scoped>
    .left__banners{
      position: absolute;
      margin-top: 60px;
      margin-left: 7px;
      width: 270px;
    }
    .left__banners .banner{
      background-size: cover;

      margin-left: auto;
      margin-right: auto;

    }
    .left__banners .banner img{
      padding: 0px;
    }
    .shadow_on{
      box-shadow: 0px 0px 8px 4px rgb(34 60 80 / 20%);
    }
    .left_banner_1,
    .left_banner_2,
    .left_banner_3,
    .left_banner_4,
    .left_banner_5,
    .left_banner_6  {
      width: 260px;
      height: 160px;
      margin-left: 7px;
      margin-top: 0px;
      margin-bottom: 0px;


      /*  box-shadow: 0px 0px 8px 4px rgb(34 60 80 / 20%);*/
   /*   border-radius: 5px;*/
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      cursor: pointer;

    }
    .left_banner_1{
      /* animation: 0.5s zoom_in  forwards;*/
      transform: scale(1);
      transition: 0.5s ease-in-out;
    }
    .left_banner_1:hover{
     /* animation: 0.5s zoom_in  forwards;*/
      transform: scale(1.1);
      transition: 0.5s ease-in-out;

    }

    @keyframes zoom_in {
      0%{background-size: 100%}
      100%{background-size: 105%}

    }
</style>