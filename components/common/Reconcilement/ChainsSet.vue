<template>
<section>
  <h1>Цепочки согласования {{ contragent.name }}</h1>

  <table class="table content_block base_shadow_hover" v-if="users != false">
    <caption>Пользователи контрагента</caption>
    <thead>
    <tr>
      <th>Имя</th>
      <th>email</th>
      <th>Соглашение</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="user in users">
      <td>{{user.user_name}}</td>
      <td>{{user.email}}</td>
      <td>{{user.price_type}}</td>
    </tr>

    </tbody>
  </table>
  <h3 v-else>Пользователи контрагента не заданы.</h3>
  <div class="chains  content_block base_shadow_hover">
    <h3>Добавить/изменить цепочку согласования.</h3>
  <div class="input__field">
    <select v-model="chains_type" class="height__fit">
      <option selected value="vertical">Вертикальное согласование</option>
      <option selected value="horizontal">Горизонтальное согласование</option>

    </select>
  </div>
  <div class="input__field">
    <label>Подразделение</label>
    <input type="text" v-model="subdivision" placeholder="Подразделение">
  </div>
  <br><br><br>
  <div  v-for="(chain, index) in chains">

    <div class="input__field podpisant">
      <select class="" v-model="chains[index]">
        <option v-for="user in users" :value="user">{{user.user_name}} - {{user.user_email}}</option>
      </select>
      <button  class="btn-std "  @click="chains.splice(index, 1)" >Удалить</button>

    </div>
  </div>
  <div class="input__field podpisant">
    <button @click="addChain" class="btn-std full__width">Добавить подписанта</button><br>
    <button  @click="saveChains" class="btn-std full__width">Сохранить изменения</button>
  </div>


  <br><br>
  <chains-vertical v-if="chains_type == 'vertical'" :chains="chains"/>
  <chains-horizontal v-if="chains_type == 'horizontal'" :chains="chains"/>



</div>

  <div class="exist_chains" v-if="exist_chains">
    <h2>Существующие цепочки.</h2>
    <section v-for="(chain, index) in exist_chains" class="content_block base_shadow_hover">

      <div v-for="(chain_item,type) in chain">
        <div @click="fillChain(type,chain_item, index)" class="std_link">
          <h3>Подразделение: {{index}}</h3>
          <h3 v-if="type == 'vertical'" >Тип: веркальное</h3>
          <h3 v-if="type == 'horizontal'">Тип: горизонтальное</h3>


        </div>
        <chains-vertical v-if="type == 'vertical'" :chains="chain_item"/>
        <chains-horizontal v-if="type == 'horizontal'" :chains="chain_item"/>
      </div>


    </section>


  </div>
</section>
</template>

<script>
import ChainsVertical from "./ChainsVertical";
import ChainsHorizontal from "./ChainsHorizontal";
export default {
  name: "ChainsSet",
  components: {ChainsHorizontal, ChainsVertical},
  props:[
      'contragent'
  ],
  data(){
    return{
      contragents:false,
      current_contragent:false,


      showContragentList:true,
      users:false,
      chains:[""],
      subdivision:'По умолчанию',
      // showSubdivision:false
      result:false,
      result2:false,
      chains_type:'vertical',
      exist_chains:false
    }
  },
  mounted() {
    this.getContragentUsers()
    this.getContragentChains()
  },
  methods:{

    /**
     * ASYNC METHODS
     */
    async getContragentUsers(){

      const result = await this.$store.dispatch('api/get',{endpoint:'lk/manager/clients/users/'+this.contragent.guid})

      if(result.error == false)
      {
        this.users = result.body
        this.current_contragent = this.contragent
        this.showContragentList = false
      }
    },
    async getContragentChains(){

      const result = await this.$store.dispatch('api/get',{endpoint:'lk/reconcilement/client/'+this.contragent.guid})
     console.log(result)

      if(result.error == false)
      {
        this.exist_chains = result.body
        this.showContragentList = false
      }
    },

    async saveChains(){
      //const result = await this.$store.dispatch('api/get',{endpoint:'lk/manager/clients'})

      let params = {
        endpoint:"lk/manager/clients/reconcilement",
        params:{
          contragent:this.contragent.guid,
          subdivision: this.subdivision,
          type:this.chains_type,
          chains:JSON.stringify(this.chains)
        }

      }
      const result = await this.$store.dispatch('api/post', params);

      this.result = result
      //   if(result.error == false)
      // {
      //   this.contragents = result.body
      // }
      this.getContragentChains()
    },


    /**
     * ASYNC METHODS END
     */

    fillChain(type,chains, subdivision)
    {
      this.subdivision = subdivision
      this.chains_type = type
      this.chains = chains


    },
    addChain()
    {
      this.chains.push('')
    },

  }

}
</script>

<style scoped>

p i{
  font-weight: bold;
}
details, summary{
  cursor: pointer;
}

h1{
  font-size: 1.3rem;
}

.input__field button{
  width: 200px;
}
.podpisant{
  display: inline-flex;
  width: 100%;
}
/**
TREEEEEEEEEEEEEEE
 */


section{
  margin-left: auto;
  margin-right: auto;
  width: 90%;
}
h2,h4,h3{
  text-align: center;
}
h3{
  margin: 5px;
  padding: 0px;
}

</style>