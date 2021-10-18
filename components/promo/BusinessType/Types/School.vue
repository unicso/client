<template>
<section>
  <h1>Решения для образовательных учреждений.</h1>

  <div class="elements_block">
    <div v-for="item in elements" class="base_elements">
      <nuxt-link :to="'/catalog/'+item.cef_name" class="std_link"><b>{{item.name}}</b></nuxt-link>

      <ul>
        <li v-for="sub_item in item.child">
          <nuxt-link :to="'/catalog/'+sub_item.cef_name" class="std_link">{{sub_item.name}}</nuxt-link>
        </li>
      </ul>

    </div>


  </div>
  <hr><br>

  <div class="base_elements_2">
    <div class="image image_1  content_block" >
      <promo-component file="/files/client/promo/providers/Акустические решения toFORM.pdf" as_link="true" title="Банковское оборудование освещение и прочее оборудование"/>

    </div>
    <div class="image image_2  content_block" >
      <promo-component file="/files/client/promo/providers/Акустические решения toFORM.pdf" as_link="true" title="Банковское оборудование освещение и прочее оборудование"/>

    </div>

  </div>


</section>
</template>

<script>

import PromoComponent from "../../providers/PromoComponent";
export default {
  name: "School",
  components: {PromoComponent},
  data(){
    return{
      items:{
        "Письменные принадлежности":{
          link:'', child:false
        },
        "Товары для школы":{
          link:'', child:false
        },
        "Гигиенические товары":{
          link:'', child:false
        },

      }

    }
  },
  computed:{
    elements()
    {
      var Array = [];
      for (let val in this.$store.state.shop.category){
        for (let val2 in this.$store.state.shop.category[val].child){
          let category2 = this.$store.state.shop.category[val].child[val2]
          if(typeof this.items[category2.name]!= "undefined")
          {
            Array.push(category2)
          }

        }

      }

      return Array
    }

  },
  methods:{


  }



}
</script>

<style scoped>
h1{
  font-size: 2rem;
}
  .elements_block{
    column-count: 2;
  }
  .base_elements{
    margin-bottom: 10px;
    width: 100%;
    float: left;
    page-break-inside: avoid;
    break-inside: avoid;

  }
  .base_elements_2{
    columns: 2;
  }
  ul{
  /*  list-style: circle;*/

    padding-left: 30px;
    padding-top: 10px;
    margin-bottom: 20px;

  }
  .image{
    width: 300px;
    height: 200px;

    background-position: center;
    background-size: 100%;
    transition: 0.5s ease-in;

  }
  .image_1{
    background-image: url("/files/client/images/business_type/medecine.jpg");
  }
  .image_2{
  background-image: url("/files/client/images/business_type/autosaloon.jpg");
  }
  .image:hover{
    background-size: 110%;
    transition: 0.5s ease-in;
  }

  .content_block{
    padding: 0px;
  }
hr {
  margin-top: 0px;
  margin-bottom: 15px;
  border: 0;
  height: 1px;
  background: #000;
  background-image: -webkit-linear-gradient(left, #fff, #000, #fff);
  background-image: -moz-linear-gradient(left, #fff, #000, #fff);
  background-image: -ms-linear-gradient(left, #fff, #000, #fff);
  background-image: -o-linear-gradient(left, #fff, #000, #fff);
}
</style>