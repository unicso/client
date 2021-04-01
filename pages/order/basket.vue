<template>
<div class="orders_basket">
  <h1>Оформление заказа</h1>
  <div class="order_items content_block base_shadow_hover">

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
          </li>
        </ul>

      </div>




  </div>
  <div class="order_client content_block base_shadow_hover">
    <h1>Информация о Вас</h1>
     <div class="input_fields">
       <input type="text" placeholder="Ваше имя">
       <br>
       <input type="text" placeholder="Введите email">
       <br>
       <input type="number" name="inn" v-model="inn" placeholder="Введите ИНН организации">
       <button class="btn-std base_shadow_hover" @click="findCustomer">Заполнить</button>
       <br>

       <div class="customer_info" v-if="show_customer_info">
         <label>Название</label><input type="text" v-model="name" >
         <br>
         <label>КПП</label><input type="text" v-model="kpp" >
         <br>
         <label>Адрес</label><input type="text" v-model="address" >
         <br>
         <label>Email</label><input type="text" v-model="email" >
         <br>
         <label>Телефон</label><input type="text" v-model="phone" >
         <br>


         <label>Менеджер</label><input type="text" v-model="manager" >
         <br>
         <label>email Менеджера</label><input type="text" v-model="manager_email">
         <br>

       </div>
     </div>
  </div>


</div>
</template>

<script>
export default {
name: "basket",
  data(){
  return{
    //3232005484
    inn:'',
    show_customer_info:false,
    email:'',
    phone:'',
    kpp:'',
    name:'',
    manager:'',
    manager_email:'',
    address:''
  }
  },
  methods:{
    priceSet(data){
      var price       = Number.prototype.toFixed.call(parseFloat(data) || 0, 2),
          price_sep   = price.replace(/(\D)/g, ","),
          price_sep   = price_sep.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
      return price_sep + ' ₽';
    },

    async findCustomer()
    {
      const result = await this.$store.dispatch('api/get',
          {
            endpoint:'info/contragent/'+this.inn

          }
          )
      console.log(result)
      if(result.body!=false)
      {
          var customer = result.body
        this.name = customer.name
        this.kpp = customer.kpp
        this.email = customer.email
        this.phone = customer.phone

        this.manager = customer.manager
        this.manager_email = customer.manager_email

        this.address = customer.address


      }
      this.show_customer_info = true

    }
  }
}
</script>

<style scoped>
i{
  font-style: normal;
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

.summary ul{
  float: left;
}
.summary .to_basket{
  float: right;
  margin-top: 10px;
}
.order_client{
  float: right;
}
.order_items{
  float: left;
}
.order_items, .order_client{
  width: 500px;

  border-radius: 15px;

  z-index: 105;

  background-color: white;
}
</style>