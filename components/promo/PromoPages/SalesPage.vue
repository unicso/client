<template>
<section>
  <h1>{{title}}</h1>
  <promotions-items :items="items" :type="'timer'"/>

</section>
</template>

<script>
import CatalogItemListView from "../../catalog/CatalogItemListView";
import ActionComponentTypeA from "../Sales/ActionComponentTypeA";
import PromotionsItems from "../../catalog/PromotionsItems";
export default {
// <action-component-type-a v-for="item in current_categories.products" :item="item" />
  name: "SalesPage",
  components: {PromotionsItems, ActionComponentTypeA, CatalogItemListView},
  data(){
    return{
      title:"Товары с максимальной выгодой",
      items:false,


    }
  },

  mounted() {
    this.load()
  },

  methods:{

    async load(){

      const result = await this.$store.dispatch('api/get', {endpoint:'shop/promotions/left_banners?promo='+ this.title})
      if(result.error == false)
        this.items = result.body
    }
  }

}
</script>

<style scoped>

</style>