<template>


  <div class="catalog_all">
    <div class="empty_block"></div>
      <div class="catalog">

        <h1>{{ category }}</h1>
        <article class="catalog_items  content_block" v-for="item in catalog_items">
          <div class="item_image">
            <img v-if="typeof item.images.main != 'undefined'" :src="item.images.main">
            <i v-else v-html="$store.state.icons.empty_image"></i>
          </div>
          <div class="item_description">
            <h4>{{item.name}}</h4>
            <p class="truncate-text">{{item.description}}</p>
          </div>
          <div class="item_price">
            <h2>{{priceSet(item.price)}}</h2>

            <input type="number" class="item_count" maxlength="6" min="0" max="1000" v-model="count_items[item.guid]">
            <br>
            <input type="range" min="0" max="1000" step="10" v-model="count_items[item.guid]">
            <br>
            <h3 class="summ" v-if="count_items[item.guid]>0">{{priceSet(itemSumm(count_items[item.guid],item.price))}}</h3>
            <button class="btn-std base_shadow_hover" @click="addToBasket(item, count_items[item.guid])">В корзину</button>
          </div>
      </article>


      </div>
  </div>
</template>

<script>
export default {
  name: "MainCatalog",
  data(){
    return{
      catalog_items:[],
      category:'',
      show:false,
      count_items:[]
    }
  },

  mounted(){


    this.page = this.$route.params.catalog;

    this.load_catalog()



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
    itemSumm(count, price){

      return count*price
    },
    async load_catalog(){
      const result = await this.$store.dispatch('api/get', {endpoint:'shop/category/'+this.page})
      if(result.error == false)
      {

        this.catalog_items = result.body.catalog
        this.category = result.body.category
        console.log(result.body)
      }

    },

    addToBasket(item, count){
      var add = {
        item: item,
        count: count

      }
      this.$store.commit('shop/addItemToBasket', add)

    }

  }
}
</script>

<style scoped>
.catalog_all{
  display: grid;
  grid-template-columns: minmax(250px, 1fr) minmax(500px, 4fr);
  grid-column-gap: 20px;

}
article{
  display: grid;
  grid-template-columns: minmax(200px, 270px) minmax(400px, 2fr) minmax(200px, 250px);
  margin-bottom: 15px;

}

.item_image{
  width: 260px;
  max-width: 260px;
  max-height: 260px;
}
.item_image img{

  width: 100%;
  height: 100%;
  object-fit: contain;

}
.item_description{
  padding: 0 10px 0 10px;
}
.item_description h4{
  text-align: center;
}
.item_price{
  text-align: center;

}
.item_count{
  width: 100px;
}
/**

 */
.truncate-text {
  padding: 1rem;
  width: 100%;
  height: 80px;
  overflow: hidden;
  position: relative;
}

.truncate-text:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 40px;
  background: linear-gradient(180deg, transparent, #ffffff 50%);
}
article >div{
  padding: 0 10px 0 10px;
}
.item_count{
  width: 150px;
}
.summ{

}
</style>