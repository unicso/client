<template>
<div>
  <product-category/>
  <div class="catalog_item" v-if="show">
    <div class="empty_block"></div>
<article class="  on_top">
       <breadcrumb-component :cef_name="cef_name" :last_cef_link="$route.fullPath" :last_name="name"/>
      <div class="product content_block">

        <div class="product_title">

          <h1>{{name}}</h1>
          <div class="article"> Код товара: {{article}}</div>
          <div class="article" v-if="manufacturer!= 'NoName'"> Производитель: {{manufacturer}}</div>


        </div>
        <div class="images">

          <div class="images_block"  v-if="images!= false">
            <img :src="image"  @click="showImage"/>

              <ul  class="product_images">
                <li v-for="img in images" :key="img" @click="changeImage(img)">
                  <img :src="img" width="25px" height="25px"/>
                </li>
              </ul>

          </div>
          <i v-else v-html="$store.state.icons.empty_image"></i>
        </div>

        <div class="description">
          {{description}}
        </div>
        <div class="item_price">
            <div class="item_price_unit">Цена {{price_unit}}.</div>
            <div class="price">{{priceSet(price)}}</div>

            <div class="price_counter btn-std base_shadow_hover">
              <button @click="--item_count"><i v-html="$store.state.icons.back"></i> </button>
              <input type="number" class="item_count" maxlength="6" min="1" max="1000" v-model="item_count">
              <button @click="++item_count"><i v-html="$store.state.icons.forward"></i> </button>
            </div>
           <br>
            <input type="range" min="0" max="1000" step="10" v-model="item_count">
            <br>
            <h3 class="summ" v-if="item_count>0">{{priceSet(price*item_count)}}</h3>
            <button class="btn-std base_shadow_hover" style="font-size: inherit" @click="addItemToBasket">В корзину</button>

        </div>
      </div>
</article>
  </div>


  <div  :class="[showImageImg?'show-image':'']"  class="image_gallery" v-if="showImageImg" @click="showImage">
    <img :src="image" width="600px" height="600px">
  </div>
</div>
</template>

<script>
import ProductCategory from "../../../components/main/ProductCategory";
import BreadcrumbComponent from "../../../components/catalog/BreadcrumbComponent";
export default {
  name: "catalog_item",
  components: {BreadcrumbComponent, ProductCategory},
  data(){
    return{
      item:{},
      name:'',
      guid:'',
      manufacturer:'',
      images: {},
      image:'',
      description:'',
      price:0,
      price_unit:'',
      article:'',
      item_count:1,
      price_summ:0,
      cef_name:'',

      show:false,
      showImageImg:false
    }
  },
  created() {

  },

  mounted() {


      this.getItem();



  },
  methods:{
    priceSet(data){

      var price       = Number.prototype.toFixed.call(parseFloat(data) || 0, 2),
          price_sep   = price.replace(/(\D)/g, ","),
          price_sep   = price_sep.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
      return price_sep + ' ₽';
    },

    async getItem()
    {
      var item_id = this.$route.params['id'];
      const result = await this.$store.dispatch('api/get', {endpoint:'shop/item/'+item_id})
      if(result.error == false)
      {
        this.show= true
        var item = result.body.products

        this.item = item
        this.guid = item.guid
        this.description = item.description
        this.manufacturer = item.manufacturer
        this.name = item.name
        this.article = item.article
        this.price = item.price
        this.price_unit = item.price_view
        this.cef_name = item.cef_name
        if(typeof item.images !='undefined')
      {
        this.image = item.images[0];
        this.images = item.images;

      }
      else
      {
        this.images = false
      }
      }
    },

    changeImage(image)
    {
      this.image = image

    },
    showImage()
    {
      this.showImageImg = !this.showImageImg;

    },

    async addItemToBasket()
    {
        var uri = 'basket/'+this.guid + '/' + this.item_count
        var result = await this.$store.dispatch('api/post', {endpoint:uri})
        this.$store.state.order.basket_load_item = true;
    }
  }
}
</script>
<style>
.show-image
{
  background-color: rgba(0,0,0,0.7);
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  cursor: pointer;

}
.show-image img{
  position: relative;
  margin-left: auto;
  margin-right: auto;
}
</style>
<style scoped>
.catalog_item{
  display: grid;
  grid-template-columns: minmax(240px, 1fr) minmax(500px, 4fr);
  padding-left: 20px;

}
.container{
  max-width: 600px;

  margin-left: auto;
  margin-right: auto;
}
.images_block > img{
  max-width: 230px;
  max-height: 230px;

}
.images{
  margin-left: auto;

  max-width: 230px;

}
.product{
  display: grid;
  grid-template-columns: minmax(240px, 240px) minmax(350px, 2fr) minmax(150px, 1fr);
  grid-auto-rows: minmax(min-content, max-content);
}
.product *{
  text-align: left;

}
.product_title{
  grid-column-start: 1;
  grid-column-end: 4;

}
.article{
/*  font-size: 0.8rem;*/
}

.product .images,.product .description, .product .prices
{
  padding: 20px 10px 20px 10px;
  border-top: 1px solid rgba(0,0,0,0.2);
  border-bottom: 1px solid rgba(0,0,0,0.2);

}


.product_images{
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
.images_block{
  cursor: pointer;
}
input[type=range], .btn-std, .price_counter{
  width: 150px

}
.image_gallery{
  z-index: 3000;
}
.image_gallery img{
  justify-self: center;
}
</style>