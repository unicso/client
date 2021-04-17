<template>
  <ul class="breadcrumbs">
    <li><nuxt-link to="/">Главная|Каталог </nuxt-link></li>
    <li v-for="bread in breadcrumbs" :key="bread.name">
      <nuxt-link :to="bread.link">{{bread.name}}</nuxt-link>
    </li>
    <li v-if="last_cef_link">
      <nuxt-link :to="last_cef_link">{{last_name}}</nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
name: "BreadcrumbComponent",
  props:[
      'cef_name',
    'last_cef_name',
    'last_cef_link',
    'last_name',
  ],

  data(){
  return{
    breadcrumbs:{}
  }
  },
  watch:{
    cef_name(newVal, oldVal)
    {

      this.loadBreadcrumbs()

    }

  },
  mounted() {
    this.loadBreadcrumbs()
  },
  methods:{
  async loadBreadcrumbs()
  {
      const result = await this.$store.dispatch('api/get',
          {endpoint:'shop/breadcrumbs/'+this.cef_name}
      )
      this.breadcrumbs = result.body

  }

  }
}
</script>

<style scoped>
.breadcrumbs li a{

}
.breadcrumbs{
  display: inline-flex;
  margin-bottom: 9px;
  flex-wrap: wrap;
}
.breadcrumbs li a:hover{
  color: rgb(255,73,0);
}
.breadcrumbs li:not(:first-child):before{
  content: "» ";
}

</style>