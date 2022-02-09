<template>
<section>
  <h1>{{type}}</h1>
  <div v-for="(block, index) in items" class="elements">

  <div class="elements_block" v-if="index=='products'">
    <div v-for="(item, name) in products" class="base_elements">
      <nuxt-link :to="'/catalog/'+item.cef_name" class="std_link"><b></b></nuxt-link>

        <ul>
          <li v-for="(child2, name2) in item.child" ><nuxt-link :to="'/catalog/'+child2.cef_name" class="std_link"><b>{{name2}}</b></nuxt-link>
            <ul>
              <li v-for="(child3, name3) in child2.child">
                <nuxt-link :to="'/catalog/'+child3.cef_name" class="std_link">{{name3}}</nuxt-link>
              </li>
            </ul>
          </li>
        </ul>
    </div>
  </div>

  <div class="base_elements_2"  v-if="index=='pdf'">
    <div class="image image_1  content_block" v-for="item in pdf" :style="backgroundImage(item.image)">
      <promo-component :file="item.filename" as_link="true" :title="item.file_title"/>

    </div>
  </div>

  <div class="base_elements_3 video"  v-if="index=='video'" v-for="item in video">
    <video  :src="item.filename" poster="" controls  class="base_shadow"/>
    <div class="video_text">{{item.file_title}}</div>

  </div>

    <br><hr v-if="block!=false"><br>
  </div>
</section>
</template>

<script>

import PromoComponent from "../../providers/PromoComponent";
export default {
  name: "Type1",
  components: {PromoComponent},
  props:[
    'type'
  ],
  data(){
    return{
      products:false,
      pdf:false,
      video:false,
      items:false

    }
  },

  computed:{


  },
  mounted() {
    this.loadData()
  },
  methods:{
    backgroundImage(image){
      return 'background-image: url("'+ image + '")'
    },
    async loadData(){
      const result = await  this.$store.dispatch('api/get', {endpoint:'/shop/promotions/businesstype?type=' + this.type})

      this.items = result.body
      this.products = result.body.products
      this.video = result.body.video
      this.pdf = result.body.pdf

    },


  }



}
</script>

<style scoped>
h1{
  font-size: 2rem;
}
.elements{

}
  .elements_block{
    column-count: 2;
  }
  .base_elements, .base_elements_2, .base_elements_2{
    margin-bottom: 20px;
  }
  .base_elements{
    margin-bottom: 10px;
    width: 100%;
    float: left;
    page-break-inside: avoid;
    break-inside: avoid;

  }
  .base_elements_2{
  /*  columns: 2;*/
    display: inline-flex;
    justify-content: space-around;
    width: 100%;
    flex-wrap: wrap;
  }
  .base_elements_3{
    width: 100%;
    position: relative;
  }
.base_elements_3 video{
  width: 100%;
  cursor: pointer;


}
.base_elements_3 .video_text{
  font-size: 3rem;
  font-weight: bold;
  position: absolute;
  mix-blend-mode: hard-light;
  color: var(--base-color);
  text-shadow: 1px 1px 2px black, 0 0 2em black;
  top: 30px;
  left: 15px;
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
    background-size: 130%;
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
hr{
  width: 100%;
}
</style>