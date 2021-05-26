<template>
<div class="main_page_content">
  <div class="empty_block"></div>
  <div class="top_content">
    <slider class="content_block"/>
    <main-page-promotions v-if="2==2" class="content_block"/>
    <promotions-block class="promotions_block"/>

    
  </div>
</div>
</template>

<script>
import Slider from "./MainPageContent/Slider";
import MainPagePromotions from "./MainPageContent/MainPagePromotions";
import MainBlockSecond from "./MainPageContent/MainBlockSecond";
import ProfitBlock from "./MainPageContent/ProfitBlock";
import PromotionsBlock from "./MainPageContent/PromotionsBlock";

export default {
  components:{
    PromotionsBlock,
    ProfitBlock,
    MainBlockSecond,
    Slider, MainPagePromotions
  },
  name: "MainPageContent"
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