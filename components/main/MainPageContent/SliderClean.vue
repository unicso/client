<template>
<section>
  <div class="slider_clean">
    <input class="current__slide" v-for="(slide,index) in slides"
           type="radio" name="point"
           :id="'slide'+  (index + 1)"
           :value="'slide'+  (index + 1)"
           v-model="checkedSlide">


    <div class="slider">
      <div  v-for="(slide,index) in slides"  class="slides"
            :class="'slide'+  (index + 1)"
            :style="'background-image: url('+ slide.url +')'"></div>

    </div>
    <div class="controls">
      <label v-for="(slide,index) in slides" :for="'slide'+ (index + 1)" @click="stopInterval"></label>

    </div>
  </div>

</section>
</template>

<script>
export default {
  name: "SliderClean",
  data(){
    return{
      current_slide:1,
      count_slide:3,
      interval:'',
      checkedSlide: 'slide1',
      slides:[
        {url:"/files/client/images/slider/main/unicso.jpg", link:false},
        {url:"/files/client/images/slider/main/translojica.jpg", link:false},
        {url:"/files/client/images/slider/main/ateuco.jpg", link:false},
        {url:"/files/client/images/slider/main/taipit.jpg", link:false},

      ]
    }
  },
  mounted() {

    this.interval = setInterval(()=>{
      if(+this.current_slide + 1>this.slides.length) {
        this.current_slide = 1
        this.checkedSlide = 'slide'+this.current_slide
      }
      else {
        this.current_slide++
        this.checkedSlide = 'slide'+this.current_slide
      }

    }, 5000)
  },
  methods:{
    stopInterval()
    {
      clearInterval(this.interval)
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -o-box-sizing: border-box;
  box-sizing: border-box;
}


.slider_clean {
  height: 300px;
  position: relative;
  width: 100%;

}

.slider {
  border-radius: 10px;
  height: inherit;
  overflow: hidden;
  position: relative;
  width: inherit;
  -webkit-box-shadow: 0 0 20px rgba(0, 0, 0, .5);
  -moz-box-shadow: 0 0 20px rgba(0, 0, 0, .5);
  -o-box-shadow: 0 0 20px rgba(0, 0, 0, .5);
  box-shadow: 0 0 20px rgba(0, 0, 0, .5);
}

.slides {
  height: inherit;
  opacity: 0;
  position: absolute;
  width: inherit;
  -webkit-transform: scale(1.5);
  -moz-transform: scale(1.5);
  -o-transform: scale(1.5);
  transform: scale(1.5);
  -webkit-transition: transform ease-in-out .5s, opacity ease-in-out .5s;
  -moz-transition: transform ease-in-out .5s, opacity ease-in-out .5s;
  -o-transition: transform ease-in-out .5s, opacity ease-in-out .5s;
  transition: transform ease-in-out .5s, opacity ease-in-out .5s;
}
/*
.slide1 { background-image: url(/files/client/images/slider/main/unicso.jpg); }
.slide2 { background-image: url(/files/client/images/slider/main/translojica.jpg); }
.slide3 { background-image: url(/files/client/images/slider/main/ateuco.jpg); }
.slide4 { background-image: url(/files/client/images/slider/main/taipit.jpg); }
.slide5 { background-image: url(/files/client/images/slider/main/artieco.jpg); }
*/
.current__slide{
  background-size: cover;
}
#slide1:checked ~ .slider > .slide1,
#slide2:checked ~ .slider > .slide2,
#slide3:checked ~ .slider > .slide3,
#slide4:checked ~ .slider > .slide4,
#slide5:checked ~ .slider > .slide5,
#slide6:checked ~ .slider > .slide6,
#slide7:checked ~ .slider > .slide7,
#slide8:checked ~ .slider > .slide8,
#slide9:checked ~ .slider > .slide9,
#slide10:checked ~ .slider > .slide10,
#slide11:checked ~ .slider > .slide11

{
  opacity: 1;
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -o-transform: scale(1);
  transform: scale(1);
  background-size: cover;
  background-repeat: no-repeat;
}
@media all and (max-width: 480px) {

  .slider_clean {
    height: 110px;
    position: relative;
    width: 100%;

  }
}
.slider_clean > input {
  display: none;
}

.slider_clean .controls {
  left: 50%;
  margin-left: -98px;
  position: absolute;
  margin-top: -50px;
}

.slider_clean label {
  cursor: pointer;
  display: inline-block;
  height: 8px;
  margin: 25px 12px 0 16px;
  position: relative;
  width: 8px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -o-border-radius: 50%;
  border-radius: 50%;
  -webkit-transition: background ease-in-out .5s;
  -moz-transition: background ease-in-out .5s;
  -o-transition: background ease-in-out .5s;
  transition: background ease-in-out .5s;
}

.slider_clean label:hover,

#slide1:checked ~ .controls label:nth-of-type(1),
#slide2:checked ~ .controls label:nth-of-type(2),
#slide3:checked ~ .controls label:nth-of-type(3),
#slide4:checked ~ .controls label:nth-of-type(4),
#slide5:checked ~ .controls label:nth-of-type(5) {
  background: #ddd;
}

.slider_clean label:after {
  border: 2px solid #ddd;
  content: " ";
  display: block;
  height: 12px;
  left: -4px;
  position: absolute;
  top: -4px;
  width: 12px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -o-border-radius: 50%;
  border-radius: 50%;
}
</style>