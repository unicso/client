<template>
<div class="basket_main_menu"  @mouseleave="show_fast_view = false">
  <div class="basket_button btn-std base_shadow_hover"
       :class="[$store.state.order.basket_load_item?'basket_process':'']"
       @mouseover="show_fast_view = true"
      @click="$router.push('/order/basket'); show_fast_view = false">
    Корзина
    <i v-if="basket.count>0">({{basket.count}})</i>
  </div>
  <div class="basket_fast_view base_shadow on_top" v-if="show_fast_view">
    <div class="empty_basket" v-if="basket.count == 0">
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
        <nuxt-link  :to="'/catalog/item/'+item.guid">{{item.name}}</nuxt-link>
      </div>
      <div class="unit_price">
          {{item.count}} х {{priceSet(item.price)}} = {{priceSet(item.count*item.price)}}
      </div>
        <div class="delete_item" @click="deleteItemFromBasket(item.guid)">
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
  data(){
  return{
    basket_item_counts:0,
    show_fast_view:false,
    basket:{}

  }
  },
watch:{
  '$store.state.order.basket_load_item'(newVal, oldVal)
  {

    this.load_basket()
  }

},
  mounted()
  {
    this.load_basket()

  },

  methods:{


  deleteItemFromBasket(guid)
  {
    this.$store.state.order.basket_load_item=true
    this.$store.dispatch('order/deleteItemFromBasket', guid)
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
    setTimeout(()=>this.$store.state.order.basket_load_item=false, 100)
    this.basket = result.body

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
 /* border-bottom: 1px solid rgb(255,73,0);*/
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
.basket_title{
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid rgb(255,73,0);
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
  color: rgb(255,73,0);
  cursor: pointer;
}
.delete_item{
  color: black ;
}
.delete_item:hover{
  color: rgb(255,73,0);
}
</style>