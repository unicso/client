<template>
  <section>
    <h3>Уведомления по email</h3>
    <table class="table">
      <thead>
        <tr>
          <th>email</th>
          <th>Имя</th>
          <th>Уведомление</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items">
          <td>{{item.email}}</td>
          <td>{{item.name}}</td>
          <td><label><input type="checkbox" v-model="items[index].active" @change="saveStatus(item)"></label></td>
        </tr>

      <tr v-if="add != false">
        <td><input type="text" placeholder="email"  autofocus v-model="add_item.email" @change="$forceUpdate();"></td>
        <td><input type="text" placeholder="Имя" v-model="add_item.name"></td>
        <td><label><input type="checkbox" v-model="add_item.active"></label></td>
      </tr>

      </tbody>

    </table>
    <button v-if="add==false" @click="add=true" class="btn-std">Добавить уведомление</button>
    <button v-if="add !=false" @click="saveItems" class="btn-std">Сохранить</button>
    <button v-if="add !=false" @click="add=false" class="btn-std">Отмена</button>

    <div style="color:red" v-if="error!=false">
      {{error}}
    </div>


  </section>
</template>

<script>
export default {
  name: "EmailNotification",
  props:['contragent'],
  data() {
    return {
      add:false,
      add_item:{type:'manager_notify', parent_manager:'', email:'', name:'', active:1},
      items:[],
      error:false

    }
  },
  watch:{
    add_item:{
      handler(){this.$forceUpdate()},
      deep:true
    },


  },

  mounted() {
    this.getItems();

  },
  methods: {

    async getItems()
    {

      let params = {
        endpoint:'lk/manager/clients/notification',
        params: {
          type:'get'
        }
      }
      const result = await this.$store.dispatch('api/post', params);

      if(result.error == false)
        this.items = result.body

    },
    async saveStatus(item)
    {
      let data = [
        item
      ]
      let params = {
        endpoint:'lk/manager/clients/notification',
        params: {
          type:'status',
          data: JSON.stringify(data)
        }
      }


      const result = await this.$store.dispatch('api/post', params);

      if(result.error == false)
      {
        this.getItems()
      }
      else
      {
        this.getItems()
      }


    },


    async saveItems(){

      this.add_item.contragent = this.contragent
      this.items.push(this.add_item)



      let params = {
        endpoint:'lk/manager/clients/notification',
        params: {
          type:'save',
          data: JSON.stringify(this.items)
        }
      }


      const result = await this.$store.dispatch('api/post', params);



      if(result.error == false)
      {
        this.add_item = {type:'manager_notify', parent_manager:'', email:'', name:'', active:1}
        this.getItems()
      }
      else
      {
        this.getItems()
        this.error = result.body

      }
      console.log(result)


    }


  }


}
</script>

<style scoped>
td:not(:last-child){
  width: 40%;
}
td:last-child{
  padding: 0;
}
input[type=checkbox]{
  cursor: pointer;
  width: 100%;
}
label{
  display: block;
  width: 100%;
  height: 100%;
  line-height: 1.8em;
  cursor: pointer;

}
</style>