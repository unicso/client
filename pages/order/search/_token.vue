<template>
<div class="order_view">
  <button class="btn-std backward__button" @click="$router.go(-1)">Назад</button>
  <h1>Данные заказа</h1>

  <div class="view_order" v-if="order!=false">

  <div class="code" v-if="order.code">Код: {{order.code}}</div>
  <div class="status" v-if="order.status" :class="[order.status=='Отменен'?'color_red':'']">Статус: {{order.status}}</div>
  <div class="contragent" v-if="order.contragent">Наименование: {{order.contragent}}</div>
  <div class="inn" v-if="order.inn">ИНН: {{order.inn}}</div>
  <div class="kpp" v-if="order.kpp">КПП: {{order.kpp}}</div>
  <div class="customer_email" v-if="order.customer_email">email: {{order.customer_email}}</div>
  <div class="customer_phone" v-if="order.customer_phone">Телефон: {{order.customer_phone}}</div>
  <div class="customer_address" v-if="order.customer_address">Адрес доставки: {{order.customer_address}}</div>

  <div class="created_at" v-if="order.created_at">Создан: {{order.created_at}}</div>
  <div class="updated_at" v-if="order.updated_at">Обновлён: {{order.updated_at}}</div>
  <div class="summ" v-if="order.summ">Сумма: {{priceSet(order.summ)}}</div>
  <table>
    <caption><h3>Список товаров</h3></caption>
  <tr>
    <th>Наименование</th>
    <th>Кол-во</th>
    <th>Цена</th>
    <th>Сумма</th>
  </tr>
  <tbody>
  <tr v-for="item in order.items" :key="item.guid">
    <td>{{item.name}}</td>
    <td>{{item.count}}</td>
    <td>{{item.price}}</td>
    <td>{{item.summ}}</td>
  </tr>

  </tbody>

  </table>
<div class="btn-std delete_order" @click="deleteOrder" v-if="order.status !='Отменен' && confirm==false">Отменить заказ</div>
<div class="confirm_delete" v-if="confirm">
  <h3>Подтверждаете отмену заказа?</h3>
  <button class="btn-std" @click="deleteOrderConfirm">Подтверждаю</button>
  <button class="btn-std" @click="confirm=false">Нет</button>

</div>

</div>
  <div v-if="order =='empty' ">
    <h2>Заказ не найден</h2>
  </div>
  <loader v-if="order==false" :important="true"/>

</div>
</template>

<script>

import Loader from "../../../components/loader";
export default {
name: "token",
  components: {Loader},
  data(){
  return{
    order:false,
    token:'',
    confirm:false,
    previos_page:''
  }},


  mounted() {

    this.getOrder()
  },

  methods:{
    priceSet(data){
      var price       = Number.prototype.toFixed.call(parseFloat(data) || 0, 2),
          price_sep   = price.replace(/(\D)/g, ","),
          price_sep   = price_sep.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
      return price_sep + ' ₽';
    },
  async getOrder()
  {
    this.token = this.$route.params.token
    var request = {
      endpoint:'order/'+ this.token
    }

    const response = await this.$store.dispatch('api/get', request)

    if(response.error != true)
    {
      this.order = response.body
    }


  },
    async deleteOrder(){
      this.confirm = true
    },
    async deleteOrderConfirm(){
      var response = await this.$store.dispatch('api/delete',
          {endpoint:'order/'+this.token + '/' + this.confirm})


      if(response.error!= undefined && response.error == false)
      {
        this.confirm = false
      }
      this.getOrder()
    },

  }

}
</script>

<style scoped>
.delete_order{
  width: 200px;

}
.confirm_delete{
  width: 400px;
  height: 400px;
  border-color: red;
  color: red;
}
.color_red{
  color:red;
}
.backward__button{
  width: 80px;
  height: 25px;
  padding-top: 5px;
  padding-top: 3px;
}
</style>