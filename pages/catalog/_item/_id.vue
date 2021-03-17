<template>
<div>
  <product-category/>
  <div class="catalog_item" v-if="show">
    <div class="empty_block"></div>

      <div class="product  content_block">
        <h1>{{name}}
          <div class="article"> Артикул: {{article}}</div>
        </h1>
        <div class="images">
          <img :src="images" v-if="images!= false"/>
          <i v-else v-html="$store.state.icons.empty_image"></i>
        </div>

        <div class="description">
          {{description}}
        </div>
        <div class="prices">
            <h3>Цена за шт.</h3>
            <h2>{{priceSet(price)}}</h2>

            <div class="price_counter btn-std base_shadow_hover">
              <button @click="--item_count"><i v-html="$store.state.icons.back"></i> </button>
              <input type="number" class="item_count" maxlength="6" min="1" max="1000" v-model="item_count">
              <button @click="++item_count"><i v-html="$store.state.icons.forward"></i> </button>
            </div>
           <br>
            <input type="range" min="0" max="1000" step="10" v-model="item_count">
            <br>
            <h3 class="summ" v-if="item_count>0">{{priceSet(price*item_count)}}</h3>
            <button class="btn-std base_shadow_hover">В корзину</button>

        </div>
      </div>

  </div>
</div>
</template>

<script>
import ProductCategory from "../../../components/main/ProductCategory";
export default {
  name: "catalog_item",
  components: {ProductCategory},
  data(){
    return{
      item:{},
      name:'',
      images:'',
      description:'',
      price:0,
      article:'',
      item_count:1,
      price_summ:0,
      show:false
    }
  },
  created() {

  },

  mounted() {


      this.getItem();



  },
  methods:{
    priceSet(data){
      /*
       * В переменной price приводим получаемую переменную в нужный вид:
       * 1. принудительно приводим тип в число с плавающей точкой,
       *    учли результат 'NAN' то по умолчанию 0
       * 2. фиксируем, что после точки только в сотых долях
       */
      var price       = Number.prototype.toFixed.call(parseFloat(data) || 0, 2),
          //заменяем точку на запятую
          price_sep   = price.replace(/(\D)/g, ","),
          //добавляем пробел как разделитель в целых
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
        var item = result.body.item
        console.log(item)
      this.item = item
      this.description = item.description
      this.name = item.name
        this.article = item.article
      this.price = item.price
      if(typeof item.images.main !='undefined')
      {

        this.images = item.images.main;
      }
      else
      {
        this.images = false
      }
      }
    }
  }
}
</script>

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
img{
  max-width: 230px;
  max-height: 230px;

}
.images{
  margin-left: auto;
  margin-right: auto;
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
h1{
  grid-column-start: 1;
  grid-column-end: 4;

}
.article{
  font-size: 0.7rem;
}
.prices{

  padding-left: 20px;
  background-color: rgba(248,248,248,1);
}
.product .images,.product .description, .product .prices
{
  padding: 20px 10px 20px 10px;
  border-top: 1px solid rgba(0,0,0,0.2);
  border-bottom: 1px solid rgba(0,0,0,0.2);

}
.prices{
  border-left: 1px solid rgba(0,0,0,0.2);
  border-right: 1px solid rgba(0,0,0,0.2);

}


</style>