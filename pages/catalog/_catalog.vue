
<template>
  <div>
    <h2 v-if="$route.path=='/catalog/favorits'" style="text-align: center">Избранные товары</h2>
  <product-category v-if="2==3"/>
    <div class="not__found" v-if="not_found">{{not_found}}</div>
  <div class="catalog_all" v-if="catalog_items!=false">
    <div class="empty_block"></div>
    <div class="catalog ">
      <div class="not__found" v-if="not_found">{{not_found}}</div>

      <breadcrumb-component  :cef_name="page"/>
      <div class="view_box" v-if="2==3">
        <div class="sort_by" v-if="show_orderby">
          <select v-model="orderby">
            <option selected value="name asc">По наименованию А-Я</option>
            <option  value="name desc">По наименованию Я-А</option>
            <option value="price desc">По убыванию цены</option>
            <option value="price asc">По возрастанию цены</option>


          </select>
        </div>

        <div class="view__method" v-if="!$device.isMobile && show_orderby">Вид:
          <div class="icons" @click="selectViewType('list')" :class="[$store.state.config.view_type_catalog=='list'?'view_list':'view_list_black']"></div>
          <div class="icons" @click="selectViewType('tile')" :class="[$store.state.config.view_type_catalog=='tile'?'view_tile':'view_tile_black']"></div>
        </div>
      </div>
      <h4  v-if="$route.query.search && not_found==false" >Результаты поиска по ключевым словам: {{$route.query.search}}</h4>
      <div class="catalog_items_tile_view" v-if="($store.state.config.view_type_catalog=='tile' && !$device.isMobile) || $route.path=='/catalog/favorits'">

        <article  class="content_block on_top_2" v-for="(item, index, count) in catalog_items">
          <div class="item_image"  v-if="typeof item.image != 'undefined' &&  item.image"  @click="$router.push('/catalog/'+page+'/'+item.code)"
          :style="'background-image: url('+ item.image + '/tmb)'">
          </div>
          <div v-else class="item_image"    @click="$router.push('/catalog/'+page+'/'+item.code)">
            <div v-html="$store.state.icons.empty_image"></div>
          </div>
            <div class="item_description"   @click="$router.push('/catalog/'+page+'/'+item.code)">
              <div class="article">Код товара: {{item.code}}</div>
              <h3>{{item.name}}</h3>

            </div>
          <div class="item_price">
            <div class="unit"  v-if="$store.state.user.current_price_type!=false">{{item.price_view}}</div>
            <div class="price"  v-if="$store.state.user.current_price_type!=false">{{priceSet(item.price)}}</div>



              <button v-if="itemInBasket(item) && $store.state.user.current_price_type!=false" class="btn-std base_shadow_hover add_to_cart"   @click="$router.push('/order/basket')"  style="font-size: inherit">Изменить</button>
              <button v-else-if="!itemInBasket(item) && $store.state.user.current_price_type!=false" class="btn-std base_shadow_hover add_to_cart"  @click="addItemToBasket(item)"  style="font-size: inherit">В корзину</button>


            <add-to-favorite :code="item.code" :as_icon="true"/>

          </div>

        </article>

      </div>
      <div class="catalog_items_list_view" v-else>

        <div class="pagination" v-if="pagination.pages>1">
          <ul>
            <li class="content_block"  v-for="index in pagination.pages" @click="pagination_page=index;  scrollToTop();" :class="[index==pagination_page?'active':'']"> {{index}} </li>
          </ul>

        </div>

        <article v-if="2==3" class=" catalog_items content_block base_shadow_hover on_top_2" v-for="(item, index, count) in catalog_items" >

          <div class="item_image"  v-if="typeof item.image != 'undefined' &&  item.image"  @click="$router.push('/catalog/'+page+'/'+item.code)"
               :style="'background-image: url('+ item.image + '/tmb)'">
          </div>
          <div v-else class="item_image"    @click="$router.push('/catalog/'+page+'/'+item.code)">
            <div v-html="$store.state.icons.empty_image"></div>
          </div>

            <div class="item_description"   @click="$router.push('/catalog/'+page+'/'+item.code)">

              <h3>{{item.name}}</h3>
              <div class="article">Код товара: {{item.code}}</div>


              <div class="truncate-text">{{item.description}}</div>
            </div>

          <div class="item_price">


            <div class="unit">Цена {{item.price_view}}</div>
            <div class="price">{{priceSet(item.price)}}</div>


            <button v-if="itemInBasket(item)" class="btn-std base_shadow_hover add_to_cart"   @click="viewItem(item)"  style="font-size: inherit" disabled>В корзине</button>
            <button v-else class="btn-std base_shadow_hover add_to_cart"  @click="addItemToBasket(item)"  style="font-size: inherit">В корзину</button>
            <br><br>
            <add-to-favorite :code="item.code"/>

          </div>

        </article>
        <catalog-item-list-view v-for="(item, index, count) in catalog_items" :item="item"  v-if="catalog_items!=false && count>=pagination.start  && count<pagination.end">

        </catalog-item-list-view>
      </div>
    <div class="pagination" v-if="pagination.pages>1">
      <ul>
        <li class="content_block"  v-for="index in pagination.pages" @click="pagination_page=index;  scrollToTop();" :class="[index==pagination_page?'active':'']"> {{index}} </li>
      </ul>

    </div>


    </div>
  </div>

  <div class="" v-if="subcategory != false">

    <h1>{{subcategory.name}}</h1>
    <ul class="subcategory" v-if="subcategory.depth==2">
      <li class="subcategory_item" v-for="item in subcategory.categories">
      <nuxt-link :to="'/catalog/'+item.cef_name">
        <div class="subcategory_item_image" :style="'background-image: url(' + item.product + ')'"></div>
        <div class="subcategory_item_name">{{ item.name }}</div>
      </nuxt-link>
      </li>
    </ul>


    <ul class="subcategory"  v-if="subcategory.depth==1">
      <li class="subcategory_item" v-for="item in subcategory.categories">
        <nuxt-link :to="'/catalog/'+item.cef_name">
          <div class="subcategory_item_image" :style="'background-image: url(' + item.product + ')'"></div>
          <div class="subcategory_item_name">{{ item.name }}</div>
        </nuxt-link>
      </li>
    </ul>
  </div>
    <loader  :important="true" v-if="not_found==false && !catalog_items && subcategory == false" />
  </div>


</template>

<script>
import ProductCategory from "../../components/main/ProductCategory";
import BreadcrumbComponent from "../../components/catalog/BreadcrumbComponent";
import Loader from "../../components/loader";
import AddToFavorite from "../../components/forms/AddToFavorite";
import CatalogItemListView from "../../components/catalog/CatalogItemListView";
export default {
  name: "MainCatalog",
  components: {CatalogItemListView, AddToFavorite, Loader, BreadcrumbComponent, ProductCategory},

  data(){
    return{
      catalog_items:false,

      orderby:'name asc',
      pagination_page:1,
      catalog_items_count:0,
      pagination_pages:3,
      pagination_show_items:10,

      catalog_all_items:false,
      category:'',
      show:false,
      count_items: [],
      count_items2: [],
      not_found:false,
      show_item:false,
      page:'',
      view_method:'list',
      show_orderby:false,
      subcategory:false
    }
  },
  async fetch() {
    this.$router.push({path:this.$route.fullPath, query:{'page':1}})

  },
  beforeRouteLeave(to, from, next){
    this.$store.state.shop.show_filters = false
      next()

  },
  computed:{

    pagination(){
        let offset = this.pagination_page * this.pagination_show_items
      let start = offset-this.pagination_show_items
      let end = offset
      let pages = Math.ceil(this.catalog_items_count/this.pagination_show_items)

      let data = {start:start, end:end, pages:pages}

      return  data
    },

  },
  mounted(){
    //if(!this.$route.query.page)

    this.page = this.$route.params.catalog;

    if(this.$route.params.catalog == 'bumaga-dlya-printerov-i-kopirov')
      this.orderby = 'price asc'

   // this.load_catalog()


  },

  beforeDestroy() {
    this.$store.state.shop.current_category = false
    this.$router.push({path:this.$route.fullPath, query:{}})
  },

  watch:{
    '$store.state.user.current_price_type'(){
    //     this.load_catalog()
    },
    '$route.query.search'(){
      this.load_catalog()
    },
    orderby(newVal) {
      this.load_catalog()
    },
    page(newVal) {
      this.$store.state.shop.data_filter = {};
      this.$store.state.shop.data_filter_selected = {};
    },
    '$store.state.order.favorite_items'(){
      this.load_catalog()
    },
    pagination_page(newVal) {
      this.$router.push({path:this.$route.fullPath, query:{page:newVal}})
    },
    '$store.state.shop.data_filter':{
      handler(data){
        this.load_catalog()
        this.pagination_page = 1
      },
      deep:true
    }

  },
  methods:{
    has(object, key) {
      return object ? hasOwnProperty.call(object, key) : false;
    },
    selectViewType(type) {
      this.$store.commit('config/setViewTypeCatalog', type)
    },

    scrollToTop(){ window.scroll(0,0)},
    itemInBasket(item){



      if(this.has(this.$store.state.order.basket.items, item.code)) {
        return true
      } else {
        return false
      }

    },
    priceSet(data){
      var price       = Number.prototype.toFixed.call(parseFloat(data) || 0, 2),
          price_sep   = price.replace(/(\D)/g, ","),
          price_sep   = price_sep.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
      return price_sep + ' ₽';
    },
    itemSumm(count, price){return count*price},
    async load_catalog(){

      if(this.$route.params.catalog =='search') {
        /** ЕСЛИ ПОИСК **/
        var result = await this.$store.dispatch('api/get', {endpoint: 'shop/search', params: this.$route.query})
      }
      else if(this.$route.params.catalog =='profit') {
        /** ЕСЛИ ПРОФИТ **/
        var result = await this.$store.dispatch('api/get', {endpoint: 'shop/promotions/profit'})
      }
      else if(this.$route.params.catalog =='favorits') {
        /** ЕСЛИ ИЗБРАННОЕ **/
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
        this.show_orderby = true

        let params ={filter: this.$store.state.shop.data_filter, orderby: this.orderby};

        var result = await this.$store.dispatch('api/get', {endpoint: 'shop/category/' + this.page, params})
        if(result.body.products == false) {
          this.subcategory = result.body
          this.$store.state.shop.show_filters = false
        }
        else {
          this.subcategory = false
          this.$store.state.shop.show_filters = true
        }


        this.$store.state.shop.current_category = this.page

      }



        if (result.error == false && result.body.products != false) {
          this.not_found = false;
          this.catalog_items = result.body.products

          this.catalog_items_count = Object.keys(this.catalog_items).length
          this.category = result.body.products.category

          let data = []
          for(var key in this.catalog_items)
          {
            data.push(key)

          }
          this.$store.state.shop.showedProducts = data
        }

      else if (result.error == false && result.body.products == false)
        {
            this.is_subcategory = 'ТЕСТ'
        }
      else
      {
        this.$store.state.shop.showedProducts = []
        this.catalog_items = false;
        this.not_found = result.body
      }

    },
    async  addItemToBasket(item){
      item['count'] = 1
      var uri = 'basket/'+item.code + '/' + item.count
      var result = await this.$store.dispatch('api/post', {endpoint:uri})
      this.$store.state.order.basket_load_item = true;

    },

    viewItem(item){this.$router.push('/catalog/'+this.page+'/'+item.code)}


  }
}
</script>

<style scoped>
h4{
  text-align: center;
}

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
.item_image{
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
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
  margin-bottom: -10px;
}
.view__method{
  line-height: 22px;

}
.icons{
  zoom: 0.6;
  margin-left: 10px;
}
.view_tile_black, .view_list_black{  border: 1px solid grey; border-radius: 3px}
.view_tile, .view_list{  border: 1px solid var(--base-color); border-radius: 3px}
.sort_by{
  display: inline-block;
  margin-right: 20px;
}
.sort_by select{
  border: 1px solid grey;
  background-color: white;
  width: auto;
  height: 1.9rem;
  padding: 2px;

}
.catalog_items_tile_view article{
  cursor: pointer;
}

.item_image, .item_description{
  position: relative;
}
.btn-std{

}
.catalog_items_tile_view .price{
  margin-bottom: 10px;
}
.catalog_items_tile_view .btn-std{
  width: 150px;
}
.catalog_items_tile_view .item_price{
text-align: center;
}
.btn-std{

}
.item_image >div{
  width: 200px;
  height: 150px;
  margin-left: auto;
  margin-right: auto;
}
.pagination{
  display: flex;
  justify-content: center;
}
.pagination ul{
  list-style: none;
  display: inline-flex;
  flex-wrap: wrap;  margin: 0 auto;
}
.pagination ul  li.active {
  cursor: default;
  background-color: rgba(0,0,0,0.2);
}
.pagination ul li{
  margin-top: 15px;
  cursor: pointer;
  width: 20px;
  height: content-box;
  padding: 3px;
  text-align: center;
  border-radius: 60% 60% 60% 60%;
}
.subcategory_item_image{
  width: 150px;
  height: 150px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  margin: 0 auto;
  margin-bottom: 20px;
}

.subcategory_item{
  width: 50%;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 50px;

}
.subcategory_item a{
  width: 70%;
  text-align: center;
  border-radius: 7px;
  padding: 5px;
  box-shadow: 0 0 5px 2px rgba(0,0,0,0.2);
}

.subcategory_item a:hover{
  box-shadow: 0 0 5px 7px rgba(0,0,0,0.2);

}
.subcategory_item_image:hover{


}
.subcategory_item_image:hover{


}
</style>