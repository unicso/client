
<template>
  <div>
  <product-category/>
  <div class="catalog_all">
    <div class="empty_block"></div>
    <div class="catalog on_top">
      <h1 v-if="not_found">{{not_found}}</h1>
      <h1>{{ category }}</h1>
      <article class="catalog_items  content_block base_shadow_hover" v-for="item in catalog_items">
        <div class="item_image" @click="viewItem(item)">

          <img v-if="typeof item.image != 'undefined' &&  item.image" :src="item.image" >
          <i v-else v-html="$store.state.icons.empty_image"></i>
        </div>
        <div class="item_description" @click="viewItem(item)">

            <h4>{{item.name}}</h4>
            <div class="article">Код товара: {{item.article}}</div>


          <div class="truncate-text">{{item.description}}</div>
        </div>
        <div class="item_price">
          <div class="">Цена {{item.price_view}}</div>
          <div class="price">{{priceSet(item.price)}}</div>


          <button class="btn-std base_shadow_hover"  @click="addItemToBasket(item)"  style="font-size: inherit">В корзину</button>
        </div>
      </article>


    </div>
  </div>
  </div>
</template>

<script>
import ProductCategory from "../../components/main/ProductCategory";
export default {
  name: "MainCatalog",
  components: {ProductCategory},

  data(){
    return{
      catalog_items:[],
      category:'',
      show:false,
      count_items: [],
      count_items2: [],
      not_found:false,
      show_item:false
    }
  },
computed:{
  countItem: {
   get(){
     console.log(222);
     return this.count_items;
   },
    set(value){
      console.log(value);
      return this.count_items;
    }
  }

},
  mounted(){
    this.page = this.$route.params.catalog;
    this.load_catalog()
    console.log(this.$store.state.shop.category)
  },
  watch:{
    '$route.query.search'()
    {
      this.load_catalog()
    }
  },
  methods:{
    itemIncrement(guid)
    {
      ++this.count_items[guid]
      this.getCountItem(guid)
    },
    priceSet(data){
      var price       = Number.prototype.toFixed.call(parseFloat(data) || 0, 2),
          price_sep   = price.replace(/(\D)/g, ","),
          price_sep   = price_sep.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
      return price_sep + ' ₽';
    },
    itemSumm(count, price){

      return count*price
    },
    async load_catalog(){
      if(this.$route.params.catalog =='search')
       var result = await this.$store.dispatch('api/get', {endpoint:'shop/search', params:{search:this.$route.query.search}})
    else
        var result = await this.$store.dispatch('api/get', {endpoint:'shop/category/'+this.page})

      if(result.error == false && result.body.products != false)
      {
        this.not_found = false;
        this.catalog_items = result.body.products
        this.category = result.body.products.category
        for(var key in this.catalog_items){
          var guid = this.catalog_items[key]['guid']
          this.count_items[guid] = 1
        }
        console.log(result.body)
      }
      else

      {
        this.catalog_items = [];
        this.not_found = 'Извините, ничего не найдено.'
      }

    },
    addItemToBasket(item)
    {
      var item ={
        guid: item.guid,
        name: item.name,
        code: item.article,
        price: item.price,
        count: 1,
        summ: item.price*this.item_count,
        image: item.image
      }

      this.$store.dispatch('order/addItemToBasket', item)

    },
    addToBasket(item, count){
      var add = {
        item: item,
        count: count
      }


      this.$store.commit('shop/addItemToBasket', add)

    },
    viewItem(item)
    {

      this.$router.push('/catalog/'+this.page+'/'+item.guid)


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
  cursor: pointer;
}
.item_image img{

  width: 100%;
  height: 100%;
  object-fit: contain;

}

.item_description:hover{
  cursor: pointer;

}
.item_description h4{
  text-align: center;
}
.item_price{


}
.item_count{
  width: 100px;
}
/**

 */
.truncate-text {
  padding: 1rem 1rem 1rem 0;
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

.item_count{
  width: 150px;
}
.article{
  text-align: left;

  /*font-size: 0.7rem;*/
}
</style>