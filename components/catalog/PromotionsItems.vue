<template>
  <section>
    <ul class="breadcrumbs_promotions">
      <li @click="cat1=false;cat2=false; cat3=false; step=1;">Каталог</li>
      <li v-if="cat1!=false" @click="cat2=false; cat3=false; step=2;">&nbsp;/&nbsp;{{cat1}}</li>
      <li v-if="cat2!=false" @click="cat3=false;">&nbsp;/&nbsp;{{cat2}}</li>
      <li v-if="cat3!=false">&nbsp;/&nbsp;{{cat3}}</li>

    </ul>



    <ul class="subcategory">
      <li class="subcategory_item" v-for="(child, category)  in current_categories" @click="select_category(category)" v-if="cat3==false">
        <div class="item">
          <div class="subcategory_item_image" :style="'background-image: url('+child.image+')'"></div>
          <div class="subcategory_item_name">{{ category }}</div>
        </div>
      </li>
    </ul>


    <component v-bind:is="component_type" v-for="item in current_categories.products" :item="item" v-if="cat3!=false"></component>

  </section>
</template>

<script>
import ActionComponentTypeA from "../promo/Sales/ActionComponentTypeA";
import CatalogItemListView from "./CatalogItemListView";
export default {
  name: "PromotionsItems",
  components: {CatalogItemListView, ActionComponentTypeA},
  props:['items', 'type'],
  data() {
    return {
      step:1,
      cat1:false,
      cat2:false,
      cat3:false,
    }
  },
  computed:{
    component_type(){
      if(typeof this.type == "undefined" || !this.type || this.type=='list'){
          return 'CatalogItemListView';
      }
      else if(this.type == 'timer'){
        return 'ActionComponentTypeA';
      }

    },

    current_categories(){
      if(this.cat1 == false)
        return this.items
      else if(this.cat1 !=false && this.cat2 == false)
        return this.items[this.cat1]['child']
      else if(this.cat1 !=false && this.cat2 != false && this.cat3 == false)
        return this.items[this.cat1]['child'][this.cat2]['child']
      else if(this.cat1 !=false && this.cat2 != false && this.cat3 != false)
        return this.items[this.cat1]['child'][this.cat2]['child'][this.cat3]

      //  return this.items
    }

  },
  mounted() {
  },
  methods: {
    select_category(name){

      if(this.step == 1)
        this.cat1 = name;
      if(this.step == 2)
        this.cat2 = name;
      if(this.step == 3)
        this.cat3 = name;
      this.step++

    },


  }


}
</script>

<style scoped>
.breadcrumbs_promotions{
  list-style: none;
  display: inline-flex;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.breadcrumbs_promotions li{
  white-space: nowrap;
}
.breadcrumbs_promotions li:hover{
  cursor: pointer;
  color:var(--base-color);
  transition: 0.3s ease-in-out;
}

.subcategories_block{
  display: flex;


}

.subcategory_item_image{
  width: 150px;
  height: 150px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  margin: 0 auto;
  margin-bottom: 20px;
}

.subcategory_item{
  width: 50%;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 50px;

}
.subcategory_item .item{
  width: 70%;
  text-align: center;
  border-radius: 7px;
  padding: 5px;
  box-shadow: 0 0 5px 2px rgba(0,0,0,0.2);
}

.subcategory_item .item:hover{
  box-shadow: 0 0 5px 7px rgba(0,0,0,0.2);
  cursor: pointer;

}
.subcategory_item_image:hover{


}
.subcategory_item_image:hover{


}

</style>