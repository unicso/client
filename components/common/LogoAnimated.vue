<template>
  <div class="animated__logo" :style="'width: '+ width + '; height:'+ height" :class="{'periodic':periodic}">
    <div class="logo">
      <div class="left"></div>
      <div class="right "  ref="animation_start"></div>
    </div>
    <div class="text" v-if="text">
      <b>Ю</b><b>Н</b><b>И</b><b>К</b><b>С</b><b>О</b>
    </div>

  </div>

</template>

<script>
export default {
  name: "LogoAnimated",
  props:[
      'width', 'height',
      'text'
  ],
  data(){
    return{
      periodic:false
    }
  },

  mounted() {
    setTimeout(()=>this.periodic=true, 3000)


  }

}
</script>

<style scoped>
.animated__logo{
  width: 450px;
  height: 450px;
  display: inline-flex;

}
.animated__logo .text{
  margin-left: 100%;
  transform: translate(-10px,40%);
  font-size: 32px;
  font-family: "Logotype";
}
.logo{
  width: inherit;
  height: inherit;
}
.animated__logo .left{
  background-image: url("/files/client/images/logo_1.png");
  background-repeat: no-repeat;
  background-size: contain;
  width: inherit;
  height: inherit;
}
.animated__logo .right{
  background-image: url("/files/client/images/logo_2.png");
  background-repeat: no-repeat;
  background-size: contain;
  width: inherit;
  height: inherit;
}
.animated__logo .right, .animated__logo .left{
  position: absolute;
}

.animated__logo .right{

  animation: 4s rotate_right forwards;






}
.periodic .right{

  animation: 7s rotate_right_periodic infinite;
}
.periodic .left{


}

.animated__logo .periodic_start{

}


.animated__logo .left{
  animation: 4s rotate_left forwards;
}

@keyframes rotate_right {
  0%{
    transform: rotate3d(100,100,0,90deg);

  }
  50%{
    transform: rotate3d(10,100,0,-30deg);
  }
  100%{
    transform: rotate3d(10,100,0,0deg);
  }

}
@keyframes rotate_right_periodic {
  0%{
    transform: rotate3d(100,100,0,0deg);

  }
  50%{
    transform: rotate3d(10,100,0,-30deg);
  }
  100%{
    transform: rotate3d(10,100,0,0deg);
  }

}
@keyframes rotate_left {
  0%{
    transform: rotate3d(0,100,0,-90deg);
  }
  50%{
    transform: rotate3d(0,100,0,0deg);
  }
  100%{
    transform: rotate3d(0,100,0,0deg);
  }


}
.text{
  display: flex;

}
.text b{
  display: block;
  transform: rotate3d(0,100,0, 90deg);
  height: fit-content;
}
.text b:nth-child(1) {
  animation: 1s n1 0s forwards ;
}
.text b:nth-child(2) {
  animation: 1s n2 0s forwards ;
}
.text b:nth-child(3) {
  animation: 1s n3 0s forwards ;
}
.text b:nth-child(4) {
  animation: 1s n4 0s forwards ;
}
.text b:nth-child(5) {
  animation: 1s n2 0s forwards ;
}
.text b:nth-child(6) {
  animation: 1s n1 0s forwards ;
}

@keyframes n1 {
  0%{ transform: rotate3d(0,100,0, 90deg)}
  100%{ transform: rotate3d(0,100,0, 0deg)}
}
@keyframes n2 {
  0%{ transform: rotate3d(0,100,40, 90deg)}
  100%{ transform: rotate3d(0,100,0, 0deg)}
}
@keyframes n3 {
  0%{ transform: rotate3d(50,55,40, 90deg)}
  100%{ transform: rotate3d(0,100,0, 0deg)}
}
@keyframes n4 {
  0%{ transform: rotate3d(0,100,70, 90deg)}
  100%{ transform: rotate3d(0,100,0, 0deg)}
}


</style>