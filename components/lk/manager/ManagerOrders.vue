<template>
 <section>
   <h1>Заказы клиентов</h1>

   <table class="table">
     <thead>
     <tr>
       <th>#</th>
       <th>Код</th>
       <th>Контрагент</th>
       <th>Сумма</th>
       <th>Статус</th>
       <th>Уведомления</th>

     </tr>
     </thead>
     <tbody>
     <tr v-for="(item, index) in items" @click="$router.push('/order/search/'+ item.order_token)">
       <td>{{index+1}}</td>
       <td>{{item.code}}</td>
       <td>{{item.contragent}}</td>
       <td class="summ">{{item.summ | price}}</td>
       <td>{{item.status}}</td>
       <td class="notify">{{item.notify}}</td>
     </tr>


     </tbody>
   </table>






 </section>


</template>

<script>
export default {
  name: "ManagerOrders",
  data() {
    return {
    items: {}
    }
  },
  mounted() {
      this.getOrders()
  },
  methods: {

    async getOrders()
    {

      const result = await this.$store.dispatch('api/get', {endpoint:'lk/manager/clients/allorders'});

      if(result.error == false) {
        this.items = result.body

        console.log(result.body)
      }



    }


  }


}
</script>

<style scoped>
.notify{
  width: 100px;
  white-space: normal;
}
</style>