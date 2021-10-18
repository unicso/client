<template>
  <section class="products_slider">
    <div class="products_header">
      <h4>{{name}}</h4>
      <div class="navigation">
        <div @click="toLeft(); stopTimer();" class="arrow_left arrow_hovered" v-html="$store.state.icons.arrow"></div>
        <div @click="toRight(); stopTimer();" class="arrow_right arrow_hovered" v-html="$store.state.icons.arrow"></div>
      </div>
    </div>

    <div class="products_block content_block">

      <div class="products_line" :style="items_margin" v-if="loaded">
        <div class="product_item" v-for="item in items" :style="'width: '+ item_width + 'px;' "
        >
          <nuxt-link :to="item.link" class="std_link" :style="itemImage(item.image)">

            <div class="products_name">
              {{item.name}}
            </div>

          </nuxt-link>
        </div>
      </div>

      <div class="products_line" :style="items_margin" v-else>
        <div class="empty_item" v-for="item in items" :style="'width: '+ item_width + 'px' ">

          <div class="products_image" :style="itemImage(item.image)" >

          </div>
          <div class="products_name" >

          </div>


        </div>
      </div>

    </div>




  </section>



</template>

<script>
export default {
  name: "ItemsSlider",
  props:[
    'items', 'name'
  ],
  data(){
    return{
      temp_items:[
        {name:'...', image:'', link:''},
        {name:'...', image:'', link:''},
        {name:'...', image:'', link:''},
        {name:'...', image:'', link:''},
        {name:'...', image:'', link:''},

      ],
      loaded:false,
      step:1,
      item_count:4,
      item_pages:1,
      item_rows:1,
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
  watch:{
    items(newVal){
      if(newVal!= false) {
        this.loaded = true
        this.loadItems()
      }
    }

  },
  mounted() {
  /*  if(this.items == false)
      this.items = this.temp_items*/

  },

  methods:{

    stopTimer() {

      clearInterval(this.list_timer)
    },
    itemImage(image){
   //   let size = 'width: ' + (this.item_width - 2) + 'px;' + 'height: ' + (this.item_width - 2) + 'px;'
      return 'background-image: url(' + image + '); ' //+ size;
    },
    blockSize(){
      return 'width: ' + (this.item_width - 2) + 'px;' + 'height: ' + (this.item_width - 2) + 'px;'
    },
     loadItems(){
       this.item_pages = Math.ceil(Object.keys(this.items).length/this.item_count)
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


    FETCH_DATA_ITEMS(){


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
  display: flex;
  height: 200px;


}
.product_item a {
  display: flex;
  width: 100%;
  box-shadow: 0px 0px 8px 4px rgb(34 60 80 / 20%);
  border-radius: 7px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin: 5px;
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
  width: 100%;
  margin-top: 2px;
 border-radius: 0 0 7px 7px ;
  align-self: flex-end;
  background-color: rgba(0,0,0,0.5);
  color: white;
  font-size: 1.1rem;
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