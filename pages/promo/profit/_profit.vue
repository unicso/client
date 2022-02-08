<template>
 <div class="promo_pages_block">
    <h1>{{title}}</h1>

    <promotions-items :items="items" :type="type"/>
 </div>

</template>

<script>
//   <eco-page v-if="$route.params.profit == 'eco' "/>
//  <new-page  v-else-if="$route.params.profit == 'new' "/>
// <discount-page v-else-if="$route.params.profit == 'discount' "/>
// <sales-page  v-else-if="$route.params.profit == 'sales' "/>


import EcoPage from "../../../components/promo/PromoPages/EcoPage";
import NewPage from "../../../components/promo/PromoPages/NewPage";
import DiscountPage from "../../../components/promo/PromoPages/DiscountPage";
import SalesPage from "../../../components/promo/PromoPages/SalesPage";
import PromotionsItems from "../../../components/catalog/PromotionsItems";
export default {
  name: "profit",
  components: {PromotionsItems, SalesPage, DiscountPage, NewPage, EcoPage},
  data(){
    return{
        title:'',
        items:false,
        type:'list'


    }
  },
  computed:{
  },

  watch:{
  },

  mounted() {
    switch (this.$route.params.profit){
      case 'sales': {
        this.title = "Товары с максимальной выгодой"
        this.type = 'timer'
        break;
      }
      case 'eco': {
        this.title = "Экоофис"
        this.type = 'list'
        break;
      }

      case 'new': {
        this.title = "Новинки"
        this.type = 'list'
        break;
      }
      case 'discount': {
        this.title = "Дисконт-магазин"
        this.type = 'list'
        break;
      }
      case 'actuals': {
        this.title = "Актуальные предложения"
        this.type = 'list'
        break;
      }
    }

    this.load()
  },

  methods:{
    async load(){
      const result = await this.$store.dispatch('api/get', {endpoint:'shop/promotions/left_banners?promo='+ this.$route.params.profit})

    if(result.error == false)
      this.items = result.body
    }

  }

}
</script>

<style>
.promo_pages_block{
  width: 900px;
  margin: 0 auto;
}
.promo_pages_block>section>h1 {
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 1px 1px white,
  2px 2px #777;
  color: #333;
  transition: all 1s;
}
.promo_pages_block>section>h1:hover {
  text-shadow: 1px 1px white,
  2px 2px tomato;
  color: var(--base-color);
}
</style>