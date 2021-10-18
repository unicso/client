<template>
<section>
  <h1>{{title}}</h1>


  <catalog-item-list-view v-for="item in items" :item="item"/>


</section>
</template>

<script>
import CatalogItemListView from "../../catalog/CatalogItemListView";
export default {

  name: "NewPage",
  components: {CatalogItemListView},
  data(){
    return{
      title:"Новинки ассортимента",
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