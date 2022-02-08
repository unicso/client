<template>
<section>
  <h2>Категории сайта</h2>
  <h2 class="std_link" :class="{'active':cats_base}" @click="cats_base=true" :active="cats_base">Переименование главных категорий</h2>
  <h2 class="std_link" :class="{'active':!cats_base}" @click="cats_base=false" :active="cats_base">Редактор категорий</h2>

  <div class="catgories" v-if="cats_base">
  <div class="">


    <div class="input__field">
        <label>Выберите категории</label>
        <select  v-model="cat_1">
          <option v-for="(cat1, index) in categories.main" :value="cat1.guid">{{cat1.name}} ({{cat1.weigth}})</option>
        </select>
      </div>

      <div class="input__field">
        <select v-if="cat_1!=false"   v-model="cat_2">
          <option v-for="(cat2, index) in categories.main[cat_1].child"  :value="cat2.guid">{{cat2.name}}</option>
        </select>
      </div>

      <div class="input__field">
        <select v-if="cat_2!=false && cat_1!=false"   v-model="cat_3">
          <option v-for="(cat3, index) in categories.main[cat_1].child[cat_2].child"  :value="cat3.guid">{{cat3.name}}</option>
        </select>
      </div>

  </div>

  <div class="rename "  v-if="cat_1">
    <div class="input__field" v-if="cat_1">
      <label>{{categories.main[cat_1].name}}</label>
      <b @click="form[cat_1]=categories.main[cat_1].name; $forceUpdate(); ">==></b>
      <input type="text" v-model="form[cat_1]">
      <input type="number" v-model="form_weigth[cat_1]" style="width: 60px">

    </div>

    <div class="input__field" v-if="cat_2">
      <label>{{categories.main[cat_1].child[cat_2].name}}</label>
      <b @click="form[cat_2]=categories.main[cat_1].child[cat_2].name; $forceUpdate(); ">==></b>
      <input type="text" v-model="form[cat_2]">
    </div>
    <div class="input__field" v-if="cat_3">
      <label>{{categories.main[cat_1].child[cat_2].child[cat_3].name}}</label>
      <b @click="form[cat_3]=categories.main[cat_1].child[cat_2].child[cat_3].name; $forceUpdate(); ">==></b>
      <input type="text" v-model="form[cat_3]">
    </div>
    <button class="btn-std" @click="save">Сохранить изменения</button>
  </div>
  </div>


  <div class="custom_categories catgories" v-else>
    <h2>Пользовательские категории</h2>
    <div class="create_category">
      <h4>Редактирование/создание категории</h4>
      <div class="input__field">
        <label>Рабочее название</label>
        <input type="text" v-model="new_category.name" >
      </div>
      <div class="input__field">
        <label>Отображаемое название (если не указано то будет отобаржаться рабочее)</label>
        <input type="text" v-model="new_category.alias_name" >
      </div>

      <div class="input__field">
        <label>Родительская категория</label>
        <select v-model="new_category.parent" >
              <option value="0">Корневая категория</option>
              <option v-for="(category, index) in categories_custom.list" :value="category.guid" v-if="category.depth==1 || category.depth==2 ">
                <b v-if="category.depth==2"> -   </b>
                <b v-if="category.depth==3"> - -     </b>
                {{category.name}}
              </option>
        </select>
      </div>
      <div class="input__field">
        <label class="checkbox">Отображать категорию
        <input type="checkbox" v-model="new_category.visible">
        </label>
      </div>
      <div class="input__field">
        <label>Иконка категории</label>
        <div v-if="typeof new_category.icon!= 'undefined'" class="icon_category" :style="'background-image: url('+new_category.icon+')'"></div>
        <button class="btn-std" @click="showLibrary.icon=true">Выбрать файл</button><button class="btn-std" @click="new_category.icon=''; $forceUpdate();">Удалить файл</button>
        <file-library   :onSelect="selectIcon" :show="showLibrary.icon" :name="'icon'"/>

      </div>
      <div class="input__field">
        <label>Изображение категории</label>
        <div v-if="typeof new_category.image!= 'undefined'" class="icon_category" :style="'background-image: url('+new_category.image+'); zoom:3;'"></div>
        <button class="btn-std" @click="showLibrary.image=true">Выбрать файл</button><button class="btn-std" @click="new_category.image=''; $forceUpdate();">Удалить файл</button>
        <file-library   :onSelect="selectImage" :show="showLibrary.image" :name="'image'"/>
      </div>


      <button class="btn-std" @click="createCategory">Сохранить</button>
    </div>
  </div>

  <div class="categories_list" v-if="!cats_base">

          Существующие категории:
          <div class="edit_main_category">
            <select v-model="existed_category">
              <option v-for="(cat1,guid) in categories_custom.main" :value="cat1">{{cat1.name}}</option>
            </select>
            <button class="btn-std"  v-if="existed_category!=false"  @click=" selectCategory(existed_category);   $forceUpdate();">Редактировать главную</button>
          </div>



            <ul>
              <li v-if="typeof existed_category.child!='undefined'" v-for="(cat2,guid2) in existed_category.child">
                <div  @click=" selectCategory(cat2);   $forceUpdate();"> ->  {{cat2.name}}</div>
                <ul>
                  <li v-if="typeof cat2.child!='undefined'" v-for="(cat3,guid3) in cat2.child">
                    <div  @click=" selectCategory(cat3);    $forceUpdate();">->  {{cat3.name}}</div>
                  </li>
                </ul>
              </li>
            </ul>




  </div>

</section>
</template>

<script>
// <option v-for="(category, index) in categories_custom.list" :value="category.guid">{{category.name}}</option>


import FileLibrary from "../../common/library/FileLibrary";
import FileLibraryIcon from "../../common/library/FileLibraryIcon";

export default {
  name: "ConfigCategory",
  components: {FileLibraryIcon, FileLibrary},
  data(){
    return{
      categories:false,
      categories_custom:false,
      search_select:'',
      show_sub:false,
      cat_1:false,
      cat_2:false,
      cat_3:false,
      cats_base:true,
      new_category:{},
      image:false,
      icon:false,
      existed_category:'',
      form:{},
      form_weigth:{},
      showLibrary:{icon:false, image:false},
      test:{}

    }
  },

  watch:{
    image(newVal)
    {
      this.showLibrary.image = false
    },
    icon(newVal)
    {
      this.showLibrary.icon = false
    },
    cat_1(newVal){
      for (var key in this.categories.main[newVal].child)
      {
        this.cat_2 = key
        break
      }
      this.form[newVal] = this.categories.main[newVal].alias_name
      this.form_weigth[newVal] = this.categories.main[newVal].weigth
    },
    cat_2(newVal){
      for (var key in this.categories.main[this.cat_1].child[newVal].child)
      {
        this.cat_3 = key
        break
      }

      this.form[newVal] = this.categories.main[this.cat_1].child[newVal].alias_name

    },
    cat_3(newVal){
      this.form[newVal] = this.categories.main[this.cat_1].child[this.cat_2].child[newVal].alias_name
    }


  },
  mounted() {

  this.loadCategory()

  },

  methods:{
    selectImage(data){
      this.showLibrary = {icon:false, image:false}


     this.image = data
    this.new_category.image = data.url
    },

    selectIcon(data){
      this.showLibrary = {icon:false, image:false}

       this.icon = data
        this.new_category.icon = data.url
    },

    selectCategory(cat)
    {
      this.new_category = {}
      this.new_category.icon=cat.icon;
      this.new_category.image=cat.image;

      this.new_category.visible=(cat.visible=='false'||cat.visible=='0')?false:true;
      this.new_category.name=cat.name;
      this.new_category.alias_name=cat.alias_name;

      this.new_category.parent=cat.parent;
      this.$forceUpdate();
      window.scrollTo(0, 150)


    },
     async   loadCategory(){
        const result = await this.$store.dispatch('api/get', {endpoint:'config/categories'})
       this.categories = result.body.categories
       this.categories_custom = result.body.categories_custom

     },
    toogleSubCat(guid)
    {
      if(guid == this.show_sub)
        this.show_sub = false
      else
        this.show_sub = guid


    },
    async save()
    {


      let params = {
        endpoint:'config/categories',
        params:{
          alias:JSON.stringify(this.form),
          weigth:JSON.stringify(this.form_weigth)
        }
      }

      const result = await this.$store.dispatch('api/put', params)


      this.loadCategory()
      this.$store.dispatch('shop/fetchShopData')

    },
    async createCategory()
    {
      let params ={
        endpoint:'config/categories',
        params:this.new_category

      }
      const result = await  this.$store.dispatch('api/post', params)

      this.test = result.body
      this.loadCategory()
      this.$store.dispatch('shop/fetchShopData')
    }


  },


}
</script>

<style scoped>
.cat2{
  margin-left: 30px;

}
.cat3{
  margin-left: 30px;

}
.main, .sub{
  cursor: pointer;
}
.main{
  font-weight: bold;
}
.sub{
  font-weight: normal;
}
.rename .input__field{
  display: inline-flex;
  width: 100%;

}
.input__field label{
  width: 50%;
}
.rename b {

  margin-right: 20px;
  cursor: pointer;
}
.rename b:hover{

  color:var(--base-color);
  transition: 0.5s ease-in-out;
}
.categories_list > ul > li >ul{
  margin-left: 20px;
  margin-top: 5px;
}
.categories_list > ul > li >ul >li >ul{
  margin-left: 20px;
  margin-top: 5px;
}
h2{

}
.categories_list div:hover{
  cursor: pointer;
  color:var(--base-color);
  transition: 0.2s;
}
.icon_category{
  width: 32px;
  height: 32px;
  border: 1px solid grey;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.checkbox:hover{
  cursor: pointer;
}
.catgories{
  border: 2px dotted var(--base-color);
  padding: 10px ;
}
h2{
  text-decoration: underline;
  cursor: pointer;
}
h2.active{
  color: var(--base-color);

}
.edit_main_category{
  display: inline-flex;
  align-items: baseline;
}
.edit_main_category > *{
  width: 50%;
}
</style>