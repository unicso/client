<template>


  <div  v-if="loading || important"  class='cssload-loader'>
    <div class='cssload-inner cssload-one'></div>
    <div class='cssload-inner cssload-two'></div>
    <div class='cssload-inner cssload-three'></div>
  </div>

</template>

<script>
export default {
  props:[
   'important'
  ],
  data: () => ({
    loading: false,
    delay:20,
    throttle:false,
    timeout:false
  }),
  methods: {
    start () {
    this.timeout = true;
      setTimeout(()=>{
      if(this.timeout == true)
        this.loading = true
      }, this.delay)



    },
    finish () {
      this.timeout = false;
      this.loading = false
    }
  }
}
</script>

<style scoped>

.cssload-loader {
  position: fixed;
  top:200px;
  left: calc(50% - 31px);
  width: 100px;
  height: 100px;
  margin: 130px 0;
  -webkit-perspective: 780px;
  perspective: 780px;
  z-index: 555555;
}

.cssload-inner {
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  border-radius: 50%;
  -o-border-radius: 50%;
  -ms-border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
}
.cssload-inner.cssload-one {
  left: 0%;
  top: 0%;
  animation: cssload-rotate-one 1.15s linear infinite;
  -o-animation: cssload-rotate-one 1.15s linear infinite;
  -ms-animation: cssload-rotate-one 1.15s linear infinite;
  -webkit-animation: cssload-rotate-one 1.15s linear infinite;
  -moz-animation: cssload-rotate-one 1.15s linear infinite;
  border-bottom: 3px solid #5C5EDC;
}
.cssload-inner.cssload-two {
  right: 0%;
  top: 0%;
  animation: cssload-rotate-two 1.15s linear infinite;
  -o-animation: cssload-rotate-two 1.15s linear infinite;
  -ms-animation: cssload-rotate-two 1.15s linear infinite;
  -webkit-animation: cssload-rotate-two 1.15s linear infinite;
  -moz-animation: cssload-rotate-two 1.15s linear infinite;
  border-right: 3px solid rgba(76, 70, 101, 0.99);
}
.cssload-inner.cssload-three {
  right: 0%;
  bottom: 0%;
  animation: cssload-rotate-three 1.15s linear infinite;
  -o-animation: cssload-rotate-three 1.15s linear infinite;
  -ms-animation: cssload-rotate-three 1.15s linear infinite;
  -webkit-animation: cssload-rotate-three 1.15s linear infinite;
  -moz-animation: cssload-rotate-three 1.15s linear infinite;
  border-top: 3px solid #e9908a;
}

@keyframes cssload-rotate-one {
  0% {
    -webkit-transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}
@-webkit-keyframes cssload-rotate-one {
  0% {
    -webkit-transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}
@keyframes cssload-rotate-two {
  0% {
    -webkit-transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}
@-webkit-keyframes cssload-rotate-two {
  0% {
    -webkit-transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}
@keyframes cssload-rotate-three {
  0% {
    -webkit-transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}
@-webkit-keyframes cssload-rotate-three {
  0% {
    -webkit-transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}
</style>
