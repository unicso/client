<template>
<div class="main_page_content">
  <div class="empty_block"></div>
  <div class="top_content">
    <slider-clean/>
    <button-after-slider v-if="2==3"/>
    <main-page-promotions v-if="2==3" class="content_block"/>
    <buisness-type v-if="2==3"/>
    <products-slider v-if="2==3"/>

    <promotions-block class="promotions_block" v-if="2==3" />
    <ul>
      <li><items-slider2 v-for="data in $store.state.shop.main_page_items" :data_arr="data"/></li>

    </ul>
  </div>
</div>
</template>

<script>
import Slider from "./MainPageContent/Slider";
import MainPagePromotions from "./MainPageContent/MainPagePromotions";
import MainBlockSecond from "./MainPageContent/MainBlockSecond";
import ProfitBlock from "./MainPageContent/ProfitBlock";
import PromotionsBlock from "./MainPageContent/PromotionsBlock";
import SliderClean from "./MainPageContent/SliderClean";
import ButtonAfterSlider from "./MainPageContent/ButtonAfterSlider";
import BuisnessType from "../promo/BusinessType/BusinessType";
import ProductsSlider from "../common/ProductsSlider";
import ItemsSlider from "../common/ItemsSlider";
import ItemsSlider2 from "../common/ItemsSlider2";

export default {
  components:{
    ItemsSlider2,
    ItemsSlider,
    ProductsSlider,
    BuisnessType,
    ButtonAfterSlider,
    SliderClean,
    PromotionsBlock,
    ProfitBlock,
    MainBlockSecond,
    Slider, MainPagePromotions,
  },
  name: "MainPageContent",

  data(){
    return{
        items:false
    }
  },
  async fetch()
  {
 //   const result = await  this.$store.dispatch('api/get', {endpoint:'https://dev.unicso.ru/v1/shop/promotions/mainpage'})
  //
   // this.items = result.body

  },
  mounted() {
  this.$store.dispatch('shop/getMainPage')
  },

  methods:{
    async load()
    {

   //   const result = await  this.$store.dispatch('api/get', {endpoint:'shop/promotions/mainpage'})

     // this.items = result





    },


    FETCH_DATA_ITEMS2(){
      var test1 ={
        rows:2,
        cols:4,
        type:'items',
        name:'Предложения по сферам деятельности',
        items:[
          {name:'Образовательные учреждения', link:'/promo/business/school', image:'/files/client/images/business_type/school.jpg'},
          {name:'Медицинские учреждения', link:'/promo/business/school', image:'/files/client/images/business_type/medecine.jpg'},
          {name:'Гостиницы и рестораны', link:'/promo/business/school', image:'/files/client/images/business_type/horeka.jpg'},
          {name:'Сфера услуг', link:'/promo/business/school', image:'/files/client/images/business_type/uslugi.jpg'},
          {name:'Бизнес центры', link:'/promo/business/school', image:'/files/client/images/business_type/buisness-centr.jpg'},
          {name:'Промышленные предприятия', link:'/promo/business/school', image:'/files/client/images/business_type/stroitelstvo.jpg'},
          {name:'Предприятия розничной торговли', link:'/promo/business/school', image:'/files/client/images/business_type/horeka.jpg'},
          {name:'Финансовые учреждения и страховые компании', link:'/promo/business/school', image:'/files/client/images/business_type/finance.jpg'},
          {name:'Логистические центры', link:'/promo/business/school', image:'/files/client/images/business_type/logistic.jpeg'},
          {name:'Спортивные и культурные учреждения, медиа', link:'/promo/business/school', image:'/files/client/images/business_type/fitness.jpg'},
          {name:'Предприятия сферы ЖКХ', link:'/promo/business/school', image:'/files/client/images/business_type/stroitelstvo.jpg'},
          {name:'Социальная сфера', link:'/promo/business/school', image:'/files/client/images/business_type/uslugi.jpg'},
          {name:'Недвижимость и строительство', link:'/promo/business/school', image:'/files/client/images/business_type/stroitelstvo.jpg'},
          {name:'Автосалоны, автомойки, детейлинг', link:'/promo/business/school', image:'/files/client/images/business_type/autosaloon.jpg'},
          {name:'Автосалоны, автомойки, детейлинг', link:'/promo/business/school', image:'/files/client/images/business_type/autosaloon.jpg'},

        ]

      }

      var test2 = {

        rows:1,
        cols:4,
        type:'product',
        name:'SMART Сервисы',
        items: [
          {name: 'Подбор картриджей',image: "/files/client/images/smart/cartridge.jpg",link: "/smart/cartridge-selection",},
          {name: 'Установка СКУД', image: "/files/client/images/smart/skud.jpg", link: "/smart/smart-skud",},
          {name: 'Охранно-пожарная безопасность', image: "/files/client/images/smart/obp.jpg",link: "/smart/smart-ohrana",},
          {name: 'Организация складских пространств', image: "/files/client/images/smart/osp.jpg",  link: "/smart/cartridge-selection",},
          {name: 'Доставка грузов', image: "/files/client/images/delivery.jpg", link: "/smart/cartridge-selection",},
          {name: 'Оснащение сегмента HoReCa',image: "/files/client/images/smart/horeca.jpg",link: "/smart/cartridge-selection",},
        ]
      }
    return [test1, test2]
    }

  }
}
</script>

<style scoped>
 .main_page_content{
   display: grid;
   grid-column-gap: 20px;

 }
  .content_block{
    grid-column-gap: 0px;
  }
  .top_content{
    display: grid;
   /* grid-template-columns: 2fr 1fr;*/
    grid-template-columns: 1fr;
   /* grid-column-gap: 20px;*/
    grid-auto-rows: minmax(min-content, max-content);
  }
.promotions_block{
  grid-column-start: 1;
  grid-column-end: 4;
}

</style>