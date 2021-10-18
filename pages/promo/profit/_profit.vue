<template>
 <div class="promo_pages_block">
   <eco-page v-if="$route.params.profit == 'eco' "/>
   <new-page  v-else-if="$route.params.profit == 'new' "/>
   <discount-page v-else-if="$route.params.profit == 'discount' "/>
   <sales-page  v-else-if="$route.params.profit == 'sales' "/>

 </div>

</template>

<script>
import EcoPage from "../../../components/promo/PromoPages/EcoPage";
import NewPage from "../../../components/promo/PromoPages/NewPage";
import DiscountPage from "../../../components/promo/PromoPages/DiscountPage";
import SalesPage from "../../../components/promo/PromoPages/SalesPage";
export default {
  name: "profit",
  components: {SalesPage, DiscountPage, NewPage, EcoPage},
  data(){
    return{
      result:{}
    }
  },


  mounted() {


  },

  methods:{


  }

}
</script>

<style>
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
  color: rgb(255,73,0);
}
</style>