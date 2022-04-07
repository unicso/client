<template>
  <section v-if="type!=false" ref="section"  :class="[hide?'hide_message':'show_message']">
    <!--noindex-->
      <div  :class="'type_'+type" v-html="message"></div>
      <div class="close_message"  @click="hideM">Скрыть сообщение</div>
    <!--/noindex-->

  </section>
</template>

<script>
import Type from "../../../pages/promo/business/_type";
export default {
  name: "top_message",
  components: {Type},
  data() {
    return {
      type:false,
      message:'',
      hide:false,
      height:'max-height: max-content;',
      new_height:false,
      response:{
        type:false,
        message:'',
        accept:'Ок'
      }
    }
  },
  computed:{


  },
  mounted() {
    this.getMessage();


  },
  watch:{
    '$refs.section.offsetHeight'(newVal){

   //   this.height = 'height:' + this.$refs.section.offsetHeight + 'px'
      }

  },
  updated() {


    if(this.new_height == false) {
      this.height = 'height:' + this.$refs.section.offsetHeight + 'px;'
      this.new_height = true
    }
  },
  beforeUpdate()
  {
 //   this.height = 'height:' + this.$refs.section.offsetHeight + 'px'

  },
  methods: {
    hideM()
    {
      this.new_height = true
      this.height = 'height: 0;  padding: 0;'
      this.hide = !this.hide
    },
    async getMessage()
    {
      const result = await this.$store.dispatch('api/get', {endpoint:'config/message'})


      if(result.error ==false)
      {
        this.message = result.body.top


        this.type = 'error';
      }



    }


  }


}
</script>

<style scoped>
section{
  background-color: rgba(233, 144, 138, 0.4);
  overflow: hidden;
  padding: 5px 20px 0  20px;

}
section > div{
/*  white-space: pre-wrap;*/

}
.type_error{


}
.type_success{


}
.type_notification{


}
pre{
  white-space: pre-wrap;
}
.hide_message{

 /* height: 0;

  transition:  0.5s ease-in-out;
*/

}
.hide_message{
  animation: 0.5s hide_message forwards;

}
.hide_message > div{
  animation: 0.5s hide_message forwards;
  margin-bottom: 20px;

}
.show_message .close_message{
  margin-bottom: 20px;
}
@keyframes hide_message {
  0%{
    height: auto;
    max-height: 100%;

    opacity: 1;
  }
  50%{
    opacity: 0.5;
  }
  100%{

    padding: 0;
    height: 0;
  }

}

.hide_message_button{
  background-color: white;
}
.btn-std{
  width: 200px;
  margin-bottom: 20px;
}
.close_message{
  text-decoration: underline;
  color: blue;
  cursor: pointer;
}
</style>