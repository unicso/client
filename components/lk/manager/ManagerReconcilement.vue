<template>
<section>

  <section v-if="!current_contragent">
    <h1>Цепочки согласования</h1>
    <table class="table" v-if="contragents!=false">
        <thead>
        <tr>
          <th>Наименование</th>
          <th>Оф. наименование</th>
          <th>ИНН</th>
        </tr>
        </thead>
      <tbody>
      <tr v-for="contragent in contragents" @click="current_contragent = contragent">
        <td>{{contragent.name}}</td>
        <td>{{contragent.official_name}}</td>
        <td>{{contragent.inn}}</td>
      </tr>

      </tbody>
    </table>
  </section>
  <section v-else>
    <chains-set :contragent="current_contragent"/>
  </section>

</section>
</template>

<script>
import ChainsSet from "../../common/Reconcilement/ChainsSet";
export default {
  name: "ManagerReconcilement",
  components: {ChainsSet},
  data(){
    return{
      contragents:false,
      current_contragent:false,


      showContragentList:true,
      users:{},
      chains:[""],
      subdivision:'По умолчанию',
     // showSubdivision:false
      result:false,
      chains_type:'vertical'
    }
  },

  mounted() {


    this.getContragents()

  },

  methods:{


    async getContragents(){
      const result = await this.$store.dispatch('api/get',{endpoint:'lk/manager/clients'})

      if(result.error == false)
      {
        this.contragents = result.body
      }


    },


  }


}
</script>

<style scoped>

</style>