<template>
<section class="main_test">
  <div class="globe-container">
    <div class="globe">
      <div class="globe-sphere"></div>
      <div class="globe-outer-shadow" v-if="2==3"></div>
      <div class="globe-worldmap">
        <div class="globe-worldmap-back"></div>
        <div class="globe-worldmap-front">
          <div class="links l1">
            <a href="https://market.unicso.ru">Маркет</a>
          </div>
          <div class="links l2"><a href="https://dev.unicso.ru">Услуги</a></div>
          <div class="links l3"><a href="https://dev.unicso.ru">Сервисы</a></div>
          <div class="links l1"><a href="https://dev.unicso.ru">Магазин</a></div>
          <div class="links l2"><a href="https://dev.unicso.ru">Услуги</a></div>
          <div class="links l3"><a href="https://dev.unicso.ru">Сервисы</a></div>
          <div class="links l1"><a href="https://dev.unicso.ru">Магазин</a></div>
          <div class="links l2"><a href="https://dev.unicso.ru">Услуги</a></div>
          <div class="links l3"><a href="https://dev.unicso.ru">Сервисы</a></div>
          <div class="links l1"><a href="https://dev.unicso.ru">Магазин</a></div>
          <div class="links l2"><a href="https://dev.unicso.ru">Услуги</a></div>
          <div class="links l3"><a href="https://dev.unicso.ru">Сервисы</a></div>


        </div>
      </div>
      <div class="globe-inner-shadow">5</div>
    </div>
  </div>

<style>
  .fr {
    fill: #017c01; opacity:1;}
  .bk {fill:#388cde; opacity:0.2;}


</style>


</section>
</template>

<script>
export default {
  name: "test-main"
}
</script>

<style scoped>
.main_test{
  position: fixed;
  left: 0px;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url("/lad1.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 999998;


}

/**
ЗЕМЛЯ
 */

.globe-container{

  z-index: 999999;


}
.globe-container,
.globe {
  width: 300px;
  height: 300px;
}
.globe-container {
  position: relative;
  display: inline-block;

  transform: scale(1.1);
  transform: translate(0,-30%);
}
.globe {
  position: relative;
  display: block;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
}
.globe-worldmap,
.globe-worldmap-front,
.globe-worldmap-back,
.globe-sphere,
.globe-outer-shadow,
.globe-inner-shadow {
  position: absolute;
  display: block;
  margin: 0;
}
.globe-sphere,
.globe-outer-shadow,
.globe-inner-shadow {
  left: 0;
  top: 0;
  width: inherit;
  height: inherit;
  background-position: 0 0;
  background-repeat: no-repeat;
}
.globe-worldmap {
  left: 0;
  top: 0;
  width: inherit;
  height: inherit;
  overflow: hidden;
  border-radius: 50%;
}
.globe-worldmap-front,
.globe-worldmap-back {
  left: 0;
  top: 0;
  width: 1000px;
  height: inherit;
  overflow: visible;
  background-image: url(/earth/worldmap.svg);
  background-repeat: no-repeat;
  /*    background-size: cover;*/
  zoom: 1.3

}
.globe-outer-shadow {
  left: 157px;
  top: 500px;
  width: inherit;
  height: 30px;
  background-image: url(/earth/outer_shadow.svg);
}
.globe-inner-shadow {
  background-image: url(/earth/inner_shadow.svg);
  background-size: contain;
}

.globe-worldmap-front {
  background-position: 0px 0px;
  z-index: 2;
  animation: textureSpinreverse 15s linear infinite;
  background-color: dodgerblue;
}
.globe-worldmap-back {
  background-position: 0px -220px;
  animation: textureSpin 15s linear infinite;
  display: none;
}

@keyframes textureSpin {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-47.5%);
  }
}
@keyframes textureSpinreverse {
  from {
    transform: translateX(-47.5%);
  }
  to {
    transform: translateX(0);
  }
}

.links{
  display: inline-flex;
  margin-top: 20px;

}
.l1, .l2, .l3{
  position: relative;
}
.l1{
  top:10%;
}
.l2{
  top:25%;
}
.l3{
  top:45%;
}
a:link{
  color:white;

}
a:visited{
  color:white;
}
.l1:hover, .l2:hover, .l3:hover{
  transform: scale(1.2);
  transition: 0.3s ease-in-out;
  z-index: 9999999;

}
.globe-worldmap-front:hover{
  animation-play-state: paused;
}
.globe-inner-shadow svg{

}
</style>