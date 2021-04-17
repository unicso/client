<template>
<div class="order_view">
  <h1>Данные заказа</h1>
<div class="view_order" v-if="order!=false">

  <div class="code" v-if="order.code">Код: {{order.code}}</div>
  <div class="status" v-if="order.status">Статус: {{order.status}}</div>
  <div class="contragent" v-if="order.contragent">Наименование: {{order.contragent}}</div>
  <div class="inn" v-if="order.inn">ИНН: {{order.inn}}</div>
  <div class="kpp" v-if="order.kpp">КПП: {{order.kpp}}</div>
  <div class="customer_email" v-if="order.customer_email">email: {{order.customer_email}}</div>
  <div class="customer_phone" v-if="order.customer_phone">Телефон: {{order.customer_phone}}</div>
  <div class="customer_address" v-if="order.customer_address">Адрес доставки: {{order.customer_address}}</div>

  <div class="created_at" v-if="order.created_at">Создан: {{order.created_at}}</div>
  <div class="updated_at" v-if="order.updated_at">Обновлён: {{order.updated_at}}</div>
  <div class="summ_basket" v-if="order.summ_basket">Сумма: {{priceSet(order.summ_basket)}}</div>
  <div class="summ" v-if="order.summ">Сумма со скидкой: {{priceSet(order.summ)}}</div>
  <table>
    <caption><h3>Список товаров</h3></caption>
  <tr>
    <th>Наименование</th>
    <th>Кол-во</th>
    <th>Цена</th>
    <th>Сумма</th>
  </tr>
  <tbody>
  <tr v-for="item in order.items_basket" :key="item.guid">
    <td>{{item.name}}</td>
    <td>{{item.count}}</td>
    <td>{{item.price}}</td>
    <td>{{item.summ}}</td>

  </tr>

  </tbody>

  </table>

</div>
  <div v-else>
    <h2>Заказ не найден</h2>
  </div>
</div>
</template>

<script>
export default {
name: "token",
  data(){
  return{
    order:false
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
    var request = {
      endpoint:'order/'+this.$route.params.token
    }

    const response = await this.$store.dispatch('api/get', request)
console.log(response.body)
    if(response.error != true)
    {
      this.order = response.body
    }




  }

  }

}
</script>

<style scoped>

</style>