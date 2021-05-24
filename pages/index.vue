<template>
<div class="main_page">

<product-category class="product_category_component"   v-if="2==3"/>
<main-page-content/>

</div>
</template>

<script>

import MainPageContent from "../components/main/MainPageContent";
import ProductCategory from "../components/main/ProductCategory";
export default {
components:{
  ProductCategory,
   MainPageContent
}

}
</script>

<style>
.content{


}
.product_category_component{

}
.product_category_component:hover{

}
</style>
