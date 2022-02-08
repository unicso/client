<template>
<section>
  <h1>Отчет по продуктам.</h1>
  <sub>*Для выделения товаров за определеную дату кликните на требуюмую дату в таблице.</sub>
  <table class="table">
     <thead>
     <tr><td>Дата</td><td>Кол-во</td></tr>
     </thead>
    <tbody>
    <tr v-for="(item, index) in report.products" @click="select_date=index">
      <td>{{index}}</td><td>{{(Object.keys(item)).length}}</td>
    </tr>
    </tbody>
  </table>
{{report.count}}
  {{select_date}}
  <table class="table">
    <thead>
      <tr><td>Наименование</td><td>Дата добавления</td></tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in report.list">
        <td>{{item.value_log}}</td><td>{{item.created_at}}</td>
      </tr>
    </tbody>
  </table>
  
</section>
</template>

<script>
export default {
  name: "ProductReport",
  data(){
    return{
      report:false,
      select_date:false
    }
  },


  mounted() {
      this.loadReport()
  },
  methods:{
  async  loadReport(){
      const result = await this.$store.dispatch('api/get', {endpoint:'helper/webaction/newproductslog?show=true'})

    this.report = result.body


    }

  }

}
</script>

<style scoped>

</style>