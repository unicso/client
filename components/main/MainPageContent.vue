<template>
<div class="main_page_content">
  <div class="empty_block"></div>
  <div class="top_content">
    <slider class="content_block"/>
    <main-page-promotions class="content_block"/>
    <main-block-first/>
    <main-block-second/>

  </div>
</div>
</template>

<script>
import Slider from "./MainPageContent/Slider";
import MainPagePromotions from "./MainPageContent/MainPagePromotions";
import MainBlockFirst from "./MainPageContent/MainBlockFirst";
import MainBlockSecond from "./MainPageContent/MainBlockSecond";
export default {
  components:{
    MainBlockSecond,
    Slider, MainPagePromotions, MainBlockFirst
  },
  name: "MainPageContent"
}
</script>

<style scoped>
 .main_page_content{
   display: grid;
   grid-template-columns: minmax(250px, 1fr) minmax(500px, 4fr);
   grid-column-gap: 20px;

 }

  .top_content{
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-column-gap: 20px;
    grid-auto-rows: minmax(min-content, max-content);
  }


</style>