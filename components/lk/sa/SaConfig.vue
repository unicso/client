<template>
<section>
  <h2>Конфигуратор сайта.</h2>
  <div class="configurator content_block"  v-for="(name, component_name) in configurators">
    <h3  @click="toogle(component_name)" class="content_block">{{name}}</h3>
    <div class="component_block content_block" v-if="component!=false && component_name==component">
      <component v-bind:is="component"></component>
    </div>
  </div>

</section>
</template>

<script>
import ConfigCategory from "../config/ConfigCategory";
import ConfigProduct from "../config/ConfigProduct";
import CategoryFilters from "../config/CategoryFilters";
import ConfigBusinessType from "../config/ConfigBusinessType";
export default {
  name: "SaConfig",
  components: {ConfigBusinessType, ConfigCategory, ConfigProduct, CategoryFilters},
  data() {
    return {
      show:false,
      component:false,

      configurators:
          {ConfigCategory: 'Категории сайта',
            ConfigProduct: 'Добавление товаров',
            CategoryFilters:'Список фильтров товаров',
            ConfigBusinessType:'Конфигуратор видов деятельности',

          },






  }
  },
  mounted() {
  },
  methods: {
    toogle(name)
    {

      if(name == this.component)
        this.component = false
      else
        this.component = name

    }

  }


}
</script>

<style scoped>
.configurator{

}
.configurator h3{
  background-color: rgba(201, 197, 197, 0.66);
  margin: 0;
}
.configurator h3:hover{
  cursor: pointer;
  background-color: var(--base-color-o07);
  transition: 0.5s ease-in-out;

}
.configurator .component_block{
  margin-top: 20px;

}
</style>