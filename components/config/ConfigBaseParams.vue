<template>
  <section>
    <h2>Основные параметры.</h2>

    <table class="table">
      <thead>
        <tr><th>Параметр</th><th>Значение</th><th>Комментарий</th></tr>
      </thead>
      <tbody>
        <tr v-for="(item, guid) in items">
          <td>{{item.name}}</td>
          <td>
            <input type="checkbox" v-if="item.type=='bool'">
            <select  v-if="item.type=='select'" v-model="item.value"><option v-for="(prop, name) in item.props" :value="prop">{{name}}</option></select>
          </td>


          <td>{{item.description}}</td>
        </tr>
      </tbody>

    </table>



  </section>
</template>

<script>
export default {
  name: "ConfigBaseParams",
  data() {
    return {
      items:{
        '13123213':{name:'Показывать изображения', value:true, description:'ddd', cef_name:'images', type:'bool'},
        '131232132':{name:'Скрывать цены', value:true, description:'ddd', cef_name:'prices', type:'bool'},
        '13123222':{
          name:'Тестовый',
          value:'test2',
          description:'ddd',
          cef_name:'prices',
          type:'select',
          props:{'Тест 1':'test1', 'Тест 2':'test2'}},



      }
    }
  },
  mounted() {
  },
  methods: {

  }


}
</script>

<style scoped>

</style>