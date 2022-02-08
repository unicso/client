<template>
<section>
  <h1>Чаты с пользователями</h1>


  <ul>
    <li class="title">Активные чаты</li>
    <li v-for="item in chats">
      <nuxt-link class="std_link" :to="'/user/lk/sa/sachat?chat=' + item.GUID + '&id='+item.id" >
        <div class="chat_info">
          <div class="chat__number">Чат № {{item.id}}</div>
          <div class="chat__response-readed">
            Доставлено клиенту: <input type="checkbox" :checked="(item.new_o==1)?false:true" >
          </div>
          <div class="chat__request-readed">
            Прочитано менеджером: <input type="checkbox" :checked="(item.new_c==1)?false:true" >
          </div>

        </div></nuxt-link>
    </li>
    <li class="title std_link closed" @click="show_closed_chats = true" v-if="show_closed_chats==false">Показать закрытые чаты</li>
    <li class="title std_link closed" @click="show_closed_chats = false" v-else>Скрыть закрытые чаты</li>
     <li>
        <ul v-if="show_closed_chats">
          <li v-for="item in closed_chats">
            <nuxt-link :to="'/user/lk/sa/sachat?chat=' + item.GUID + '&id='+item.id" >Чат № {{item.id}} - new_O({{item.new_o}}) - new_C({{item.new_c}})</nuxt-link>
          </li>
        </ul>
    </li>
  </ul>

  <online-helper-chat-admin :chat="$route.query.chat" />
  <sa-chat-win :chat="$route.query.chat"  v-if="2==3"/>

  <pre>

  </pre>
</section>
</template>

<script>
import SaChatWin from "../../common/chat/SaChatWin";
import OnlineHelperChatAdmin from "./OnlineHelperChatAdmin";
export default {
  name: "SaChat",
  components: {OnlineHelperChatAdmin, SaChatWin},
  data(){
    return{
        chats:{},
        show_chat:false,
        closed_chats:false,
        show_closed_chats:false
    }
  },




  mounted() {
    this.getChats();
    this.getClosedChats()
    setInterval(()=>{this.getChats()}, 5000)
  },

  methods:{
    async getChats(){
      const result = await this.$store.dispatch('api/post', {endpoint:'support/chat/manager'})

      this.chats = result.body
      this.checkForNewMessages();
    //

    },
    async getClosedChats(){
      const result = await this.$store.dispatch('api/post', {endpoint:'support/chat/manager?closed=true'})

      this.closed_chats = result.body


    },
    checkForNewMessages()
    {
      let key;
      for(key in this.chats)
      {
        if(this.chats[key].new_c)
          this.playSound()


      }

    },
    playSound()
    {
      var audio = new Audio('/sounds/message_in.mp3');
      audio.play();
    }

  }

}
</script>

<style scoped>
.title{
  margin: 10px;
  font-weight: bold;
  font-size: 1.1rem;
}
.chat_info{
  display: inline-flex;
}
.chat_info > *{
  margin-right: 10px;
}
input[type="checkbox"]:disabled{
  background-color: #00D0EA;

}
</style>