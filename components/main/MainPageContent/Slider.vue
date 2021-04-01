<template>
<div class="main_page_slider">
  <div class="slider" >

    <div class="slide_current" :style="'background-image: url('+slide_image_current+')'"
         :class="[change?'slide__out':'']"  @click="sliderLink(slide_text[slide].link)">

      <div class="slide_text" :class="'text_'+slide_text[slide].color">
        {{slide_text[slide].text}}
      </div>


    </div>


    <div class="slide_next" :style="'background-image: url('+slide_image_next+')'"
         :class="[change?'slide__in':'']">
      <div class="slide_text"  :class="'text_'+slide_text[slide_next].color">
        {{slide_text[slide_next].text}}
      </div>
    </div>

  </div>
</div>
</template>

<script>
export default {
  name: "Slider",
  data(){
    return{
      show:true,
      slide:0,
      slide_next:1,
      slide_count:3,
      slide_timeout:5,
      slide_image_current:'/files/client/images/slider/11.jpg',
      slide_image_next:'',
      slide_text:[
        {color:'black', text:'Товары для школы', link:'/catalog/tovary-dlya-shkoly'},
        {color:'white', text:'Офисные принадлежности', link:'/catalog/ofisnye-prinadlezhnosti'},
        {color:'black', text:'Офисные принадлежности', link:'/catalog/ofisnye-prinadlezhnosti'},

      ],
      change:false,
      images:[
        '/files/client/images/slider/11.jpg',
        '/files/client/images/slider/22.jpg',
        '/files/client/images/slider/33.jpg'
       // '/files/client/images/slider/4.jpg',
     //   '/files/client/images/slider/5.jpg'
      ]


    }
  },

  mounted() {
    this.slide_image_current = this.images[this.slide]
    this.slide_image_next = this.images[this.slide_next]

    setInterval(()=>this.changeSlide(), this.slide_timeout*1000)

  },
  methods:{

    sliderLink(link)
    {
      this.$router.push(link)
    },

    changeSlide()
    {
      this.animationStart();
      setTimeout(()=>this.animationEnd(), 1000)
    },
    animationStart()
    {
      this.change = true;
    },
    animationEnd()
    {
      this.change = false;
      if(this.slide === this.slide_count-1) {
        this.slide = 0
      }
      else {
        this.slide++;
      }
      this.slide_next = (this.slide + 1>= this.slide_count)?0:this.slide+1;
      this.slide_image_current = this.images[this.slide]
      this.slide_image_next = this.images[this.slide_next]

    }


  }
}
</script>

<style scoped>
.main_page_slider{
  margin: 0px;
  padding: 0px;
  overflow: hidden;
  max-width: 600px;
  max-height: 200px;
}
.slider{
  display: inline-flex;
}
.slide_current, .slide_next{
position: relative;
  width:600px;
  height: 200px;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
}
.slide_current{
  background-image: url("/files/client/images/slider/11.jpg");
}
.slide_previous{

}
.slide_text{
  margin:  20px 20px 20px 20px;
  text-shadow: 0 0 2px  black;
  color:white;
  font-size: 2rem;
}
.text_black{
  color: black;
  text-shadow: #fff -1px -1px 0,
  #333 1px 1px 0;
}
.text_white{
color:white;
  text-shadow: #fff -1px -1px 0,
  #333 1px 1px 0;

}
.slide__out{
  animation: slide-out 1s forwards;
}

.slide__in{
  animation: slide-in 1s forwards;
}
.slider_link{
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
}
@keyframes slide-out {
  0%{
    left: 0;
  }
  100%{
    left: -50%
  }
}

@keyframes slide-in {
  0%{
    left: 0;
  }
  100%{
    left: -50%
  }
}


</style>