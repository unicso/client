<template>
<div>
  <product-category/>


<div class="main_page_content">
  <div class="empty_block"></div>
  <div class="orders_basket on_top">
    <h1>Оформление заказа</h1>
    <div v-if="2==3">
      <pre><div v-html="result"></div></pre>
    </div>
    <div class="inline">
      <div class="order_items content_block base_shadow">
        <div class="empty_basket" v-if="basket.count == 0">
          Корзина пуста
        </div>
        <div class="basket_items">
          <ul>
            <li  class="view_item" v-for="(item, index) in basket.items" :key="item.guid">
              <div class="image">
                <img :src="item.image">
              </div>
              <div class="name std_link">
                <nuxt-link  :to="'/catalog/item/'+item.guid">{{item.name}}</nuxt-link>
              </div>
              <div class="unit_price">
                <input type="number"  class="item_count" name="item_count"
                       v-model="basket.items[index].count">

                 х {{priceSet(item.price)}} = {{priceSet(item.count*item.price)}}
                <i class="delete_item" @click="deleteItemFromBasket(item.guid)">
                  &#215;
                </i>
              </div>

            </li>
            <li class="summary">
              <ul>
                <li>Всего позиций: {{basket.count}}</li>
                <li>Сумма корзины: {{priceSet(basket_summ)}}</li>
              </ul>
            </li>
          </ul>
          <button class="btn-std update_basket" @click="updateBasket" :disabled="basket_update">
            <i v-if="basket_update">Обновление</i>
            <i v-else>Сохранить изменения</i>

          </button>
        </div>

      </div>
      <form class="order_client content_block " :class="[error?'error':'']">
        <h1>Информация о Вас</h1>
        <div class="customer_info">
          <div class="input_filed"  :class="[error?'error':'']">
            <label>Ваше имя<sup class="required" >*</sup>:</label>
            <input type="text" v-model="customer_name" >
          </div>

          <div class="input_filed"  :class="[error?'error':'']">
            <label>email<sup class="required">*</sup>:</label>
            <input type="text"  v-model="customer_email" required >
          </div>
          <div class="input_filed">
            <label>Телефон для связи:</label>
            <input type="text" v-model="customer_phone">
          </div>

          <div class="input_filed"  :class="[error?'error':'']">
            <label>ИНН организации<sup class="required">*</sup>:</label>
            <input type="number"  v-model="inn"  required >
          </div>
          <div class="input_filed" :class="[error?'error':'']">
            <label>КПП организации<sup class="required">*</sup>:</label>
            <input type="number" v-model="kpp" required >
          </div>
          <div class="input_filed" :class="[error?'error':'']">
            <label>Адрес доставки<sup class="required" >*</sup>:</label>
            <input type="text" v-model="customer_address"  required >
          </div>
          <div class="input_filed">
            <label>Комментарий к заказу:</label>
            <textarea  rows="3" type="text" v-model="customer_comments"/>
          </div>

        </div>
        <br>
        <button form="out_form" v-if="basket.count>0" class="btn-std base_shadow_hover base_shadow" @click="addOrder" :disabled="!policy_accept">Оформить заказ</button>
        <div class="error_message" v-if="error" v-html="error"></div>
        <div  class="policy">
          <input type="checkbox" name="policy_accept" id="policy_accept" v-model="policy_accept">
          <label for="policy_accept">Я согласен с использованием моих персональных данных в соответствии с
            <nuxt-link to="/info/politika-konfidentsialnosti" >политикой конфиденциальности</nuxt-link>.
          </label>

        </div>
      </form>
    </div>
  </div>

</div>

</div>



</template>

<script>
import ProductCategory from "../../components/main/ProductCategory";
export default {
name: "basket",
  components: {ProductCategory},
  data(){
  return{
    //3232005484
    basket_update:false,
    inn:'',
    show_customer_info:false,
    customer_email:'',
    customer_name:"",
    customer_phone:'',
    customer_address:'',
    customer_comments:'',
    kpp:'',
    name:'',
    manager:'',
    manager_email:'',
    address:'',
    result:{},
    error:false,
    basket:{},
    order_status:false,
    policy_accept:false
  }
  },
  computed:{
  basket_summ:{
    get(){
      let summ = 0
      for (var item in this.basket.items)
      {
        summ += +this.basket.items[item].price * +this.basket.items[item].count
      }
      return summ;
    }
  }

  },
  watch:{
    customer_name(newVal) {this.error = false},
    customer_email(newVal) {this.error = false},
    customer_inn(newVal) {this.error = false},
    customer_kpp(newVal) {this.error = false},
    customer_address(newVal) {this.error = false},

  },
  mounted() {
  this.load_basket()
  },
  methods:{

    priceSet(data){
      var price       = Number.prototype.toFixed.call(parseFloat(data) || 0, 2),
          price_sep   = price.replace(/(\D)/g, ","),
          price_sep   = price_sep.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
      return price_sep + ' ₽';
    },
    async  load_basket()
    {

      const result = await this.$store.dispatch('order/getBasket');
      this.basket = result.body

      console.log(this.basket)

    },
    async deleteItemFromBasket(guid)
    {
      this.$store.state.order.basket_load_item=true
      await this.$store.dispatch('order/deleteItemFromBasket', guid)
      this.load_basket()
    },
    async addItemToBasket(guid, count)
    {
      var uri = 'basket/'+guid + '/' + count
      var result = await this.$store.dispatch('api/post', {endpoint:uri})
      this.$store.state.order.basket_load_item = true;

    },
    async updateBasket()
    {
      this.basket_update = true
      for (var guid in this.basket.items)
      {
       await this.addItemToBasket(guid, this.basket.items[guid].count)

      }

      this.load_basket()
      setTimeout(()=>{this.basket_update = false}, 1000)

    },
    async addOrder()
    {


      var order ={
        inn: this.inn,
        kpp:this.kpp,
        customer_email: this.customer_email,
        customer_address: this.customer_address,
        customer_phone: this.customer_phone,
        customer_name: this.customer_name,
        customer_comments:this.customer_comments,
        items: this.basket.items
      }


      var params = {
            endpoint: 'order',
            params:{order:JSON.stringify(order)}
    }
      const request = await this.$store.dispatch('api/post', params)
      this.result = request
      console.log(request)
      if(request.error === true)
      {
        this.error = request.body
      }
      else
      {
        this.order_status = true;

        this.load_basket()
      if(typeof request.body.order_token != 'undefined')
        this.$router.push('/order/search/'+request.body.order_token)
      }

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

.unit_price{
  min-width: 200px;
  max-width: 300px;
  text-align: right;
  word-wrap: break-word;
  margin-left: auto;
  margin-right: 5px;
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
 /* float: left;*/
}
.summary .to_basket{
  float: right;
  margin-top: 10px;
}

.order_items, .order_client{
  border-radius: 15px;
  z-index: 105;
  background-color: white;

}

.view_item .name{
  /*width: 350px;*/
  text-align: left;
}
sup {
  color:red;
  font-size: 1.2rem;
  position: relative;
  top:5px
}

.error_message{
  margin-top: 10px;
  color: red;
}
.error>label {
  color: red;
}
.error>input {
  border: 1px solid red;
}
.btn-std{
 /* width: 100%;*/
}
.policy a{
  color:blue
}
.policy label, .policy input{
  cursor: pointer;
}
.policy{
  cursor: pointer;
  margin-top: 10px;
}
.btn-std:disabled{
  border-color: grey;
}
.main_page_content{
  display: grid;
}
.delete_item{
  font-size: 2rem;
  cursor: pointer;
  margin-top: 1rem;
}
.delete_item:hover{
  font-weight: bold;
  color: red;
}
.item_count{
  width:50px;
  font-size: 1rem;
  height: auto;
}
</style>