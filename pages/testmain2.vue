<template>
<section class="main_test">
    <div class="shesterenki">
      <div class="main rf shesterenka">
        <div class="logo"></div>
      </div>
      <div class="s1 rr shesterenka">

      </div>
      <div class="s2 rf shesterenka">

      </div>
      <div class="s3 rr shesterenka">

      </div>
      <div class="s4 rf shesterenka" >
        <a href="https://dev.unicso.ru">Маркет</a>
      </div>

    </div>
    <div class="show_title" v-if="show_title">
      Маркет
    </div>
</section>
</template>

<script>
export default {
  name: "test-main",
  data(){
    return{
      show_title:false

    }
  },



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
  width: 1920px;
  height: 1080px;
  background-color: white;
  z-index: 999998;


  background-image: url("/lad2.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 999998;
  animation: shrink 5s infinite alternate;

}
.shesterenki{
  margin-top: -440px;
  margin-left: -560px;

}
.shesterenka{
  display: flex;
}

.shesterenka{
  background-image: url("/files/client/images/shesterenka_empty_metall.png");
  background-size: contain;
  width: 150px;
  height: 150px;
  background-repeat: no-repeat;
  display: inline-flex;
  font-size: 200px;
  color: white;
  justify-items: center;
  align-items: center;
}
.shesterenka:hover{
  animation-play-state: paused;
  transform: rotate(1deg);
}
.shesterenka a{
  width: 100%;
  text-align: center;
}
.main{
  justify-content: center;

  width: 1em;
  height: 1em;
}
.logo_bg{
  background-size: contain;
  background-repeat: no-repeat;
  width: 0.7em;
  height: 0.7em;
  align-self: center;
  justify-self: center;
  background: radial-gradient(farthest-side ellipse at top left, white, #aaaaaa);
  box-shadow: 5px 10px 20px rgba(0,0,0,0.3), -5px -10px 20px rgba(255,255,255,0.5);
  border-radius: 50%;
}
.logo{
  background-image: url("/files/client/images/logo.png");
  background-size: contain;
  background-repeat: no-repeat;
  width: 0.7em;
  height: 0.7em;
  align-self: center;
  justify-self: center;

  border-radius: 50%;
}
.rf{
  animation: 10s p1 infinite linear;
}
.rr{
  animation: 10s p2 infinite linear;
}
.s1{

  width: 0.8em;
  height: 0.8em;
  position: absolute;
  margin-left: -0.4em;
  margin-top: 0.8em;
}

.s2{

  width: 0.8em;
  height: 0.8em;
  position: absolute;
  margin-left: 0.2em;
  margin-top: 1.3em;
}

.s3{

  width: 0.8em;
  height: 0.8em;
  position: absolute;
  margin-left: 0.55em;
  margin-top: 0.6em;
}
.s4{

  width: 1.2em;
  height: 1.2em;
  position: absolute;
  margin-left: 1.3em;
  margin-top: 0.7em;
  justify-content: center;
  align-content: center;
}

.s4 a{
  font-size: 35px;
 /* background-color: rgba(200,200,200,0.5);*/
  width: 60%;
  height: 60%;
  border-radius: 50%;
  line-height: 160px;
  background: radial-gradient(farthest-side ellipse at top left, white, #aaaaaa);
  box-shadow: 5px 10px 20px rgba(0,0,0,0.3), -5px -10px 20px rgba(255,255,255,0.5);
  animation: 2s s4_in forwards;
}

@keyframes s4_in {
  0%{transform: scale3d(0,1,1)}
  100%{transform: scale3d(1,1,1)}
}

@keyframes p1 {
  0%{transform: rotate(0deg)}
  100%{transform: rotate(360deg)}

}
@keyframes p2 {
  0%{transform: rotate(0deg)}
  100%{transform: rotate(-360deg)}

}

.s4 a {

  color: white;
  transition: all .5s;

  text-shadow: 0 1px 0 #ccc,
  0 2px 0 #c9c9c9,
  0 3px 0 #bbb,
  0 4px 0 #b9b9b9,
  0 5px 0 #aaa,
  0 6px 1px rgba(0,0,0,.1),
  0 0 5px rgba(0,0,0,.1),
  0 1px 3px rgba(0,0,0,.3),
  0 3px 5px rgba(0,0,0,.2),
  0 5px 10px rgba(0,0,0,.25),
  0 10px 10px rgba(0,0,0,.2),
  0 20px 20px rgba(0,0,0,.15);
}

.s4 a:hover {
  text-shadow: 6px 6px 0px rgba(0,0,0,0.2);
}
@keyframes shrink {
  0% {
    background-size: 100% 100%;
  }
  100% {
    background-size: 101.5% 101.5%;
  }
}
</style>