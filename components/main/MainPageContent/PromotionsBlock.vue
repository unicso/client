<template>
  <div>
  <div class="promotion_items " v-for="(items, index) in promotions" :key="index">
    <header  v-if="typeof items.link!='undefined'">
      <nuxt-link :to="items.link" class="std_link">{{index}}</nuxt-link>
    </header>
    <header v-else>
      {{index}}
    </header>
    <main class="content_block">
      <ul>


        <li class="promotion_item" v-for="(item, index) in items.products" :key="index">
          <nuxt-link :to="'/catalog/item/'+item.code">
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


  </div>
</template>

<script>
export default {
  name: "PromotionsBlock",
  data(){
    return{
      promotions:{}
    }
  },
  mounted() {
    this.loadPromotions()
  },
  methods:{
    priceSet(data){
      var price       = Number.prototype.toFixed.call(parseFloat(data) || 0, 2),
          price_sep   = price.replace(/(\D)/g, ","),
          price_sep   = price_sep.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
      return price_sep + ' ₽';
    },
    async loadPromotions()
    {
      const response = await this.$store.dispatch('api/get', {endpoint:'shop/promotions/20'})
      if(response.body !=  false)
      {
        this.promotions = response.body
      }

    }

  }



}
</script>

<style scoped>
.promotion_items{
  margin-top: 20px;
  grid-column-start: 1;
  grid-column-end: 4;
}

.content_block{
  margin-left: 0px;
}
.main-block-first{
  margin-top: 20px;
  grid-column-start: 1;
  grid-column-end: 3;
}

main{
 /* height: 260px;*/
  overflow: hidden;
}

ul {
  display: inline-flex;
  width: 100%;
  justify-content: space-between;
  padding-left: 5px;
}
li{
  padding: 5px 5px 5px 5px;
}
.promotion_item .name {

  width: 100%;
  max-width: 200px;
  height: 34px;
  overflow: hidden;
  position: relative;
}
li div{
  /*margin: 0px;*/
  padding: 0px;
}

.promotion_item .price{
  font-weight: bold;
}

.promotion_item:hover{
  cursor: pointer;
  border: 1px solid rgb(255,73,0);
  border-radius: 5px;
  transition: 0.1s;
}
header{
  margin-bottom: 10px;
}
.promotion_item:nth-child(n+5){
display: none;
}

.image{
  min-height: 200px;

}
@media screen and (max-width: 480px){
  .image{
    min-height: 70px;

  }
}
</style>