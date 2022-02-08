<template>
  <section class="chat_message">
    <div class="button content_block base_shadow_hover" @click="show_window=true; initializ();" v-if="show_window==false">Чат</div>
    <div class="btn__close" @click="show_window=false"  v-if="show_window==true"> </div>
    <div class="chat_window content_block">
      <h3>Чат № {{$route.query.id}}</h3>
      <input type="text" class="name" v-model="name" placeholder="Введите ваше имя" :disabled="block_name">
      <div class="message_history " ref="history">
        <ul>
          <li v-for="(item, index) in message_history"  :class="[item.message_type=='my'?'your_message':'manager_message']">
            <div class="message_name" v-if="item.message_type!='my'">Менеджер:</div>


            <div class="message_message">{{item.message}}</div>
          </li>
        </ul>

      </div>
      <textarea v-model="message" placeholder="Текст сообщения" v-on:keyup.enter="sendMessage" ></textarea>
      <button class="btn-std base_shadow_hover" @click="sendMessage">Отправить</button>
    </div>

  </section>
</template>

<script>
export default {
  name: "SaChatWin",
  props:[
    'chat'
  ],
  data(){
    return{
      show_window:false,
      name:'',
      message:'',
      block_name:false,
      last:0,
      interval:{},
      first_load:true,
      message_history:[
      ]
    }
  },
  computed:{

  },
  mounted() {

    this.initializ()
  },
  methods:{
    initializ(){
      setInterval(()=>{

        this.initChat()
      }, 3000)


    },
    async initChat(){
      let params = {
        endpoint:'support/chat/manager?chat='+this.chat,
        params:{
          type:'update',
        }

      }



      const result = await this.$store.dispatch('api/post',params);



      if(result.code == '200' || this.first_load == true)
      {
        this.message_history = result.body.messages
        this.name = this.message_history[0].name;
        this.block_name = true
        this.interval = setTimeout(()=>{
              let historys = this.$refs.history;
              historys.scrollTop = historys.scrollHeight;
            },
            2000
        )
        this.first_load = false
      }

    },
    async sendMessage(){

      //  (this.message_history).push({name:this.name, message:this.message, time:''})

      this.interval = setTimeout(()=>{
            let historys = this.$refs.history;
            historys.scrollTop = historys.scrollHeight;
          },
          500
      )

      let params = {
        endpoint:'support/chat/manager?chat='+this.chat,
        params:{
          type:'send',
          message:this.message,
          name:this.name,

        }

      }



      const result = await this.$store.dispatch('api/post',params);

      if(result.code == '200' || this.first_load == true)
      {
        this.message_history = result.body.messages
        this.name = this.message_history[0].name;
        this.block_name = true
        this.interval = setTimeout(()=>{
              let historys = this.$refs.history;
              historys.scrollTop = historys.scrollHeight;
            },
            500
        )
        this.first_load = false
      }

      this.message = '';

      // historys[last_element].scrollIntoView({behavior: "smooth"});
      // historys.scrollTop = historys.lastChild.offsetTop
    },







  }

}
</script>

<style scoped>
.chat_message{


}
.button{
  width: 60px;
  height: 60px;
  background: linear-gradient(21deg, #F24645, #EBC08D);
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
  opacity: 0.5;
  transition: opacity 0.5s ease-in-out;
}
.button:hover{
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}
.chat_window{
  background-color: white;

  width: 300px;
  height: 500px;
}
.chat_window h3{
  text-align: center;
}
.chat_window .message_history{
  height: 300px;
  margin-top: 10px;

  box-shadow: 0 0 5px 2px rgba(0,0,0,0.2);
  overflow-y: scroll;
}




.chat_window .message_history::-webkit-scrollbar {
  width: 10px;
}

.chat_window .message_history::-webkit-scrollbar-track {
  -webkit-box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.2) inset;
  background-color: #f9f9fd;
}

.chat_window .message_history::-webkit-scrollbar-thumb {
  background-color: #f2bf93;
  background-image: -webkit-linear-gradient(45deg,rgba(255, 255, 255, .25) 25%,
  transparent 25%,
  transparent 50%,
  rgba(255, 255, 255, .25) 50%,
  rgba(255, 255, 255, .25) 75%,
  transparent 75%,
  transparent);
}


.chat_window textarea{
  margin-top: 30px;
  max-width: 300px;
  height: 3rem;

}
.btn__close{
  float: right;
  margin-right: 5px;
}
.btn-std{
  height: 40px;

}
.your_message .message_message{
  background: linear-gradient(21deg, #dd03e4, #5611ec);
  border: 1px solid grey;
  border-radius: 5px;
  width: 80%;
  color: white;
  max-width: 80%;
  width: fit-content;
  margin-top: 7px;
  padding: 10px 5px 10px 5px;
}
.manager_message .message_message{
  background: linear-gradient(21deg, #F24645, #EBC08D);
  border: 1px solid grey;
  border-radius: 5px;
  width: 80%;
  color: black;
  max-width: 80%;
  width: fit-content;
  margin-top: 7px;
  padding: 10px 5px 10px 5px;
}



.your_message {

  display: flex;
  width: 100%;
  justify-content: right;


}
.your_message{

}
.manager_message{
  margin-right: 30px;
}
.message_name{
  font-size: 0.8rem;

}



</style>