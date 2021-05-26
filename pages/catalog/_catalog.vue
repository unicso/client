
<template>
  <div>
  <product-category v-if="2==3"/>
  <div class="catalog_all" v-if="catalog_items!=false">
    <div class="empty_block"></div>
    <div class="catalog on_top">
      <div class="not__found" v-if="not_found">{{not_found}}</div>



      <breadcrumb-component  :cef_name="page"/>


      <article class=" catalog_items content_block base_shadow_hover" v-for="item in catalog_items">

        <div class="item_image" >

          <img v-if="typeof item.image != 'undefined' &&  item.image" :src="item.image" >
          <i v-else v-html="$store.state.icons.empty_image"></i>
        </div>
        <nuxt-link class="" :to="'/catalog/'+page+'/'+item.code">
          <div class="item_description">

            <h3>{{item.name}}</h3>
            <div class="article">Код товара: {{item.code}}</div>


          <div class="truncate-text">{{item.description}}</div>
        </div>
        </nuxt-link>
          <div class="item_price">
          <div class="unit">Цена {{item.price_view}}</div>
          <div class="price">{{priceSet(item.price)}}</div>


          <button v-if="$store.state.order.basket.items[item.guid]" class="btn-std base_shadow_hover add_to_cart"   @click="viewItem(item)"  style="font-size: inherit">Изменить</button>
          <button v-else class="btn-std base_shadow_hover add_to_cart"  @click="addItemToBasket(item)"  style="font-size: inherit">В корзину</button>


        </div>

      </article>


    </div>
  </div>
    <loader v-else :important="true"/>
  </div>
</template>

<script>
import ProductCategory from "../../components/main/ProductCategory";
import BreadcrumbComponent from "../../components/catalog/BreadcrumbComponent";
import Loader from "../../components/loader";
export default {
  name: "MainCatalog",
  components: {Loader, BreadcrumbComponent, ProductCategory},

  data(){
    return{
      catalog_items:false,
      category:'',
      show:false,
      count_items: [],
      count_items2: [],
      not_found:false,
      show_item:false,
      page:''
    }
  },

computed:{
  countItem: {
   get(){

     return this.count_items;
   },
    set(value){

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
    else if(this.$route.params.catalog =='profit')
        var result = await this.$store.dispatch('api/get', {endpoint:'shop/promotions/profit'})
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

      }
      else

      {
        this.catalog_items = [];
        this.not_found = result.body
      }

    },
    async  addItemToBasket(item)
    {
      item['count'] = 1
      var uri = 'basket/'+item.guid + '/' + item.count
      var result = await this.$store.dispatch('api/post', {endpoint:uri})
      this.$store.state.order.basket_load_item = true;

    },

    viewItem(item)
    {

      this.$router.push('/catalog/'+this.page+'/'+item.code)


    }


  }
}
</script>

<style scoped>

.catalog_items{
  display: grid;
  margin-bottom: 15px;

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
  padding: 1rem 0 1rem 0;
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
.item_description h4{
  font-size: 1.1rem;

}
.not__found{
  font-size: 1.3rem;
  text-align: center;
}
 a:link{
  color: #0d0d0d;
}
 a:link:hover{
  color: #0d0d0d;
}

</style>