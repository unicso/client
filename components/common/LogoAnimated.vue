<template>
  <div class="animated__logo" :style="'width: '+ width + '; height:'+ height">

    <div class="left"></div>
    <div class="right "  ref="animation_start"></div>


  </div>

</template>

<script>
export default {
  name: "LogoAnimated",
  props:[
      'width', 'height'
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
.animated__logo .periodic{
  animation-duration: 2s;
  animation-fill-mode: forwards;



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
</style>