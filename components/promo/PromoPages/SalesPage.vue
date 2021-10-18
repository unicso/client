<template>
<section>
  <h1>{{title}}</h1>


  <action-component-type-a v-for="item in items" :item="item"/>


</section>
</template>

<script>
import CatalogItemListView from "../../catalog/CatalogItemListView";
import ActionComponentTypeA from "../Sales/ActionComponentTypeA";
export default {

  name: "SalesPage",
  components: {ActionComponentTypeA, CatalogItemListView},
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


      this.items = result.body[this.title]
    }
  }

}
</script>

<style scoped>

</style>