<template>
  <section>

      <div class="title">Добрый день!<br> Пожалуйста, выберите интересующий Вас вопрос</div>
      <ul>
        <li v-for="item in questions" class="question">
          <div class="clicked"  v-if="answer==false" @click="load(item.id)">{{item.text}}</div>
          <div class="answer" v-else>{{item.text}}</div>
        </li>
        <li class="question clicked back" v-if="current_parent>0" @click="load(current_parent + '?prev=' + current_parent)">Вернуться назад</li>
      </ul>

    <div class="input_block" v-if="action == 'form'">
      <textarea class="message_window" v-model="message" @keyup.enter="send"> </textarea>
      <button class="btn-std">Отправить</button>
    </div>

  </section>
</template>

<script>
export default {
  name: "OnlineHelperFaq",
  data() {
    return {
      questions:false,
      answer:false,
      current_parent:0,
      message:'',
      action:false

    }
  },
  mounted() {
    this.load(0)
  },
  methods: {
    async load(item)
    {

        const result = await this.$store.dispatch('api/get', {endpoint:'support/faq/'+ item})
        this.questions = result.body
        this.current_parent = result.body[0].parent
        this.action = result.body[0].action
        if(result.body[0].type == 'answer'){
          this.answer = true
        }
        else
        {
          this.answer = false
        }
    }


  }


}
</script>

<style scoped>
section{

}
.title{
  text-align: center;
  font-size: 0.9em;
  margin-top: 10px;
}
  .clicked, .answer{
    background-color: rgba(200,200,200, 0.4);
    padding: 7px;
    margin: 10px;
    border-radius: 5px;
  }
  .clicked:hover{
    cursor: pointer;
    box-shadow: 0 0 5px 2px var(--base-color-o02);
    box-shadow: 0 0 10px var(--base-color-o09);
  }

.send_message{
  background-image: url("/files/client/images/chat/send_deactive.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 30px;
  height: 30px;
  border: none;
  position: absolute;
  right: 17px;
  bottom: 17px;

}
.input_block .message_window{
  height: 80px;

  margin: 10px;
  background-color: transparent;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  border: none;
  border-radius: 10px;
}
.back{
  border: 1px solid var(--base-color);
}
.back:hover{
  box-shadow: 0 0 10px var(--base-color-o09);
}
.input_block{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.input_block button{
  width: 70%;
}
</style>