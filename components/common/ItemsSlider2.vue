<template>

  <section class="products_slider" v-if="2==2">
     <div class="products_header">
       <h4>{{name}}</h4>
       <div class="navigation">
         <div @click="toLeft(); stopTimer();" class="arrow_left arrow_hovered" v-html="$store.state.icons.arrow" :class="[step==1?'stop':'']"></div>
         <div @click="toRight(); stopTimer();" class="arrow_right arrow_hovered" v-html="$store.state.icons.arrow" :class="[step==item_pages?'stop':'']"></div>
       </div>
     </div>
     <div class="products_block ">
       <div class="products_line" :style="items_margin+ '; width: '+line_width + 'px;'+ 'transition-delay:'+ delay + 's'">
         <div v-if="item_rows==2" class="product_item" v-for="item in items" :style="'width: '+ item_width + 'px;' + item_height">
           <nuxt-link :to="item.link + '?name=' + item.name" class="std_link" :style="itemImage(item.image) + with_border">
             <div class="products_name">
               {{item.name}}
             </div>
           </nuxt-link>
         </div>

         <div v-if="item_rows==1"  class="product_item one_line" v-for="item in items" :style="'width: '+ item_width + 'px;' + item_height">
           <nuxt-link :to="item.link + '?name=' + item.name" class="std_link" :style="itemImage(item.image) + with_border">

             <div class="products_name"   v-if="names==true">
               {{item.name}}
             </div>
           </nuxt-link>
         </div>


       </div>

       <div class="products_line" :style="'; width: '+line_width + 'px;'+ 'transition-delay:'+ delay + 's'" v-if="2==3">
         <div class="empty_item" v-for="item in item_count" :style="'width: '+ item_width + 'px; border-radius:7px' ">
           <nuxt-link to="/" class="std_link" :style="  with_border">
             <div class="products_name"  :style="'height: '+ item_width + 'px' ">

             </div>
           </nuxt-link>




         </div>
       </div>

     </div>

  </section>
  <section v-else>
    <pre>
      {{items}}

    </pre>


  </section>
</template>

<script>
export default {
  name: "ItemsSlider2",
  props:[
    'data_arr',  'transition_delay'
  ],
  data(){
    return{
      temp_items:[
        {name:'...', image:'', link:''},
        {name:'...', image:'', link:''},
        {name:'...', image:'', link:''},
        {name:'...', image:'', link:''},


      ],
      names:true,
      loaded:true,
      step:1,
      items:false,
      item_count:4,
      item_pages:1,
      item_rows:1,
      name:'',
      height:'',
      margin:0,
      border:true,
      delay:0,
      list_timer:{},
      list_timer_timeout:117000,
      list_timer_kuda:true,
      block_height: 300,
      test:{},
      current_items:0,
      type:'items',
      size:'contain',
      position:'center'

    }
  },
  computed:{
    item_width(){
      return Math.ceil(1200/this.item_count);
    },
    items_in_line(){
      return Math.ceil(Object.keys(this.items).length/this.item_rows);
    },

    items_margin(){
      return 'margin-left: -'+ this.margin + 'px'
    },
    line_width(){

      return this.item_width*this.items_in_line
    },
    item_height(){
      let k = this.item_rows == 1? 1.3: 1
      let height = (this.block_height/this.item_rows)/k

      if(typeof this.data_arr.height != "undefined")
        return '; height: ' + this.data_arr.height + 'px'
      else
        return '; height: ' + height + 'px'


    },
    last_page_items(){
      let temp = this.items_in_line - Math.floor(this.items_in_line/this.item_count)*this.item_count
      return temp
    },
    next_page_items(){
      let temp = (this.step+1)*this.item_count - this.items_in_line
      if(temp<=0)
        return this.item_count
      else
        return this.item_count - temp
    },

    with_border(){
      return this.border == false? ';border-radius: 0;': 'border-radius: 7px;'
    }
  },
  watch:{

    data_arr(newVal){
      if(newVal!= false && newVal!= undefined ) {
        this.loaded = true
        this.items = this.data_arr.items
        this.item_count = this.data_arr.cols
        this.item_rows = this.data_arr.rows
        this.name = this.data_arr.name
        this.names = this.data_arr.names
        if(this.data_arr.size != 'undefined')
          this.size = this.data_arr.size;
        if(this.data_arr.position != 'undefined')
          this.position = this.data_arr.position;

        this.loadItems()
      }
    }

  },
  mounted() {
  /*  if(this.items == false)
      this.items = this.temp_items*/
    //  if(this.data.type == 'type')
        this.type = 'items'

       this.items = this.data_arr.items

      this.item_count = this.data_arr.cols
      this.item_rows = this.data_arr.rows
      this.name = this.data_arr.name
    this.names = this.data_arr.names
    if(this.data_arr.size != 'undefined' && this.data_arr.size)
      this.size = this.data_arr.size;
    if(this.data_arr.position != 'undefined' && this.data_arr.position)
      this.position = this.data_arr.position;


    this.loadItems()


  },

  methods:{

    stopTimer() {

      clearInterval(this.list_timer)
    },
    itemImage(image){
   //   let size = 'width: ' + (this.item_width - 2) + 'px;' + 'height: ' + (this.item_width - 2) + 'px;'
      let img = 'background-position: ' + this.position + ';'+' background-size: ' + this.size + ';'

      return 'background-image: url(' + image + '); ' + img //+ size;
    },
    blockSize(){
      return 'width: ' + (this.item_width - 2) + 'px;' + 'height: ' + (this.item_width - 2) + 'px;'
    },
     loadItems(){
       this.item_pages = Math.ceil((Object.keys(this.items).length/this.item_rows)/this.item_count)


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

      this.current_items =  this.step*this.item_count - this.items_in_line
      if(this.current_items<=0)
        this.current_items = this.item_count
      else
        this.current_items = this.item_count - this.current_items


      var margin = this.item_width*this.current_items


      if((this.margin - margin)>=0)
      {
        this.margin = this.margin - margin
        this.step--
      }

    },
    toRight(){
    //  var margin = this.item_width*this.item_count
      this.current_items =  (this.step+1)*this.item_count - this.items_in_line
      if(this.current_items<=0)
        this.current_items = this.item_count
      else
        this.current_items = this.item_count - this.current_items

      var margin = this.item_width*this.current_items


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
  width: 1200px;
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

  display: flex;
  flex-wrap: wrap;
  transition: margin-left 0.5s ease-in;

  text-align: center;
}


.product_item{
  display: flex;



}
.product_item a {
  display: flex;
  width: 100%;
 /* box-shadow: 0px 0px 8px 4px rgb(34 60 80 / 20%);*/
  overflow: hidden;
  background-repeat: no-repeat;
/*  background-position: center;*/
  background-size: contain;
  background-size: 100% auto;
  margin: 5px;

}
.one_line.product_item a{

  background-size: contain;
  background-position: 0 30px;
/*  background-position: center;*/
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

  align-self: flex-end;

 /* border: 1px solid var(--base-color);
  border-radius: 7px;*/
 /* background: linear-gradient(var(--base-color-o07), 30%, var(--base-color-o07));*/
  color: black;

  font-size: 1.1rem;

}
.one_line.product_item .products_name{

}

.products_header{
  display: block;
  padding: 10px 25px 10px 1px;
  margin-top: 10px;
  height: 30px;
  margin-bottom: -7px;
}
.products_header h4{
  float: left;
  font-size: 1.4rem;
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
.stop{
  cursor: not-allowed;
  cursor: no-drop;
}
</style>