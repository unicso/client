<template>
<section>
  <h1>Чаты с пользователями</h1>
  <ul>
    <li v-for="item in chats">
      <nuxt-link :to="'/user/lk/sa/sachat?chat=' + item.GUID + '&id='+item.id" >Чат № {{item.id}} - new_O({{item.new_o}}) - new_C({{item.new_c}})</nuxt-link>
    </li>
    
  </ul>


  <sa-chat-win :chat="$route.query.chat" />

  <pre>

  </pre>
</section>
</template>

<script>
import SaChatWin from "../../common/chat/SaChatWin";
export default {
  name: "SaChat",
  components: {SaChatWin},
  data(){
    return{
        chats:{},
        show_chat:false
    }
  },




  mounted() {
    setInterval(()=>{this.getChats()}, 5000)
  },

  methods:{
    async getChats(){
      const result = await this.$store.dispatch('api/post', {endpoint:'support/chat/manager'})

      this.chats = result.body


    }

  }

}
</script>

<style scoped>

</style>