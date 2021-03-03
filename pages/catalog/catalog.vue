<template>
<div class="catalog_all">
  <h1>Каталог</h1>
<div class="catalog">
  <div class="product_card" v-for="(item,index) in catalog" :key="item.name">
    <h4>{{item.name}}</h4>
    <p>{{item.description}}</p>
  </div>
</div>
</div>
</template>

<script>
export default {
  name: "catalog",
  data(){
    return{
      catalog:[]
    }
  },

  mounted(){
    this.load_catalog()
  },

  methods:{
    async load_catalog()
      {
      const result = await this.$store.dispatch('api/get', {endpoint:'catalog/catalog'})
        if(result.error == false)
        {
          this.catalog = result.body
        }

      }
  }
}
</script>

<style scoped>
.catalog{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(217px, 1fr));
  grid-row-gap: 10px;
  grid-column-gap: 20px;
}
.product_card{
  word-wrap: break-word;
  border: 1px solid grey;
  padding: 7px;
}
</style>