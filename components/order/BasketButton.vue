<template>
<div class="basket_main_menu"  @mouseleave="show_fast_view = false">
  <div classs="basket_button btn-std base_shadow_hover"
       :class="[$store.state.order.basket_load_item?'basket_process':'']"
       @mouseover="show_fast_view = true"
      @click="$router.push('/order/basket'); show_fast_view = false"
    v-if="asIcon!=true"
  >
    <div class="menu__icon__fields">
      <div class="menu__icon">
        <div class="icons " :class="[(show_fast_view||$route.fullPath=='/order/basket')?'basket':'basket_black']"></div>
        <i v-if="basket.count>0" class="basket_count">{{basket.count}}</i>
      </div>
      <div class="menu__icon__text ">Корзина</div>
    </div>

  </div>
  <div v-if="asIcon" class="shoping_cart" @click="$router.push('/order/basket')">
    <i v-html="$store.state.icons.shoping_cart"></i>
    <div>{{basket.count}}</div>
  </div>
  <div class="basket_fast_view base_shadow on_top_100" v-if="show_fast_view && asIcon!=true">
    <div class="empty_basket" v-if="basket == false">
      Корзина пуста
    </div>
    <div v-else class="basket_items">

      <div  class="basket_title">

        <div class="title">Ваша корзина</div>

        <div class="counts">Товаров: {{basket.count}}</div>
      </div>

    <ul>
      <li  class="view_item" v-for="item in basket.items" :key="item.guid">
      <div class="name " @click="show_fast_view = false">
        <nuxt-link  :to="'/catalog/item/'+item.code">{{item.name}}</nuxt-link>
      </div>
      <div class="unit_price">
              {{item.count}} х {{priceSet(item.price)}} = {{priceSet(item.count*item.price)}}
      </div>
        <div class="delete_item" @click="deleteItemFromBasket(item.code)">
          &#215;
        </div>
      </li>
    <li class="summary">
    <ul>
      <li>Сумма корзины: {{priceSet(basket.summ)}}</li>
    </ul>
    <div class="to_basket" @click="show_fast_view = false">
      <nuxt-link to="/order/basket" class="btn-std base_shadow_hover">Оформить заказ</nuxt-link>
    </div>
    </li>
    </ul>

    </div>


  </div>


</div>
</template>

<script>
export default {
name: "BasketButton",
 props:[
     'asIcon'
 ],
  data(){
  return{
    basket_item_counts:0,
    show_fast_view:false,
    basket:{},


  }
  },
watch:{
  '$store.state.order.basket_load_item'(newVal, oldVal)
  {
    this.load_basket()
  },
  '$store.state.user.current_price_type'()
  {
    this.load_basket()
  }

},
  mounted()
  {
  //  this.load_basket()

  },

  methods:{


  deleteItemFromBasket(code)
  {
    this.$store.state.order.basket_load_item=true
    this.$store.dispatch('order/deleteItemFromBasket', code)
  },
  priceSet(data){
      var price       = Number.prototype.toFixed.call(parseFloat(data) || 0, 2),
          price_sep   = price.replace(/(\D)/g, ","),
          price_sep   = price_sep.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
      return price_sep + '₽';
    },

 async  load_basket()
  {
    const result = await this.$store.dispatch('api/get', {endpoint:'basket'})
    if(result.body != undefined)
    {

      setTimeout(()=>this.$store.state.order.basket_load_item=false, 100)
      this.basket = result.body
      this.$store.state.order.basket_count_items = this.basket.count
      this.$store.state.order.basket = result.body
    }

  }

  }



}
</script>
<style>
.wrapper{
  margin-bottom: 50px;
}
.search p {
  margin: 5px;
}
</style>
<style scoped>
.basket_main_menu{
  text-align: center;
  margin-right: 30px;
 /* width: 200px;*/
}
i{
  font-style: normal;
}
.basket_fast_view{
  position: absolute;
  width: 400px;

  border-radius: 15px;
  padding: 25px;
  margin-left: -400px;
  background-color: white;
}
.image img{
  width: 50px;
  max-height: 50px;
  padding-right: 10px;
}
.view_item{
  display: inline-flex;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
}

.view_item .name{
  width: 350px;
  overflow:hidden;
  text-overflow: ellipsis;
  white-space: pre;

}
.unit_price{
  width: 100%;

  word-wrap: break-word;
  font-size: 0.9rem;
  padding-left: 10px;
  text-align: right;
}
.view_item:not(:nth-last-child(2))
{
 /* border-bottom: 1px solid var(--base-color);*/
}
.summary {
  border-top: 2px solid var(--base-color);
  padding-top: 10px;

}

.basket_process{

  font-weight: bolder;
  font-size: 1.1rem;

}
.summary ul{
  float: left;
}
.summary .to_basket{
  float: right;
  margin-top: 10px;
}
.basket_title{
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid var(--base-color);
}
.basket_title .name{
  text-align: left;
}
.basket_title .counts{

}
.delete_item{
  font-weight: bolder;
  cursor: pointer;
  margin-left: 10px;
  font-size: 1.7rem;
  margin-top:-7px
}
.view_item:hover{
  color: var(--base-color);
  cursor: pointer;
}
.delete_item{
  color: black ;
}
.delete_item:hover{
  color: var(--base-color);
}
.shoping_cart{
  display: inline-flex;
}
.menu__icon{
  display: inline-flex;
  cursor: pointer;
}
.basket_count{
  margin-left: -5px;
  margin-top: 15px;
  font-size: 0.7rem;
}
.menu__icon__text{


  margin-left: -5px;
}

</style>