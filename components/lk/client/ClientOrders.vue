<template>
<section>
<h1>Список заказов</h1>

  <table class="table">
  <thead>
  <tr>
    <th>Номер</th>
    <th>Статус</th>
    <th>Сумма</th>
    <th>Создан</th>

  </tr>
  </thead>
  <tbody>
  <tr v-for="item in orders" @click="$router.push('/order/search/'+item.order_token)">
    <td v-if="item.code">{{item.code}}</td>
    <td v-else>Не присвоен</td>
    <td>{{item.status}}</td>
    <td>{{item.summ}}</td>
    <td>{{item.created_at}}</td>

  </tr>
  </tbody>
  </table>


</section>
</template>

<script>
export default {
  name: "ClientOrders",
  data(){
    return{
      orders:false
    }
  },

  mounted() {
    this.getData()
  },
  methods:{
    async getData()
    {
      const result = await this.$store.dispatch('api/get', {endpoint:'lk/client/order'})
      if(result.error == false)
        this.orders = result.body
    },
  }


}
</script>

<style scoped>

</style>