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
      <li><items-slider2 :items="buisiness_type" :name="'Предложения по сферам деятельности'" :rows="'2'"/></li>
      <li><items-slider2 :items="slider2_items" :name="'SMART Сервисы'" :transition_delay="'0.1'"/></li>
      <li><items-slider2 :items="slider2_items" :name="'SMART Сервисы'" :transition_delay="'0.2'"/></li>
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
      slider2_items:[],
      buisiness_type:[]
    }
  },

  mounted() {
    this.FETCH_DATA_ITEMS2()
  },
  methods:{

    FETCH_DATA_ITEMS2(){
      this.buisiness_type =[
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
      ]

      this.slider2_items = [
        {name:'Подбор картриджей',image:"/files/client/images/thumbnail_image/cartridge2.jpg", link:"/smart/cartridge-selection", },
        {name:'Установка СКУД',image:"/files/client/images/skud.jpg", link:"/smart/cartridge-selection", },
        {name:'Охранно-пожарной сигнализации',image:"/files/client/images/ops.jpg", link:"/smart/cartridge-selection", },
        {name:'Организация складских пространств',image:"/files/client/images/sklad.jpg", link:"/smart/cartridge-selection", },
        {name:'Доставка грузов',image:"/files/client/images/delivery.jpg", link:"/smart/cartridge-selection", },
        {name:'Оснащение сегмента HoReCa',image:"/files/client/images/business_type/horeka.jpg", link:"/smart/cartridge-selection", },

      ]

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