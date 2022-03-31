<template>
  <section v-if="type!=false" ref="section" :style="height" :class="[hide?'hide_message':'show_message']">
    <div  :class="'type_'+type">{{message}}</div>
    <div class="close_message"  @click="hideM">Скрыть сообщение</div>

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
      console.log(newVal)
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

      this.message = 'В связи со сложившейся экономической ситуацией, нарушением логистических цепочек поставок, производители и поставщики продукции вынуждены пересматривать стоимость отгружаемых товаров.\n' +
          'Учитывая эти факты, некоторые цены на нашем  сайте в ЛК покупателей могут быть неактуальны. Для уточнения цен необходимо оформить заказ, после чего Вы получите счет с актуальными ценами и сроком их действия (срок оплаты счета). Также действующие цены  можете получить у Вашего персонального менеджера.\n' +
          'По мере стабилизации ситуации на рынке, мы актуализируем информацию по стоимости и ассортименту товаров на нашем сайте.\n' +
          'Приносим свои извинения за доставленные неудобства и благодарим Вас за сотрудничество!';
      this.type = 'error';



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
  white-space: pre-wrap;

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



  transition:  0.5s ease-in-out;

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