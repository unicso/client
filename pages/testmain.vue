<template>
<section class="main_test" @mousemove="mouseDrag">
  <h3 style="z-index: 111111; position: fixed; top:0; right: 0; width: 200px; background-color: rgba(255,255,255,0.5)">
    X:{{x}} - Y:{{y}}
    K: {{(x/3000*5).toFixed(2)}} R:{{res}}
    <br><label>ФОН <input type="checkbox" v-model="show_background"></label>
    <br><label>Видеофон <input type="checkbox" v-model="show_video"></label>
    <br><label>Эффект:</label>
    <select v-model="effect">
      <option value="blur_block">Эффект 1</option>
      <option value="saturate">Эффект 2</option>
      <option value="empty">Без эффекта</option>

    </select>
  </h3>
  <div class="logotype" @click="show_block='main'">
    <logo-animated :width="'150px'" :height="'150px'" :text="true"/>
  </div>



  <div class="main" :class="[show_block=='main'?'active':'hide']">
    <div class="blocks">

      <a href="https://dev.unicso.ru/info/about" target="_blank">
        <div class="hexogonal first" @click="show_items=!show_items"  :class="{'show_first':show_items}">
        <div class="hex-wrap">
          <div class="hex-borders">
            <div class="border-1"></div>
            <div class="border-2"></div>
            <div class="border-3"></div>
          </div>
        </div>
        <div class="hex-wrap-inner">
          <div class="hex-borders">
            <div class="border-1"></div>
            <div class="border-2"></div>
            <div class="border-3"></div>
          </div>
        </div>
        <div class="hex-title">
          <div class="title">О компании</div>
        </div>

      </div>
      </a>

      <div class="hexogonal" v-for="item in items" :class="{'showed':show_items}">

        <a :href="item.link" target="_blank" v-if="item.click==false" @click="show_items=false">
          <div class="hex-wrap">
            <div class="hex-borders">
              <div class="border-1"></div>
              <div class="border-2"></div>
              <div class="border-3"></div>
            </div>
          </div>
          <div class="hex-wrap-inner">
            <div class="hex-borders">
              <div class="border-1"></div>
              <div class="border-2"></div>
              <div class="border-3"></div>
            </div>
          </div>
          <div class="hex-title">
            <div class="title">{{ item.name }}</div>
          </div>
        </a>
        <div v-else @click="show_block=item.click; show_items=false;">
          <div class="hex-wrap">
            <div class="hex-borders">
              <div class="border-1"></div>
              <div class="border-2"></div>
              <div class="border-3"></div>
            </div>
          </div>
          <div class="hex-wrap-inner">
            <div class="hex-borders">
              <div class="border-1"></div>
              <div class="border-2"></div>
              <div class="border-3"></div>
            </div>
          </div>
          <div class="hex-title">
            <div class="title">{{ item.name }}</div>
          </div>
        </div>

      </div>



    </div>

    <div class="description" :class="[show_items?effect:'']" @click="show_items=!show_items" >
      <div class="t1">Правильные<br>решения</div>
      <div class="t2"><div>Для вашего</div><div>Бизнеса</div></div>

    </div>


    <div class="images"  >
      <div v-if="show_background && show_video==false" class="background" :style="'width: 10' + res +'%'" :class="[show_items?effect:'']"></div>
      <video src="/files/client/background.mp4" v-if="show_background && show_video" autoplay loop muted></video>
      <div class="man" :class="[show_items?effect:'']"></div>


    </div>
  </div>

  <div class="contacts"  :class="[show_block=='contacts'?'active':'hide']">

      <div class="contacts_text">
        <h1>Контактная информация</h1>

        <a class="phone" href="tel://+74951980882">Телефон для связи: <b>+7 (495) 198-08-82</b></a><br><br>
        <nuxt-link class="email" to="/info/support?email=devzak@unicso.ru&subject=Вопросы по поставке товаров" >Предложения от поставщиков и производителей: <b>devzak@unicso.ru</b></nuxt-link><br><br>
        <nuxt-link class="email" to="/info/support?email=order@unicso.ru&subject=Вопросы по заказам" >Поддержка клиентов: <b>order@unicso.ru</b></nuxt-link><br><br>
        <nuxt-link class="email" to="/info/support?email=contact@unicso.ru&subject=Общие вопросы" >Общие вопросы: <b>contact@unicso.ru</b></nuxt-link><br><br>
        <nuxt-link class="email" to="/info/support?email=dev@unicso.ru&subject=Работа интернет-магазина" >Вопросы по работе интернет-магазина: <b>dev@unicso.ru</b></nuxt-link><br><br>

        <p class="time">	<b>&#9719;</b> Время работы: Понедельник-Пятница с 8:00 до 20:00.</p>




      </div>

      <div class="contacts_image"></div>
  </div>


</section>
</template>

<script>
import LogoAnimated from "../components/common/LogoAnimated";
export default {
  name: "test-main",
  components: {LogoAnimated},
  layout: 'empty',
  data(){
    return{
        items: [
          {name:'Маркет', link:'https://dev.unicso.ru', click:false},
          {name:'Пункт 1', link:'https://dev.unicso.ru/info/about', click:false},
          {name:'Контакты', link:'https://dev.unicso.ru/info/contacts', click:'contacts'},
          {name:'Пункт 2', link:'https://dev.unicso.ru', click:false},
          {name:'Пункт 3', link:'https://dev.unicso.ru', click:false},
          {name:'Пункт 4', link:'https://dev.unicso.ru/info/about',click:false},
        ],
      show_items:false,
      x:0,
      y:0,
      res:0,
      show_background:true,
      effect:'blur_block',
      show_block:'main',
      back_blur:true,
      show_video:false


    }
  },
  mounted() {
    window.addEventListener('scroll', this.mouse);

  },
  watch:{
    x(newVal, oldVal){
      if(oldVal>newVal) {

        this.res = 0.05
      }
      else
        this.res = 0

}
  },
  methods:{

    mouseDrag(event)
    {
      this.x = event.clientX;
      this.y = event.clientY;

    }

  }


}
</script>

<style scoped>
.contacts{
  z-index: 1;
  position: fixed;
  top:20%;
  left: 30%;
  font-size: 2em;
  width: 100%;
}
.contacts_text{
  margin-left: 10px;
  position: absolute;
  z-index: 22;
  padding: 20px;
  background-color: var(--base-color-o07);
  border-radius: 30px;
  color: white;
}
.main.hide .images .background{
  left: -100%;
  transition: 1s ease-in-out;
}
.main.hide{
  opacity: 0;
  transition: 1s ease-in-out;
}
.contacts.active{
  left: 10%;
  transition: 1s ease-in-out;
}
.contacts.hide{
left: 100%;
  transition: 1s ease-in-out;
}

.contacts.hide .contacts_image{
  left: 100%;
  transition: 1s ease-in-out;
}
.contacts.active .contacts_image{
  background-image: url("/images/demo/m2.jpg");
  position: fixed;
  top:0px;
  left: 0px;
  overflow: hidden;
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;

  transition: 1s ease-in-out;

}



.hexogonal:hover{
  cursor: pointer;
}

.logotype{
  position: fixed;
  left: 20px;
  top: 20px;
  z-index: 122;
  cursor: pointer;
}
.first{
  z-index: 222 !important;

}
.description{
  position: absolute;
  z-index: 1;
  text-transform: uppercase;
  font-size: 5rem;
  font-weight: bold;
  top:25%;
  left: 10%;
  transition: 0.5s ease-in-out;
}
.description >*{
  padding: 10px 70px 10px 110px;
  transform: scale(1);
}
.description>*:hover{
  transform: scale(1.05);
  transition: 0.5s ease-in-out;
  cursor: pointer;
}
.description .t1{

  color: black;
  width: fit-content;

  margin-bottom: 10%;
}
.description .t2 > div{
  background-color: var(--base-color);
  color:white;
  width: fit-content;
  padding: 10px 50px;
  clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
  margin-bottom: 10px;
  margin-left: -50px;
}

section{
  position: fixed !important;
  width: 100%;
  height: 100%;
  background-color: white;
  left: 0;
  top: 0;
  z-index: 100;
  overflow: hidden;
  width: 1920px;
  min-width: 1920px;
}
.man{
  background-image: url("/images/demo/man3.png");

  height: 80%;
  width: 70%;
  background-repeat: no-repeat;
  background-size: contain;
  position: fixed;
  bottom: 0px;
  right: 0px;
  background-position: right bottom;

  transition: 0.5s ease-in-out;
  overflow: hidden;
}
.background{
  background-image: url("/images/demo/m1.jpg");
  position: fixed;
  top:0px;
  left: 0px;
  overflow: hidden;
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(0px);
  transition: all 5s ease;
  transition: 0.5s ease-in-out;
}
.background-blur{
  filter: blur(3px);
}
.blocks{
  position: absolute;
  top: 40%;
  left: 45%;


}
section{
  position: relative;
}
.hexogonal{
  position: absolute;
  height: 122px;
  width: 198px;
  top:100px;
  z-index: 100;
  opacity: 0;
}


.hex-title{
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 1.5em;
  position: absolute;
  top: 0px;
  justify-items: center;
  justify-content: center;
  padding: 0 10px;

}
.hex-title .title{
  height: 84px;
  width: 84px;
  width: 95%;
  font-size: 2rem;
  text-align: center;
  opacity: 0;
  color: white;
  font-size: 1.3em;
}
.showed .title{
  opacity: 1;
}
.first .title{
  opacity: 1;
}
.border-1,
.border-2,
.border-3
{
  position: absolute;
  width: 100%;
  height: 100px;
 /* top: 46px;*/
  left: 0;
  border-left: 5px solid;
  border-right: 5px solid;
  border-radius: 15px;
  z-index: 2;

  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.border-2{
  transform: rotate(60deg);
}

.border-3{
  transform: rotate(120deg);
}

.border-3::before{
  display: none;
  position: absolute;
  content: "";
  bottom: 10%;
  left: 42px;
  width: 50%;
  height: 83%;
  background-color: rgba(255, 255, 255, 0);
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: white;
  border-radius: 50%;
  visibility: visible;
  z-index: -1;
  /* transform: rotate(60deg); */
}
.hex-wrap, .hex-wrap-inner {
  position: relative;
  width: 150px;
  height: 190px;
  margin: 0 1em 0 0;
  border-top-left-radius: 100%;
  border-top-right-radius: 100%;
  border-bottom-left-radius: 100%;
  border-bottom-right-radius: 100%;
  border: 0px solid;
  transform: scale(1.1);
}
.hexogonal{
zoom: 0.5;
  transition: 0.5s ease-in-out;
}
.hex-wrap{
  position: absolute;
}
.hex-wrap-inner{
  position: relative;
  width: 170px;
  height: 48px;
  left: 14px;
  top: 3px;

}
.border-1,
.border-2,
.border-3 {
  position: absolute;
  width: 200px;
  height: 130px;

  border-left: 5px solid;
  border-right: 5px solid;
}
.hex-wrap-inner .border-1,.hex-wrap-inner .border-2,.hex-wrap-inner .border-3
{
  width: 100%;
  height: 111px;
  /*  top: 46px; */
  border-left: 11px solid;
  border-right: 11px solid;
  border-radius: 11px;
}

.hex-wrap .label {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: 58px;
  color: #f6f6f6;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}

.hex-wrap .label svg,
.hex-wrap .label img {
  height: 50px;
  width: 50px;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.hex-init {
  position: absolute;
  top: 46px;
  left: 0px;
  height: 46%;
  width: 100%;
  z-index: 9;
  transform: rotate(-60deg);
  cursor: pointer;
}

.hex-init::after {
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  content: "";
  transform: rotate(-60deg);
}

.hex-init::before {
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  content: "";
  transform: rotate(60deg);
}
.showed{

}

.hexogonal:nth-child(1)
{
  z-index: 1111;
  cursor: pointer;
 /* background-color: white;*/
}
.showed.hexogonal:nth-child(1)
{
  z-index: 1111;
  cursor: pointer;
  background-color: transparent;
}

.border-1:nth-child(2){  border-left: 3px solid darkgreen; border-right: 3px solid  darkgreen}
.border-1:nth-child(3){  border-left: 3px solid lightskyblue; border-right: 3px solid  lightskyblue}
.border-1:nth-child(4){  border-left: 3px solid yellow; border-right: 3px solid  yellow}
.border-1:nth-child(5){  border-left: 3px solid blue; border-right: 3px solid  blue}
.border-1:nth-child(6){  border-left: 3px solid lightgreen; border-right: 3px solid  lightgreen}
.border-1:nth-child(7){  border-left: 3px solid var(--base-color); border-right: 3px solid  var(--base-color)}

.hexogonal:nth-child(2)
{
  border-color: darkgreen;
  transform: translate(0, 0) scale(1);
}
.hexogonal:nth-child(3)
{
  border-color: lightskyblue;
  transform: translate(0%, 0%) scale(1);
}
.hexogonal:nth-child(4)
{
  border-color: yellow;
  transform: translate(0%, 0%) scale(1);
}
.hexogonal:nth-child(5)
{
  border-color: blue;
  transform: translate(-0%, 0%) scale(1);
}
.hexogonal:nth-child(6)
{
  border-color: lightgreen;
  transform: translate(-0%, -0%) scale(1);
}
.hexogonal:nth-child (7)
{
  border-color: var(--base-color);
  transform: translate(0%, -0%) scale(1);
}
.hexogonal:nth-child (8)
{
  border-color: var(--base-color);
  transform: translate(0%, -0%) scale(1);
}
/**

HOVER
 */


.hexogonal:nth-child(2):hover
{
  border-color: darkgreen;
  transform: translate(0, 0) scale(1.2);
}
.hexogonal:nth-child(3):hover
{
  border-color: lightskyblue;
  transform: translate(0%, 0%) scale(1.2);
}
.hexogonal:nth-child(4):hover
{
  border-color: yellow;
  transform: translate(0%, 0%) scale(1.2);
}
.hexogonal:nth-child(5):hover
{
  border-color: blue;
  transform: translate(-0%, 0%) scale(1.2);
}
.hexogonal:nth-child(6):hover
{
  border-color: lightgreen;
  transform: translate(-0%, -0%) scale(1.2);
}
.hexogonal:nth-child (7):hover
{
  border-color: var(--base-color);
  transform: translate(0%, -0%) scale(1.2);
}
.hexogonal:nth-child (8):hover
{
  border-color: var(--base-color);
  transform: translate(0%, -0%) scale(1.2);
}

.showed.hexogonal{
  transition: 1s ease-in-out;
}


.showed.hexogonal:nth-child(2):hover
{
  transform: translate(120%, 0) scale(1.2);

}
.showed.hexogonal:nth-child(3):hover
{
  transform: translate(60%, 170%) scale(1.2);

}
.showed.hexogonal:nth-child(4):hover
{
  transform: translate(-60%, 170%) scale(1.2);

}
.showed.hexogonal:nth-child(5):hover
{
  transform: translate(-120%, 0%) scale(1.2);

}
.showed.hexogonal:nth-child(6):hover
{
  transform: translate(-60%, -170%) scale(1.2);

}
.showed.hexogonal:nth-child(7):hover
{
  transform: translate(60%, -170%) scale(1.2);

}
.showed.hexogonal:nth-child(8):hover
{
  transform: translate(120%, 0%) scale(1.2);

}


/**
HOVER END
 */
.showed{
  color: black;
}
.showed.hexogonal:nth-child(2)
{
  transform: translate(120%, 0) scale(1);

}
.showed.hexogonal:nth-child(3)
{
  transform: translate(60%, 170%) scale(1);
  transition: 1s ease-in-out;
}
.showed.hexogonal:nth-child(4)
{
  transform: translate(-60%, 170%) scale(1);

}
.showed.hexogonal:nth-child(5)
{
  transform: translate(-120%, 0%) scale(1);

}
.showed.hexogonal:nth-child(6)
{
  transform: translate(-60%, -170%) scale(1);

}
.showed.hexogonal:nth-child(7)
{
  transform: translate(60%, -170%) scale(1);

}
.showed.hexogonal:nth-child(8)
{
  transform: translate(120%, 0%) scale(1);

}


.hexogonal:nth-child(2) .border-1,
.hexogonal:nth-child(2) .border-2,
.hexogonal:nth-child(2) .border-3{
  color: var(--base-color);
}
.hexogonal:nth-child(3) .border-1,
.hexogonal:nth-child(3) .border-2,
.hexogonal:nth-child(3) .border-3{
  color: blue;
}
.hexogonal:nth-child(4) .border-1,
.hexogonal:nth-child(4) .border-2,
.hexogonal:nth-child(4) .border-3{
  color: red;
}
.hexogonal:nth-child(5) .border-1,
.hexogonal:nth-child(5) .border-2,
.hexogonal:nth-child(5) .border-3{
  color: green;
}
.hexogonal:nth-child(6) .border-1,
.hexogonal:nth-child(6) .border-2,
.hexogonal:nth-child(6) .border-3{
  color: yellow;
}
.hexogonal:nth-child(7) .border-1,
.hexogonal:nth-child(7) .border-2,
.hexogonal:nth-child(7) .border-3{
  color: #c008ea;
}
.hexogonal:nth-child(8) .border-1,
.hexogonal:nth-child(8) .border-2,
.hexogonal:nth-child(8) .border-3{
  color: green;
}
.background{
  filter: blur(0px) saturate(1);
  transition: 1s ease-in-out;
}
.man{
  filter: blur(0px) saturate(1) drop-shadow(2px 4px 6px black);
  transition: 1s ease-in-out;
}
.description{
  filter: blur(0px) saturate(1);
  transition: 1s ease-in-out;
}

.blur_block{
  filter: blur(7px) saturate(1);
  transition: 1s ease-in-out;
}
.saturate{

  filter: blur(0px)  saturate(0.2);
  transition: 1s ease-in-out;


}
.showed{
  opacity: 1;
}
.show_first{
  opacity: 1;
  transition: 0.3s ease-in-out;
}
</style>