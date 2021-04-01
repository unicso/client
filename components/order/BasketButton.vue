<template>
<div class="basket_main_menu"  @mouseleave="show_fast_view = false">
  <div class="basket_button btn-std base_shadow_hover"
       :class="[$store.state.order.basket_load_item?'basket_process':'']"
       @mouseover="show_fast_view = true">
    Корзина
    <i>({{$store.state.order.basket_count_items}})</i>
  </div>
  <div class="basket_fast_view base_shadow on_top" v-if="show_fast_view">
    <div class="empty_basket" v-if="$store.state.order.basket_count_items == 0">
     Корзина пуста
    </div>
    <div class="basket_items">
    <ul>
      <li  class="view_item" v-for="item in $store.state.order.basket" :key="item.guid">
      <div class="image">
        <img :src="item.image">
      </div>
      <div class="name">
      {{item.name}}
      </div>
      <div class="unit_price">
      {{item.count}}х{{priceSet(item.price)}}
        <hr>
        {{priceSet(item.count*item.price)}}
      </div>
      </li>
    <li class="summary">
    <ul>
      <li>Всего позиций: {{$store.state.order.basket_count_items}}</li>
      <li>Сумма корзины: {{priceSet($store.state.order.basket_summary)}}</li>
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
  data(){
  return{
    basket_item_counts:0,
    show_fast_view:false


  }
  },

  mounted()
  {
    this.load_basket()

  },
  methods:{
    priceSet(data){
      var price       = Number.prototype.toFixed.call(parseFloat(data) || 0, 2),
          price_sep   = price.replace(/(\D)/g, ","),
          price_sep   = price_sep.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
      return price_sep + ' ₽';
    },

  load_basket()
  {

    this.$store.dispatch('order/loadBasketFromCookies')
  }

  }



}
</script>

<style scoped>
i{
  font-style: normal;
}
.basket_fast_view{
  position: absolute;
  width: 400px;

  border-radius: 15px;
  padding: 25px;
  margin-left: -300px;
  z-index: 105;

  background-color: white;
}
.image img{
  width: 50px;
  max-height: 50px;
  padding-right: 10px;
}
.view_item{
  display: inline-flex;

  padding-top: 10px;
  padding-bottom: 10px;
}
.unit_price{
  min-width: 100px;
  max-width: 200px;
  text-align: center;
  word-wrap: break-word;
  font-size: 0.8rem;
  padding-left: 10px;
}
.view_item:not(:nth-last-child(2))
{
  border-bottom: 1px solid rgb(255,73,0);
}
.summary {
  border-top: 2px solid rgb(255,73,0);
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
</style>