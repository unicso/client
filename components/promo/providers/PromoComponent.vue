<template>


  <section class="item_thumb" v-if="as_link!='true'">
    <button @click="show=true">Показатьs</button>
    <transition name="fade">
      <section  class="view_pdf">
          <div class="open_close" @click="show=true">12</div>
        <button class="btn-std close_view" @click="show=false">Закрыть</button>
        <object :data="file" type="application/pdf" width="100%" height="100%">
          <p>В вашем браузере не установлен плагин для просмотра PDF файлов.
            Вы можете скачать файл по ссылке: <a class="std-link" :href="file">Нажмите для скачивания</a></p>
        </object>
      </section>
    </transition>
  </section>
  <section class="item_thumb_as_link" v-else>
    <div class="open_close"  @click="show=true"></div>
    <div class="title"   @click="show=true">
      {{title}}

    </div>
    <transition name="fade">
      <section  class="view_pdf" v-if="show">

        <button class="btn-std close_view" @click="show=false">Закрыть</button>
        <object :data="file" type="application/pdf" width="100%" height="100%">
          <p>В вашем браузере не установлен плагин для просмотра PDF файлов.
            Вы можете скачать файл по ссылке: <a class="std-link" :href="file">Нажмите для скачивания</a></p>
        </object>
      </section>
    </transition>
  </section>




</template>

<script>
export default {
  name: "PromoComponent",
  props:[
      'file', 'as_link', 'title'
  ],
  data(){
    return{
      show:false
    }
  },

  methods:{
    toogle(){
        if(this.show)
          this.show = false

    }
  }
}
</script>

<style scoped>
.view_pdf{
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100vh;
  z-index: 22222;
}
.close_view{
  z-index: 33333;
  position: absolute;
  right:150px
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
.open_close, .item_thumb_as_link{
  width: 100%;
  height: 100%;
  cursor: pointer;
  /*display: flex;*/
  border-radius: inherit;
}
.open_close{
  display: block;
}

.title{
  background-color: rgba(0,0,0,0.5);
  color: white;
  text-align: center;

  width: 100%;
  font-size: 1.3rem;
  transform: translate(0, -100%);
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}
</style>