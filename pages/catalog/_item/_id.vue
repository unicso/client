<template>
<div>
  <product-category  v-if="2==3"/>
  <div class="catalog_item" v-if="show">
    <div class="empty_block"></div>
<article class="">
       <breadcrumb-component :cef_name="cef_name" :last_cef_link="$route.fullPath" :last_name="name"/>
      <div class="base_shadow  product content_block">

        <div class="product_title">

          <h1>{{name}}</h1>
          <div class="article"> Код товара: {{code}}</div>
          <div class="article" v-if="manufacturer!= 'NoName'"> Производитель: {{manufacturer}}</div>


        </div>
        <div class="images" style="position: relative">

          <div class="images_block"  v-if="images!= false">

            <div class="main__image" :style="'background-image: url('+ image + ')'"   @click="$modal.show('show_image')">

            </div>
              <ul  class="product_images">
                <li v-for="img in images" :key="img" @click="changeImage(img)"
                    :style="'background-image: url(' + img + ')'">
                </li>
              </ul>

          </div>
          <i v-else v-html="$store.state.icons.empty_image"></i>
        </div>

        <div class="description" >
          <div class="select_description">
            <b @click="showDescription=true" :class="[!showDescription?'disabled':'']">Описание</b>
            <b @click="showDescription=false" :class="[showDescription?'disabled':'']">Характеристики</b>
            <hr>

          </div>
          <table class="table__2" v-if="!showDescription">
            <tbody>
            <tr v-for="(item,index) in properties" >
              <td>{{index}}</td>
              <td>{{item}}</td>
            </tr>
            </tbody>
          </table>
          <div v-if="showDescription">
            {{description}}
          </div>

        </div>


        <div class="item_price">
            <div class="item_price_unit">Цена {{price_unit}}.</div>
            <div class="price">{{priceSet(price)}}</div>

            <div class="price_counter btn-std base_shadow_hover">
              <button @click="[item_count>1?--item_count:1]"><i v-html="$store.state.icons.back"></i> </button>
              <input type="number" class="item_count" maxlength="6" min="1" max="1000" v-model="item_count">
              <button @click="++item_count"><i v-html="$store.state.icons.forward"></i> </button>
            </div>
           <br>
            <input type="range" min="0" max="1000" step="10" v-model="item_count">
            <br>
            <h3 class="summ" v-if="item_count>0">{{'Сумма: ' + priceSet(price*item_count)}}</h3>

          <div class="button__block">
            <button v-if="$store.state.order.basket.items!= undefined && itemInBasket()"

                    class="btn-std base_shadow_hover add_to_cart" style="font-size: inherit" @click="addItemToBasket" disabled>В корзине</button>
            <button v-else class="btn-std base_shadow_hover add_to_cart" style="font-size: inherit" @click="addItemToBasket">В корзину</button>

            <add-to-favorite :code="code" :as_icon="true"/>
          </div>


        </div>
      </div>
</article>
  </div>


  <show-image :modal_name="'show_image'" :images="images" :current_image="image"/>


</div>
</template>

<script>
import ProductCategory from "../../../components/main/ProductCategory";
import BreadcrumbComponent from "../../../components/catalog/BreadcrumbComponent";
import ModalWindow from "../../../components/ModalWindow";
import ShowImage from "../../../components/catalog/ShowImage";
import AddToFavorite from "../../../components/forms/AddToFavorite";
export default {
  name: "catalog_item",
  components: {AddToFavorite, ShowImage, BreadcrumbComponent, ProductCategory},
  data(){
    return{
      item:{},
      show_description:true,
      name:'',
      guid:'',
      manufacturer:'',
      images: {},
      image:'',
      description:'',
      price:0,
      price_unit:'',
      article:'',
      code:'',

      item_count:1,
      price_summ:0,
      cef_name:'',
      properties:{},
      show:false,
      showImageImg:false,
      showDescription:true
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
    itemInBasket(){




        if(typeof this.$store.state.order.basket.items[this.code] != "undefined")
        {
          return true
        }
        else
        {
          return false
        }




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
        this.code = item.code
        this.properties = item.properties
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
        var uri = 'basket/'+this.code + '/' + this.item_count
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

}
.container{
  max-width: 600px;

  margin-left: auto;
  margin-right: auto;
}

.product *{
  text-align: left;

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
.item_price{
  min-width: 160px;
  position: relative;
  padding-bottom: 15px;
}
input[type=range],  .price_counter{
  width: 140px

}

.image_gallery img{
  justify-self: center;
}
.main__image{
  width: 200px;
  height: 200px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.product_images li{
  width: 25px;
  height: 25px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  border: 1px solid rgba(0,0,0,0.2);
}
.select_description .disabled{
  font-weight: normal;
}
.select_description b{
  cursor: pointer;
  margin-right: 10px;
}
.table__2 tbody tr td{
  padding: 4px;
}
.button__block{
  padding-right: 15px;
}
.button__block .btn-std{
  width: 150px;
  margin-bottom: 10px;
}
</style>