<template>
<section class="promotion_items">
  <div class="promotion__header">
    <h4>Предложения по сферам деятельности</h4> 
    <div class="navigation">

      <div @click="toLeft" class="arrow_left" v-html="$store.state.icons.arrow"></div>
      <div @click="toRight" class="arrow_right" v-html="$store.state.icons.arrow"></div>
    </div>
  </div>

  <div  class="promotion__block buisness_items  content_block" :style="items_block_style" >
   <div class="item" v-for="(item, index) in items" :style="item_style">
    <div class="item_image" :style="'background-image: url(' + item.image + ')'">
        <div class="description">
          {{item.name}}
        </div>
    </div>
   </div>

  </div>




</section>
</template>

<script>
export default {
  name: "BuisnessType",
  data(){
    return{
      items:[
        {name:'Образовательные учреждения', link:'/promo/business/school', image:'/files/client/images/business_type/school.jpg'},
        {name:'Медицинские учреждения', link:'/promo/business/school', image:'/files/client/images/business_type/medecine.jpg'},
        {name:'Гостиницы и рестораны', link:'/promo/business/school', image:'/files/client/images/business_type/horeka.jpg'},
        {name:'Сфера услуг', link:'/promo/business/school', image:'/files/client/images/business_type/uslugi.jpg'},
        {name:'Бизнес центры', link:'/promo/business/school', image:'/files/client/images/business_type/buisness-centr.jpg'},
        {name:'Промышленные предприятия', link:'/promo/business/school', image:'/files/client/images/business_type/stroitelstvo.jpg'},
        {name:'Предприятия розничной торговли', link:'/promo/business/school', image:'/files/client/images/business_type/horeka.jpg'},
        {name:'Финансовые учреждения и страховые компании', link:'/promo/business/school', image:'/files/client/images/business_type/finance.jpg'},
        {name:'Логистические центры', link:'/promo/business/school', image:'/files/client/images/business_type/logistic.jpeg'},
        {name:'Спортивные и культурные учреждения, медиа', link:'/promo/business/school', image:'/files/client/images/business_type/fitness.jpg'},
        {name:'Предприятия сферы ЖКХ', link:'/promo/business/school', image:'/files/client/images/business_type/stroitelstvo.jpg'},
        {name:'Социальная сфера', link:'/promo/business/school', image:'/files/client/images/business_type/uslugi.jpg'},
        {name:'Недвижимость и строительство', link:'/promo/business/school', image:'/files/client/images/business_type/stroitelstvo.jpg'},
        {name:'Автосалоны, автомойки, детейлинг', link:'/promo/business/school', image:'/files/client/images/business_type/autosaloon.jpg'},
        {name:'Логистические центры', link:'/promo/business/school', image:'/files/client/images/business_type/logistic.jpeg'},
        {name:'Спортивные и культурные учреждения, медиа', link:'/promo/business/school', image:'/files/client/images/business_type/fitness.jpg'},
        {name:'Предприятия сферы ЖКХ', link:'/promo/business/school', image:'/files/client/images/business_type/stroitelstvo.jpg'},
        {name:'Социальная сфера', link:'/promo/business/school', image:'/files/client/images/business_type/uslugi.jpg'},
        {name:'Недвижимость и строительство', link:'/promo/business/school', image:'/files/client/images/business_type/stroitelstvo.jpg'},
        {name:'Автосалоны, автомойки, детейлинг', link:'/promo/business/school', image:'/files/client/images/business_type/autosaloon.jpg'},
        {name:'Предприятия сферы ЖКХ', link:'/promo/business/school', image:'/files/client/images/business_type/stroitelstvo.jpg'},
        {name:'Социальная сфера', link:'/promo/business/school', image:'/files/client/images/business_type/uslugi.jpg'},
        {name:'Недвижимость и строительство', link:'/promo/business/school', image:'/files/client/images/business_type/stroitelstvo.jpg'},
        {name:'Автосалоны, автомойки, детейлинг', link:'/promo/business/school', image:'/files/client/images/business_type/autosaloon.jpg'},

      ],
      margin:0,
      block_width:860,
      block_padding:5,
      block_in_page:5,
      step:1,
      test:0
    }
  },
  computed:{
    items_block_style(){


      let margin = 'margin-left: -'+ this.margin + 'px'
      return 'width: ' + this.max_block_width+'px; '+ margin

    },
    max_block_width(){

      return (this.item_width()+ this.block_padding*2)*((this.items).length/2)+20
    },

    item_style(){
      let width = this.item_width();
      let height = 200/(300/width)
      return 'width: ' + width + 'px; height: ' + height + 'px;'

    }

  },

  methods:{
    toLeft(){
      this.margin = 0;
      this.step = 1
    },

    item_width(){
      let width = (this.block_width/this.block_in_page)-(this.block_padding*2)

      return width
    },

    toRight(){
      let step = (this.item_width()+this.block_padding*2)*this.block_in_page
      let max_margin = (((this.items).length/2)/5)*step


      if((this.margin+step)<this.max_block_width-step) {
        this.margin = this.margin + step
        this.step++
      }
      else {
        let last_item = (this.items).length/2 - Math.floor(((this.items).length/2)/this.block_in_page)*this.block_in_page


        if(this.step<Math.ceil(((this.items).length/2)/this.block_in_page)) {
          this.step++
          this.margin = this.margin + last_item * this.item_width()
        }

      }

      this.test = this.step
    }


  }

}
</script>

<style scoped>
.t_row{
  display: table-row;
}
.t_column{
  display: table-column;
}



.promotion_items{
  margin-top: 20px;
  grid-column-start: 1;
  grid-column-end: 4;
  width: 860px;
  overflow: hidden;
  margin-left: 0px;
  padding: 0px;
  padding-left: 10px;
}
.buisness_items{
  transition-duration: 0.5s;
  padding-right: 10px;
}
.item, .item1,.item2{


  display: inline-flex;
  padding: 5px;
  vertical-align: middle;
}
.item_image{
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  transition: 0.5s ease-in;
  box-shadow: 0px 0px 8px 4px rgba(34, 60, 80, 0.2);
}
.item_image:hover{
  cursor: pointer;
  transform: scale(1.05);
  transition: 0.5s ease-in;
}

.description{
  background-color: rgba(0,0,0, .6);
  align-self: flex-end;
 /* height: 2.5rem;*/
  width: 100%;
  color:white;
  text-align: center;
  margin-top: auto;
}

.promotion__header{
  display: block;
  align-items: center;
  width: 100%;
}
.promotion__header h4{
  float: left;
}
.promotion__header .navigation{
  display: inline-flex;
  padding-top: 5px;
  float: right;
  margin-top: 10px;
}
.arrow_left:hover, .arrow_right:hover{
  cursor: pointer;
}
.promotion__block{
  clear: both;
}
</style>