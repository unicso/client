<template>
  <section>
    <h2>Информация о пользователе.</h2>

    <table class="table">
      <caption>Доступные соглашения</caption>
      <thead>
        <tr>
          <th>Контрагент</th><th>Соглашение</th><th>Автор</th><th>Вирт. скидка (%)</th><th>Активно</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in info.current">
        <td @click="$router.push('/user/lk/manager/edit_price_type?type='+item.price_type)">{{item.contragent}}</td>
        <td  @click="$router.push('/user/lk/manager/edit_price_type?type='+item.price_type)">{{item.name}}</td>
        <td  @click="$router.push('/user/lk/manager/edit_price_type?type='+item.price_type)">{{item.fullname}}</td>
        <td>{{item.discount}}</td>
        <td><input type="checkbox" v-model="info.current[index].active" @change="saveStatus(item)"></td>
      </tr>
      </tbody>
    </table>

    <div class="add_soglas">
      <div class="input__field">

        <input type="text" v-model="soglashenie_search"  placeholder="Для фильтрации списка введите часть названия, контрагента или автора соглашения">

        <label>Свои соглашения</label>
        <select v-model="soglashenie">
          <option v-for="(soglas, index) in info.manager"
                  v-if="(soglas.name).toUpperCase().indexOf(soglashenie_search.toUpperCase())>-1
|| (soglas.contragent).toUpperCase().indexOf(soglashenie_search.toUpperCase())>-1
" :value="index">
            {{soglas.contragent}} - {{soglas.name}} ({{soglas.discount}})</option>
        </select>
        <label>Все соглашения</label>
        <select v-model="soglashenie">
          <option v-for="(soglas2, index) in info.manager_all"
                  v-if="(soglas2.name).toUpperCase().indexOf(soglashenie_search.toUpperCase())>-1
|| (soglas2.contragent).toUpperCase().indexOf(soglashenie_search.toUpperCase())>-1
|| (soglas2.manager).toUpperCase().indexOf(soglashenie_search.toUpperCase())>-1
"
          :value="index"
          >
            {{soglas2.contragent}} - {{soglas2.name}} ({{soglas2.discount}}) - {{soglas2.manager_name}}</option>
        </select>


      </div>

      <button class="btn-std" @click="save">Сохранить</button>

    </div>

    <pre>{{soglashenie}}</pre>
    <pre>{{info.manager}}</pre>

  </section>
</template>

<script>
export default {
  name: "ClientInfo",
  props:[
    'user'
  ],
  data() {
    return {

      info:false,
      soglashenie:'',
      soglashenie_search:'',
      price_type_strong:false,
      contragent:'',
      edit_soglashenie:false

    }
  },
  mounted() {

    this.getUser()

  },
  methods: {

    async saveStatus(item)
    {
      let params = {
        endpoint:'lk/manager/clients/userinfo/'+this.user,
        params:{
          price_type:item.price_type,
          status: item.active
        }
      }

      const result = await this.$store.dispatch('api/post', params);



    },

    async save()
    {
      let contragent = this.info.manager_all[this.soglashenie]


      let data = {
        price_type:this.soglashenie,
        contragent:contragent.contragent_guid,
        manager:contragent.manager_guid,
        user:this.user
      }

      let params = {
        endpoint:'lk/manager/clients/userinfo/'+this.user,
        params:{
          data: JSON.stringify(data)
        }
      }


      const result = await this.$store.dispatch('api/post', params);



    },

    changeSearch(data)
    {

      this.soglashenie_search = data.target.value

    },
    async getUser()
    {
      const result = await this.$store.dispatch('api/get',{endpoint:'lk/manager/clients/userinfo/'+this.user});


      if(result.error == false)
        this.info = result.body


    }

  }


}
</script>

<style scoped>
input[type=checkbox]:hover{
  cursor: pointer;
}
</style>