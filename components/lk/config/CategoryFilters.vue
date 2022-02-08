<template>
  <section>

    <div class="">
      <label>Выбрать категорию фильтров</label>
      <div class="input__field">
        <select  v-model="cat1">
          <option v-for="(cat_1, index) in categories" :value="index">{{index}}</option>
        </select>
        <select  v-model="cat2">
          <option v-for="(cat_2, index2) in categories[cat1]" :value="index2" >{{index2}}</option>
        </select>
        <select  v-model="cat3"  v-if="cat1!=false && cat2!=false" >
          <option v-for="(cat_3, index3) in categories[cat1][cat2]" :value="index3">{{index3}}</option>
        </select>
      </div>

    </div>

    <div class="list">
      <table class="table">
        <thead>
        <tr>
          <th>Название</th>
          <th>Переименование</th>
          <th>Скрыть</th>
          <th>Вес (больше - выше)</th>

        </tr>
        </thead>
        <tbody>
        <tr v-for="(prop, guid) in filters">
          <td>{{prop.name}}</td>
          <td><input type="text" v-model="filters[guid].alias"></td>
          <td><input type="checkbox" v-model="filters[guid].hide"></td>
          <td><input type="number" v-model="filters[guid].weight"></td>

        </tr>
        <tr>
          <td colspan="4">
            <button class="btn-std" @click="saveFilters">Сохранить</button>
          </td>

        </tr>
        </tbody>


      </table>

      <hr v-if="show_cat!=false && cat3==category3">

      </div>



  </section>
</template>

<script>
export default {
  name: "CategoryFilters",
  data() {
    return {
      filters:{},
      categories:{},
      edit_filter:{},
      cat1:false,
      cat2:false,
      cat3:false,
      show_cat:false

    }
  },
  watch:{
    cat1(newVal){
      if(newVal!=false && newVal!='')
      {
          this.cat2 = (Object.keys(this.categories[newVal]))[0]
      }
    },
    cat2(newVal){
      if(newVal!=false && newVal!='')
      {
        this.cat3 = (Object.keys(this.categories[this.cat1][this.cat2]))[0]
      }
    },



cat3(newVal){
      if(newVal!=false)
        this.fetchFilters()
    }

  },

  async fetch(){
    const result = await this.$store.dispatch('api/get', {endpoint:'config/filters?category=false'})


    if(result.error == false)
    {
      this.categories = result.body
      this.cat1 = (Object.keys(this.categories))[0]




    }

  },
  mounted() {
  },
  methods: {

    async saveFilters() {
      let params = {
      endpoint: 'config/filters',
        params:{
        props:JSON.stringify(this.filters)
        }

      }
      const result = await this.$store.dispatch('api/post', params)


    },

      async fetchFilters(){

      let cat = this.categories[this.cat1][this.cat2][this.cat3]


      const result = await this.$store.dispatch('api/get', {endpoint:'config/filters?category='+ cat})


      if(result.error == false)
      {
        this.filters = result.body

        for (var key in result.body)
        {
          this.filters[key] = result.body[key]
          this.filters[key]['hide'] = (this.filters[key]['hide'] == 'false' || this.filters[key]['hide'] == false)?false:true;

        }


      }

    },

  }


}
</script>

<style scoped>
.label_checkbox:hover{
  cursor: pointer;
}
ul>li>ul>li{
  margin-left: 30px;
}
h3, h4{
  cursor: pointer;
}
.list >div >div, .list >div >div >div{
  margin-left: 30px;
}

</style>