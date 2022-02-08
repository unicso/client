 <template>
    <section class="online_chat">
      <h3 v-if="chat_number"> Чат № {{chat_number}}</h3>

      <ul class="chat_messages" ref="msgContainer">
        <li v-for="item in message_list" class="message" :class="item.message_type">

          <div class="text">
            <div class="manager_name" v-if="item.message_type=='manager'">{{item.name}}</div><br>
            {{item.message}}
          </div>

        </li>

      </ul>
      <div class="input_block">
        <textarea class="message_window" v-model="message" @keyup.enter="send"> </textarea>
        <button class="send_message" :class="[message!=''?'active':'']" @click="send"></button>
      </div>

    </section>
  </template>

  <script>
  export default {
    name: "OnlineHelperChatAdmin",
    props:['chat'],
    data() {
      return {
        message:'',
        message_list:[],
        tick:1,
        name:this.$store.state.user.name,
        result:false,
        interval:false,
        chat_number:false
      }
    },
    watch:{
      tick: function() {
        this.$nextTick(function() {
          var container = this.$refs.msgContainer;
          container.scrollTop = container.scrollHeight + 500;
        });
      },
      count_messages(newVal){
        this.playSound()
        this.tick++
      }

    },
    computed:{
      count_messages(){

        return this.message_list.length
      }

    },
    beforeDestroy() {
      clearInterval(this.interval)
    },
    mounted() {



      this.$nextTick(function () {
        // теперь DOM обновлён
        // `this` указывает на текущий экземпляр

      })

      this.startInterval()

    },
    methods: {
      startInterval()
      {
        this.interval = setInterval(()=>this.initChat(), 2000)
      },
      stopInterval()
      {
        clearInterval(this.interval)
      },



      async send(){
        let message = {
          type:"client",
          message:this.message,
          name:"Клиент",
          date:""
        }


        let params = {
          endpoint:'support/chat/manager?chat='+this.chat,
          params:{
            type:'send',
            message:this.message,
            name:this.name,
            message_type:'client'
          }

        }

        const result = await this.$store.dispatch('api/post',params);
        this.message_list = result.body.messages

        this.message = ""
        this.tick ++

      },
      async initChat(){
        let params = {
          endpoint:'support/chat/manager?chat='+this.chat,
          params:{
            type:'update',
          }

        }

        let result = {error:true, body:false}
        if(this.chat)
         result = await this.$store.dispatch('api/post',params);


        if(result.error != true)
        {

          this.message_list = result.body.messages
          // this.name = this.message_history[0].name;
          this.chat_number = result.body.id
          this.block_name = true
          this.$forceUpdate()
          this.first_load = false
        }

      },
      playSound()
      {
        var audio = new Audio('/sounds/message_in.mp3');
        audio.play();
      }
    },






  }
  </script>

  <style scoped>
  .chat_messages{
    width: 100%;


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
  .active.send_message {
    background-image: url("/files/client/images/chat/send_active.png");
  }
  .send_message:hover{
    cursor: pointer;
  }
  .online_chat{
    width: 500px;
    height: 500px;
    border: 2px solid var(--base-color-o08);
    border-radius: 10px;

  }
  .chat_messages{

  }
  .message{
    padding: 10px;

  }

  .client.message .text, .manager.message .text{
    /* display: flex;*/
    display: block;
    width: fit-content;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    word-break: break-word;
  }

  .manager.message{
    justify-content: left;
    display: flex;
  }
  .client.message{
    justify-content: right;
    display: flex;
  }

  .client.message .text {
    background-color: rgba(200, 200, 200, 0.5);
  }

  .manager.message .text{
    background-color: rgba(150,255,150, 0.5);

  }

  .input_block{
    display: flex;
    position: relative;

  }
  .input_block .message_window{
    height: 80px;
    margin: 10px;
    background-color: transparent;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    border: none;
    border-radius: 10px;
  }
  .chat_messages{
    height: 310px;
    overflow-y: scroll;
  }
  .manager_name{
    margin-top: -25px;
    font-size: smaller;
  }
  </style>