<template>
<section class="search">
 <div class="search_field">
   <label v-html="$store.state.icons.search" class="search_loop"></label>
   <input type="text" class="search_string" v-model="search" @keyup.enter="$router.push('/catalog/search?search='+search)" placeholder="Введите название или код товара">
   <div class="close" @click="search=''" v-if="search.length>2"></div>
   <div class="search_button btn-std std_link" @click="$router.push('/catalog/search?search='+search)">Найти</div>
 </div>
  <div class="dropdown_results content_block" v-if="result!=false && error==false">
    <div class="search_result">
      <li class="all_results">
        <nuxt-link :to="'/catalog/search?search='+search" class="default__link">Показать все результаты ({{result['counts'].products}})</nuxt-link>
      </li>

      <ul class="categories_list">
        <li class="category__link" v-for="(cef,name) in result.categories"
            v-if="result.keywords.hasOwnProperty(cef)"
            @click="searchWithCategory(result.keywords[cef].keyword, cef)">
          {{result.keywords[cef].keyword}} &mdash;  &nbsp; <b  class="default__link">{{name}}</b> ({{result['counts'][cef]}})
        </li>

      </ul>
      <ul>
        <li>Результаты поиска:</li>

        <li  v-for="item in result.products">
          <div class="item">
            <nuxt-link class="default__link" :to="'/catalog/item/'+ item.code">{{item.name}}</nuxt-link>

          </div> <div class="dott">...</div>
          <div class="category">
            {{item.category}}

          </div>
        </li>

      </ul>
    </div>
  </div>
  <div class="empty_result content_block" v-else-if="result!=false && error==true && 2==3">
    <h3>Извините, совпадений не найдено.</h3>

  </div>
</section>
</template>

<script>
export default {
  name: "SearchField",
  data(){
    return{
      search:'',
      result:false,
      error:false,
      search_width_category:''
    }
  },

  watch:{
    search(newVal){
      if(newVal.length>2)
      {
        this.searchItems()
      }
      else{
        this.result = false
      }
    },
   '$route.fullPath'(){

     this.result = false

   }

  },

  methods:{

    async searchItems(){
      let params = {
        endpoint: 'shop/search?search=' + this.search + '&short=true'
      }
      const result = await this.$store.dispatch('api/get', params)
      if(result.error == false)
      {

        this.result = result.body

        this.error = false;
      }
      else
      {
        this.result = 'Извините, совпадений не найдено';
        this.error = true;
      }
    },

    searchWithCategory(word, category){
      this.search_width_category = '?search=' + word + '&category=' +category

      this.$router.push('/catalog/search' + this.search_width_category)

    }

  }


}
</script>

<style scoped>

.search_loop{
  position: absolute;
  margin-top: 2px;

}
.search_string{
  width: inherit;
  margin: 0;

}
.dropdown_results{
  position: absolute;
  height: 300px;
  overflow-y: scroll;

  width: inherit;
  margin: 0;
  padding: 0;
  z-index: 500;
}
.search_result{
  padding: 10px;
}
li{
  padding-bottom: 5px;

  white-space: nowrap;
  display: flex;
}
li .item{
  width: 250px;
  overflow: hidden;
  align-self: center;
}
li > div{
  display: inline-flex;
}
.dott{

}
.category{
  width: 250px;
  white-space: initial;
}
.all_results,.categories_list{
  border-bottom: 1px solid rgba(0,0,0,0.3);
  margin-bottom: 10px;
}
.default__link{
  width: inherit;
  font-weight: normal;
  color: blue;
}
li:hover{
  background-color: var(--base-color-o02);
}
.empty_result{
  height: 50px;
  padding: 0;
  margin: 0;
  position: absolute;
  z-index: 300;
  width: inherit;
}
.empty_result h3{
  padding: 10px;
  margin: 0;
}
.btn__close{
  display: inline-flex;
}
.search_field{
  width: inherit;
  display: inline-flex;
}
.search_field input{
padding: 9px;
  padding-left: 40px;

}
.search_field .close{
}
.close {
  font-size: 1.3em;
  position: relative;
  text-align: center;
  transform: translate(-85px, -3px);
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: -17px;
}
.close:before{
  content:"\2715"
}
.btn-std{
  width: 60px;
  margin-top: 2px;
  margin-left: -78px;
  border: none;
  border-radius: 0;

  background-color: var(--base-color);
  border-left: 1px solid grey;
  color: white;
  border-radius: 0 4px 4px 0;
}
.btn-std:hover{

}

</style>