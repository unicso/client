<template>
  <section>
    <h2>Добавление товара</h2>

    <div class="exist_products">
      <h4>Добавление по ссылке</h4>
      <div class="input__field" style="width: 300px">
        <label>Сайт</label>
        <select v-model="from">
          <option value="https://eli-opt.ru/">https://eli-opt.ru/</option>
          <option value="https://komus.ru/">https://komus.ru/</option>

        </select>
        <a :href="from" target="_blank" class="default__link">Ссылка {{from}}</a>
      </div>
      <div class="input__field">
        <label>Ссылка на товар</label>
        <input type="text" v-model="link">
      </div>
      <button @click="fillFromLink">Заполнить</button>
    </div>

    <div class="new_product">
      <div class="new_image" v-if="typeof new_product.image != 'undefined'" :style="'background: url('+new_product.image+')'">

      </div>
      <div class="input__field">
        <label>Название товара</label>
        <input type="text" v-model="new_product.name">
      </div>
      <div class="input__field">
        <label>Описание</label>
        <textarea type="text" v-model="new_product.description"/>
      </div>
      <div class="input__field">
        <label>Цена</label>
        <input type="number" step="0.01" v-model="new_product.price"/>
      </div>
      <div class="input__field">
        <label>Ед. изм.</label>
        <input type="text"  v-model="new_product.view" placeholder="например, за шт"/>
      </div>
      <div class="input__field">
        <label>Ссылка на товар (необязательно)</label>
        <input type="text" step="0.01" v-model="new_product.link"/>
      </div>
      <div class="input__field" style="border: 1px solid grey; padding: 10px">
        <label>Категория товара</label>
        <br>
        <label>Корневая категория</label>
        <select v-model="cat1">
          <option v-for="(cat_1, index) in categories" :value="index" v-if="cat_1.depth=='1'">{{cat_1.name}}</option>
        </select>
        <label>Категория 2 уровна</label>
        <select v-model="cat2">
          <option v-for="(cat_2, index) in categories" :value="index" v-if="cat_2.depth=='2' && cat_2.parent==cat1">{{cat_2.name}}</option>
        </select>

        <label>Категория товара</label>
        <select v-model="new_product.category">
          <option v-for="category in categories" :value="category.guid" v-if="category.depth==3 && category.parent==cat2">{{category.name}}</option>
        </select>
      </div>
      <div class="input__field">
        <label class="checkbox">Отображать товар
          <input type="checkbox" v-model="new_product.visible">

        </label>
      </div>
      <button class="btn-std" @click="showLibrary=true">Выбрать файл</button>
      <file-library :onSelect="selectImage" :show="showLibrary"/>
      <br>
    <button @click="createItem" class="btn-std">Сохранить</button>
    </div>
    <div class="">

      <table class="table">
        <thead>
        <tr>
          <td>Название</td><td>Отображать</td><td>Категория</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(product, index) in products" @click="selectProduct(product); $forceUpdate(); ">
          <td>{{product.name}}</td><td>{{product.visible}}</td>
          <td >
            <span v-if="typeof categories[product.category]!= 'undefined'">{{categories[product.category].name}}</span>

          </td>

        </tr>

        </tbody>
      </table>


    <pre>{{new_product}}</pre>
      <pre>{{categories}}</pre>

    </div>
  </section>
</template>

<script>
import FileLibrary from "../../common/library/FileLibrary";
export default {
  name: "ConfigProduct",
  components: {FileLibrary},
  data() {
    return {
      new_product:{view:'за шт.'},
      showLibrary:false,
      new_image:false,
      newcat:false,
      categories:false,
      products:{},
      checkbox:false,
      from:'https://komus.ru/',
      link:'',
      cat1:false,
      cat2:false

    }
  },
  watch:{





  },
  mounted() {
    this.loadCategory()
    this.loadProducts()
  },
  methods: {
   async fillFromLink()
    {
      let endpoint = 'config/products?unicsod2='+ this.from +'&link=' + this.link;

      const result = await this.$store.dispatch('api/get', {endpoint:endpoint})

      if(result.error == false)
      {
        this.new_product.name = result.body.name
        this.new_product.description = result.body.description
        this.new_product.price = result.body.price
        this.new_product.visible = true




        this.new_product.image = result.body.image
        this.new_product.link = this.link

        this.$forceUpdate()
      }



    },

    selectProduct(item)
    {
      this.new_product.name = item.name
      this.new_product.description = item.description
      this.new_product.price = item.price
      this.new_product.view = item.view

      this.new_product.link = item.link
      this.new_product.category = item.category
      this.new_product.image = item.image
      this.new_product.visible = item.visible

      if(item.visible !='0' || item.visible =='true') {
        this.new_product.visible = true
        this.checkbox = true
      }
      else {
        this.new_product.visible = false;
        this.checkbox = false
      }

    if(typeof this.categories[item.category]!= "undefined")
    {

      let cat2 = this.categories[item.category].parent;
      let cat1 = this.categories[cat2].parent

      this.cat1 = cat1
      this.cat2 = cat2
    }






    },
    async createItem(){
      let params = {
        endpoint:'config/products',
        params:this.new_product

      }
      const result = await  this.$store.dispatch('api/post', params)

     // this.new_product = {}
      this.loadProducts()
      this.$store.dispatch('shop/fetchShopData')

    },
    async loadCategory()
    {
      const result = await this.$store.dispatch('api/get', {endpoint:'config/categories'})

      this.categories = result.body.categories_custom.list

    },
    async loadProducts(){
      const result = await this.$store.dispatch('api/get', {endpoint:'config/products'})

      this.products = result.body

    },
    selectImage(data){
      this.new_product.image= data.url
      this.new_product.image_file= data.file

      this.showLibrary = false
    }

  }


}
</script>

<style scoped>
.exist_products{
  border: 3px solid grey;
  padding: 20px;


}


 .new_image{
    background-size: contain !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    width: 200px;
    height: 200px;

  }
 .checkbox:hover{
   cursor: pointer;
 }
 .product_exists li{
   display: inline-flex;
   width: 80%;
 }
 .product_exists li div:last-child{
   justify-self: end;

 }
</style>