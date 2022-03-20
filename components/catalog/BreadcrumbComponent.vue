<template>
  <ul class="breadcrumbs" v-if="breadcrumbs!=false">
    <li class="hide__on__mobile">
      <nuxt-link to="/">Главная|Каталог /&nbsp;</nuxt-link>
    </li>

    <li v-for="bread in breadcrumbs" :key="bread.name" v-if="typeof bread.link == 'string'">
      <nuxt-link :to="bread.link">{{bread.name}}<i v-if="bread.name">/ </i></nuxt-link>
    </li>
    <li  class="hide__on__mobile" v-if="last_cef_link && $device.isDesktop">
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
    breadcrumbs:false,

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
      let result = await this.$store.dispatch('api/get',
          {endpoint:'shop/breadcrumbs/'+this.cef_name}
      )
      this.breadcrumbs = result.body

      if(result.error==false)
      {
        let b = result.body
      }

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
  color: var(--base-color);
}
.breadcrumbs li:not(:first-child):before{
 /* content: "» ";*/
}
.breadcrumbs li i {
  padding-left: 3px;
  padding-right: 3px;
  font-style: normal;
  color:black;
}
.breadcrumbs li:last-child i{
  display: none;
}
</style>