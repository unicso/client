<template>
  <section>
    <div class="image content_block" v-for="image in data" :style="'background-image: url('+image.url+')'" >
    <div class="zoom_in" @click="zoom_image = image.url"></div>
    <button class="btn-std" @click="select(image)">Выбрать</button>
    </div>
    <div v-if="zoom_image!=false" class="fullscreen_image" :style="'background-image: url('+zoom_image+')'" @click="zoom_image = false">
    </div>
  </section>
</template>

<script>
export default {
  name: "ImageLibrary",
  props:[
    'data', 'selectFile'
  ],
  data() {
    return {
      zoom_image:false

    }
  },
  mounted() {



  },
  methods: {
    select(image)
    {

      this.selectFile({
        file: image.file,
        url: image.url
      })
    }


  }


}
</script>

<style scoped>
  .image{
    width: 200px;
    height: 200px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    display: inline-flex;
    flex-wrap: wrap;
    margin: 10px;
    justify-content: center;
    cursor: zoom-in;
  }
  .image button{
    position: relative;
    align-self: end;
    width: 80%;
    height: 40px;
    margin-bottom: -30px;
  }
  .fullscreen_image{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: grey;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;

    z-index: 20000;
    cursor: zoom-out;

  }
  .zoom_in{
    width: 100%;
    height: 85%;
  }
</style>