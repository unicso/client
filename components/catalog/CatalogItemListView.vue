<template>
  <article class="item">
    <section class="item_image" :style="'background-image: url('+ item_image + ')'"  @click="toItem">

    </section>
    <section class="item_description"  @click="toItem">
        <h3>{{item.name}}</h3>
        <span v-if="item.custom==false">Код товара: {{item.code}}</span>
        <div class="desc">
          {{item.description}}
        </div>
    </section>

    <section class="item_price">
      <div class="new_product" v-if="typeof item.new == 'string'"></div>
        <div class="unit"  v-if="$store.state.user.current_price_type!=false" >Цена {{item.price_view}}</div>
        <div class="price" v-if="$store.state.user.current_price_type!=false">{{item.price | price}}</div>
        <div class="buttons">
          <div class="to_basket" v-if="$store.state.user.current_price_type!=false">
            <button class="btn-std add_to_cart" v-if="item_in_basket" disabled>В корзине</button>
            <button class="btn-std add_to_cart base_shadow_hover" v-else @click="addItemToBasket">В корзину</button>
          </div>
          <div class="to_favorite">
            <add-to-favorite  :code="item.code"/>
          </div>
        </div>
    </section>


  </article>
</template>

<script>
import AddToFavorite from "../forms/AddToFavorite";
export default {
  name: "CatalogItemListView",
  components: {AddToFavorite},
  props:[
      'item'
  ],
  data(){
    return{

    }
  },
  computed:{
    item_image(){
      if(typeof this.item.image != "undefined")
      {
        return this.item.image + '/tmb'
      }
    },
    item_in_basket(){
      return this.has(this.$store.state.order.basket.items, this.item.code)
    }

  },
  methods:{
    has(object, key) {
      return object ? hasOwnProperty.call(object, key) : false;
    },
    async  addItemToBasket()
    {
      this.item['count'] = 1
      var uri = 'basket/'+this.item.code + '/' + this.item.count
      var result = await this.$store.dispatch('api/post', {endpoint:uri})
      this.$store.state.order.basket_load_item = true;

    },
    toItem(){
      this.$router.push('/catalog/item/'+ this.item.code)
    //  const result = await this.$store.dispatch('api/get', {endpoint:'shop/item/'+item_id})
    }
  }
}
</script>

<style scoped>
.item{
  margin-top: 15px;
  box-shadow: 0 0 5px 2px rgb(0 0 0/20%);
  border-radius: 10px;
  width: 830px;
  display: inline-flex;
  padding: 10px;
  cursor: pointer;
}
.item_image, .item_description, .item_price{
  margin: 10px;
}
.item_image{
  width: 200px;
  height: 200px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.item_description{
  width: 50%;

}
.item_description span{
  font-size: 0.9rem;
}

.item_description .desc {
  padding: 1rem 0 1rem 0;
  width: 100%;
  height: 5em;
  overflow: hidden;
  position: relative;
}

.item_description .desc:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 40px;
  background: linear-gradient(180deg, transparent, #ffffff 50%);
}

.item_price{
  width: 170px;
}
.item_price .price{
  margin-top: 15px;
  font-size: 1.3rem;
  font-weight: bold;
}
.item_price button{
  width: 150px;
}
.item_price .buttons{
  position: relative;
  top: 10%;
}
.new_product{
  width: 50px;
  height: 50px;
  background-image: url("/files/client/images/labels/новинка.gif");
  background-repeat: no-repeat;
  background-size: contain;
  float: right;
  margin-top: -10px;
  margin-right: -10px;
}
</style>