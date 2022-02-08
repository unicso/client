<template>
<section class="main_test">

ddd
  <div id="container"></div>


</section>
</template>

<script>

export default {
  name: "test-main",
  layout:'empty',
  data(){
    return{
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      loader:null

    }
  },



}
</script>

<style scoped>
#container {
  height: 400px;
}
</style>