<template>
  <div class="modal on_top_200">
    <client-only>
      <modal
          :name="modal_name"
          transition="pop-out"
          height="95%"
          width="95%"
          :max-width="960"
          :adaptive="true"
          :scrollable="true"
          :pivot-y="0.5"
          :reset="true"
          @before-open="">
        <div class="content">
          <div class="current_image" :style="currentImage()">


          </div>

        </div>

        <div class="close" @click="$modal.hide(modal_name)">+</div>

      </modal>

    </client-only>
  </div>
</template>

<script>
export default {
  name: "ShowImage",
  props:[
    'modal_name',
    'images',
     'current_image'
  ],
  data(){
    return{

    }
  },
  methods:{
    getImage()
    {

      return this.current_image
    },
    currentImage()
    {
      return {
        'background-image': 'url(' + this.current_image + ')'
      };
    }

  }
}
</script>

<style scoped>
.close{
  position: absolute;
  font-size: 3rem;
  top:0px;
  right: 10px;
  transform: rotate(45deg);
  cursor: pointer;
}
.current_image{
  background-size: contain;
  height: 93vh;
 /* width: 100vw;*/
  background-position: center;
  background-repeat: no-repeat;
}
</style>
