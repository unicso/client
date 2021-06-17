<template>
<section class="left__banners">
  <select v-model="coof" style="width: 100px;  position: fixed; left: 0px; top:1px">
    <option value="100" selected>100%</option>
    <option value="90" >90%</option>
    <option value="80" >80%</option>
    <option value="70" >70%</option>
    <option value="60" >60%</option>
    <option value="50" >50%</option>

  </select>

  <div class="banner" v-for="banner in banners" :style="'width:'+coof+'%;height:'+coof+'%;'">
    <nuxt-link v-if="banner.link" :to="banner.link">
      <img :src="banner.uri" class="content_block" width="100%" height="100%"/>
    </nuxt-link>
      <img v-else :src="banner.uri" class="content_block" width="100%" height="100%"/>
  </div>

</section>
</template>

<script>
export default {
  name: "LeftBanners",

  data(){
    return{
      banners:[
        {uri:"/files/client/images/slider/left/unicare.jpg", link: '/catalog/manufacturer?manufacturer=unicare'},
        {uri:"/files/client/images/slider/left/canc.jpg", link: '/catalog/ofisnye-prinadlezhnosti'},
      ],
      coof:100

    }
  }
}
</script>

<style scoped>
    .left__banners{
      position: absolute;
      margin-top: 75px;
      margin-left: 7px;
    }
    .left__banners .banner{
      background-size: cover;
      margin-bottom: 10px;
      margin-left: auto;
      margin-right: auto;

    }
    .left__banners .banner img{
      padding: 0px;


    }
</style>