
<template>
  <div>
  <product-category v-if="2==3"/>
    <div class="not__found" v-if="not_found">{{not_found}}</div>
  <div class="catalog_all" v-if="catalog_items!=false">
    <div class="empty_block"></div>
    <div class="catalog on_top">
      <div class="not__found" v-if="not_found">{{not_found}}</div>

      <breadcrumb-component  :cef_name="page"/>
      <div class="view_box">
        <div class="sort_by">
          <select>
            <option selected>По популярности</option>
            <option>По возрастанию цены</option>
            <option>По убыванию цены</option>


          </select>
        </div>

        <div class="view__method">Вид:
          <div class="icons" @click="selectViewType('list')" :class="[$store.state.config.view_type_catalog=='list'?'view_list':'view_list_black']"></div>
          <div class="icons" @click="selectViewType('tile')" :class="[$store.state.config.view_type_catalog=='tile'?'view_tile':'view_tile_black']"></div>
        </div>
      </div>


      <div class="catalog_items_tile_view" v-if="$store.state.config.view_type_catalog=='tile'">
        <article  class=" content_block" v-for="item in catalog_items">

          <div class="item_image" @click="$router.push('/catalog/'+page+'/'+item.code)">

            <img v-if="typeof item.image != 'undefined' &&  item.image" :src="item.image+'/tmb'" >
            <i v-else v-html="$store.state.icons.empty_image"></i>
          </div>

          <nuxt-link class="" :to="'/catalog/'+page+'/'+item.code">
            <div class="item_description">
              <div class="article">Код товара: {{item.code}}</div>
              <h3>{{item.name}}</h3>

            </div>
          </nuxt-link>
          <div class="item_price">
            <div class="unit">{{item.price_view}}</div>
            <div class="price">{{priceSet(item.price)}}</div>


            <button v-if="itemInBasket(item)" class="btn-std base_shadow_hover add_to_cart"   @click="viewItem(item)"  style="font-size: inherit">Изменить</button>
            <button v-else class="btn-std base_shadow_hover add_to_cart"  @click="addItemToBasket(item)"  style="font-size: inherit">В корзину</button>
            <br><br>
            <add-to-favorite :code="item.code" :as_icon="true"/>

          </div>

        </article>

      </div>
      <div class="catalog_items_list_view" v-else>
        <article  class=" catalog_items content_block base_shadow_hover" v-for="item in catalog_items">

          <div class="item_image"  @click="$router.push('/catalog/'+page+'/'+item.code)">

            <img v-if="typeof item.image != 'undefined' &&  item.image" :src="item.image+'/tmb'" >
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


            <button v-if="itemInBasket(item)" class="btn-std base_shadow_hover add_to_cart"   @click="viewItem(item)"  style="font-size: inherit">Изменить</button>
            <button v-else class="btn-std base_shadow_hover add_to_cart"  @click="addItemToBasket(item)"  style="font-size: inherit">В корзину</button>
            <br><br>
            <add-to-favorite :code="item.code"/>

          </div>

        </article>

      </div>
    </div>
  </div>
    <loader  :important="true" v-if="not_found==false && !catalog_items"/>
  </div>
</template>

<script>
import ProductCategory from "../../components/main/ProductCategory";
import BreadcrumbComponent from "../../components/catalog/BreadcrumbComponent";
import Loader from "../../components/loader";
import AddToFavorite from "../../components/forms/AddToFavorite";
export default {
  name: "MainCatalog",
  components: {AddToFavorite, Loader, BreadcrumbComponent, ProductCategory},

  data(){
    return{
      catalog_items:false,
      category:'',
      show:false,
      count_items: [],
      count_items2: [],
      not_found:false,
      show_item:false,
      page:'',
      view_method:'list'
    }
  },

  computed:{


  },
  mounted(){
    this.page = this.$route.params.catalog;
    this.load_catalog()

  },
  watch:{
    '$route.query.search'()
    {
      this.load_catalog()
    },
    '$store.state.order.favorite_items'()
    {
      this.load_catalog()
    }
  },
  methods:{
    has(object, key) {
      return object ? hasOwnProperty.call(object, key) : false;
    },
    selectViewType(type)
    {
      this.$store.commit('config/setViewTypeCatalog', type)

    },
    itemInBasket(item){



      if(this.has(this.$store.state.order.basket.items, item.code))
      {
        return true
      }
      else
      {
        return false
      }

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
    addToFavorite()
    {


    },
    async load_catalog(){

      if(this.$route.params.catalog =='search')
       var result = await this.$store.dispatch('api/get', {endpoint:'shop/search', params:{search:this.$route.query.search}})
      else if(this.$route.params.catalog =='profit')
        var result = await this.$store.dispatch('api/get', {endpoint:'shop/promotions/profit'})
      else if(this.$route.params.catalog =='favorits')
      {
        var items = {}
        const data = await this.$store.dispatch('api/post', {endpoint:'shop/favorites', params:{codes:this.$store.state.order.favorite_items}})

        if(data.error==false)
          var result = {error:false, body:{products:data.body.products}}
        else
          var result = {error:true, body:"Список избранных товаров пуст"}

      }
      else if(this.$route.params.catalog=='manufacturer')
      {
        var result = await this.$store.dispatch('api/get', {endpoint:'shop/searchbyparams', params:this.$route.query})
      }

      else {
        var result = await this.$store.dispatch('api/get', {endpoint: 'shop/category/' + this.page})
      }

      console.log(result)

        if (result.error == false && result.body.products != false) {
          this.not_found = false;
          this.catalog_items = result.body.products
          this.category = result.body.products.category


        }

      else

      {
        this.catalog_items = false;
        this.not_found = result.body
      }

    },
    async  addItemToBasket(item)
    {
      item['count'] = 1
      var uri = 'basket/'+item.code + '/' + item.count
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
/**
VIEW LIST START
*/
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
.view__method{
  display: inline-flex;
}
.view__method div{cursor: pointer}

/**
VIEW LIST END
*/

/**
VIEW TILE START
*/
.catalog_items_tile_view{
width: 100%;

}
.catalog_items_tile_view article{
  display: inline-block;
  width: 250px;
  min-width: 250px;
  max-width: 300px;
}
.catalog_items_tile_view .item_image{
  height: 200px;
}
.catalog_items_tile_view .price{
  font-size: 1.4rem;
}
.catalog_items_tile_view .item_description h3{
  height: 40px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.view_box{
  text-align: right;
  padding-right: 40px;
  padding-bottom: 10px;
}
.view__method{
  line-height: 22px;

}
.icons{
  zoom: 0.6;
  margin-left: 10px;
}
.view_tile_black, .view_list_black{  border: 1px solid grey; border-radius: 3px}
.view_tile, .view_list{  border: 1px solid rgb(255,73,0); border-radius: 3px}
.sort_by{
  display: inline-block;
}
.sort_by select{
  border: 1px solid grey;
  background-color: white;
  width: auto;
  height: 1.9rem;
  padding: 2px;

}
</style>