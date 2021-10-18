<template>
  <section class="products_slider">
    <div class="products_header">
      <h4>SMART Сервисы</h4>
      <div class="navigation">
        <div @click="toLeft(); stopTimer();" class="arrow_left arrow_hovered" v-html="$store.state.icons.arrow"></div>
        <div @click="toRight(); stopTimer();" class="arrow_right arrow_hovered" v-html="$store.state.icons.arrow"></div>
      </div>
    </div>

    <div class="products_block content_block">

      <div class="products_line" :style="items_margin" v-if="loaded">
          <div class="product_item" v-for="item in items" :style="'width: '+ item_width + 'px'">
            <nuxt-link :to="'/catalog/item/'+item.code" class="std_link">
              <div class="products_image" :style="itemImage(item.image)" >

              </div>
              <div class="products_name">
                {{item.name}}
              </div>
              <div class="product_price">
                {{item.price | price}}
              </div>
            </nuxt-link>
          </div>
      </div>

      <div class="products_line" :style="items_margin" v-else>
        <div class="empty_item" v-for="item in items" :style="'width: '+ item_width + 'px'">

            <div class="products_image" :style="itemImage(item.image)" >

            </div>
            <div class="products_name" >

            </div>
            <div class="product_price">
            </div>

        </div>
      </div>

    </div>




  </section>



</template>

<script>
export default {
  name: "ProductsSlider",
  data(){
    return{
      items:[
        {name:'...', code:'', image:'', price:''},
        {name:'...', code:'', image:'', price:''},
        {name:'...', code:'', image:'', price:''},
        {name:'...', code:'', image:'', price:''},
        {name:'...', code:'', image:'', price:''},

      ],
      loaded:false,
      step:1,
      item_count:5,
      item_pages:1,
      margin:0,
      list_timer:{},
      list_timer_timeout:5000,
      list_timer_kuda:true
    }
  },
  computed:{
    item_width(){
      return Math.ceil(870/this.item_count);
    },
    items_margin(){
      return 'margin-left: -'+ this.margin + 'px'
    },
  },
  mounted() {
    this.loadItems()
    this.list_timer = setInterval(()=>{
      if(this.step == this.item_pages)
        this.list_timer_kuda = false
      if(this.step == 1)
        this.list_timer_kuda = true

      if(this.step < this.item_pages && this.list_timer_kuda == true)
        this.toRight()
      else if( this.step <= this.item_pages && this.list_timer_kuda == false)
        this.toLeft()
    }, this.list_timer_timeout)
  },

  methods:{
    stopTimer() {

      clearInterval(this.list_timer)
      },
    itemImage(image){
      let size = 'width: ' + (this.item_width - 2) + 'px;' + 'height: ' + (this.item_width - 2) + 'px;'
      return 'background-image: url(' + image + '); '+ size;
    },
    async loadItems(){
      var response = await this.$store.dispatch('api/get', {endpoint:'shop/promotions/20'})


      this.items = response.body['Средства защиты'].products
      this.item_pages = Math.ceil(Object.keys(this.items).length/this.item_count)
      this.loaded = true

    },
    toLeft(){
      var margin = this.item_width*this.item_count


      if((this.margin - margin)>=0)
      {
        this.margin = this.margin - margin
        this.step--
      }

    },
    toRight(){
      var margin = this.item_width*this.item_count


      if((this.margin + margin)<margin*this.item_pages)
      {
        this.margin = this.margin + margin
        this.step++

      }


    },


    FETCH_DATA_ITEMS2(){


    }




  }


}
</script>

<style scoped>
section{
  width: 870px;
  padding: 0px;
  margin-bottom: 20px;
}

.products_block, .content_block{
  clear: both;
 /* height: 300px; */
  padding: 15px 0 15px 0;
  margin: 0px;
  overflow: hidden;
}


.products_line{

display: inline-flex;
  transition: margin-left 0.5s ease-in;
  text-align: center;
}


.product_item{

}
.product_item:hover{
  transform: scale(1.05);
  transition: 0.3s ease-in;
}

.products_image{
  width: 100px;
  height: 100px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.products_name{
/*border: 1px solid red;*/
  height: 2.3em;
/*  line-height: 2em;*/
  overflow: hidden;
  margin-top: 2px;
  margin-bottom: 2px;
}

.products_header{
  display: block;
  padding: 10px 25px 10px 1px;
  margin-top: 10px;
  height: 30px;
}
.products_header h4{
  float: left;
  font-size: 1.2rem;
  margin: 0;
  padding: 0;
}
.products_header .navigation{
  float: right;
  display: inline-flex;
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin-right: 7px;


}
.product_price{
  font-weight: bold;
  font-size: 1.1rem;
  min-height: 25px;

}
.empty_item{
  opacity: 0.1;

}
.empty_item>.products_image, .empty_item>.products_name, .empty_item>.product_price{
  background-color: grey;
  border-radius: 7px;
  margin: 5px 5px 5px auto;

}
.empty_item.product_price{
  width: 100px;
  margin-right: auto;
}

.empty_item:nth-child(1){
  animation: 2s opacity_animate infinite;
  animation-delay: 0s;
}
.empty_item:nth-child(2){
  animation: 2s opacity_animate infinite;
  animation-delay: 0.4s;
}
.empty_item:nth-child(3){
  animation: 2s opacity_animate infinite;
  animation-delay: 0.8s;
}
.empty_item:nth-child(4){
  animation: 2s opacity_animate infinite;
  animation-delay: 1.2s;
}
.empty_item:nth-child(5){
  animation: 2s opacity_animate infinite;
  animation-delay: 1.6s;
}

@keyframes opacity_animate {
  0%{opacity: 0.1}
  50%{opacity: 0.3}
  100%{opacity: 0.1}
}

</style>