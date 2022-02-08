<template>
  <section>
    <h2>Редактирование соглашения.</h2>
    <label>
      Загрузить соглашение в формате: CSV UTF-8 (разделитель - запятая).
      <input type="file" class="btn-std" id="file" ref="file" v-on:change="handleFileUpload()"/>

    </label>
    <button @click="handleFileUpload()">Загрузить</button>
    <br>
    <button @click="clearDisplay">Отображать все товары</button>
    <br><br>
    <table class="table">
      <thead>
        <tr>
          <th>#</th><th>Наименования</th><th>Цена</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index ) in items">
          <td>{{index+1}}</td>
          <td>{{item.name}}</td>
          <td>{{item.price}}</td>

        </tr>
      </tbody>
    </table>



  </section>
</template>

<script>
export default {
  name: "EditPriceType",
  props:['edit_item'],
  data() {
    return {
      items:false,
      file:''
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
      this.save()
    },

    async load()
    {
      const result = await this.$store.dispatch('api/get', {endpoint:'/lk/manager/clients/pricetype/'+this.$route.query.type})

      this.items = result.body

    },
   async  save(){
      let params = {
        endpoint:'/lk/manager/clients/pricetype/'+this.$route.query.type,
        params:{
          file:this.file
        }

      }

      const result = await this.$store.dispatch('api/post', params)

    if(result.error == false)
    {
      this.load()
    }


    },

    async  clearDisplay(){
      let params = {
        endpoint:'/lk/manager/clients/pricetype/'+this.$route.query.type + '?show_all=true',
        params:{

        }

      }

      const result = await this.$store.dispatch('api/post', params)
      if(result.error ==false)
        this.load()
    }

  }


}
</script>

<style scoped>

</style>