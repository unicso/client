<template>
<div class="main-block-first">
<header>
  Выгодные предложения
</header>
<main class="content_block">
<ul>


  <li class="promotion_item" v-for="(item, index) in items" :key="index">
   <nuxt-link :to="'/catalog/item/'+item.guid">
      <div class="image">
        <img :src="item.image" >
      </div>
      <div class="name">{{item.name}}</div>
      <div class="price">{{priceSet(item.price)}}</div>

   </nuxt-link>
  </li>

</ul>
</main>
</div>
</template>

<script>
export default {
  name: "ProfitBlock",
  data(){
    return{
      items:{},
      showBlock:false
    }
  },
  mounted() {
    this.loadProfit();



  },

  methods:{
    priceSet(data){

      var price       = Number.prototype.toFixed.call(parseFloat(data) || 0, 2),
          price_sep   = price.replace(/(\D)/g, ","),
          price_sep   = price_sep.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
      return price_sep + ' ₽';
    },

    async loadProfit(){

      var response = await this.$store.dispatch('api/get', {endpoint:'shop/promotions/profit'})

      if(response.body != false){
        this.showBlock = true
        this.items = response.body.profit
      }
    }

  }



}
</script>

<style scoped>
.main-block-first{
  margin-top: 20px;
  grid-column-start: 1;
  grid-column-end: 3;
}
header{
  font-size: 1.3rem;
}
main{
  height: 200px;
  overflow: hidden;
}
.promotion_item img{
  max-width: 120px;
  max-height: 120px;
}
ul {
  display: inline-flex;

}
li{
  padding: 5px 5px 5px 5px;

}
ul{
  padding-left: 5px;
}
.promotion_item .name {

  width: 100%;
  height: 35px;
  overflow: hidden;
  position: relative;
}
li div{
  margin: 0px;
  padding: 0px;
}
.promotion_item .image{
  width: 120px;
  height: 120px;
}
.promotion_item .price{
  font-weight: bold;
}

.promotion_item:hover{
  cursor: pointer;
  border: 1px solid var(--base-color);
  border-radius: 5px;
  transition: 0.1s;
}
</style>