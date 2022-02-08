<template>
  <section>
    <section class="online_helper"   :class="[show_helper]">
    <header >
      <div class="chat_title" @click="show_helper='show'">Онлайн-помощник</div>
      <div class="chat_close icon_close_std" v-show="show_helper=='show'" @click="show_helper='hide'"></div>
    </header>
    <transition>
      <main v-show="show_helper" :class="[show_helper?'show_main':'hide_main']">
      <nav>
        <li @click="type='faq'" :class="[type=='faq'?'active':'']">
          <div class="chat_icon chat_icon_question"></div>
          <div class="text">Частые вопросы</div>
        </li>
        <li @click="type='chat'" :class="[type=='chat'?'active':'']">
          <div class="chat_icon chat_icon_chat"></div>
          <div class="text">Онлайн чат</div>
        </li>
        <li @click="type='contacts'" :class="[type=='contacts'?'active':'']">
          <div class="chat_icon chat_icon_contacts"></div>
          <div class="text">Контакты</div>
        </li>

      </nav>
      <online-helper-chat v-if="type=='chat'"/>
      <online-helper-faq v-if="type=='faq'"/>
      <online-helper-contacts v-if="type=='contacts'"/>
    </main>
    </transition>


  </section>

    <transition>
  <section class="helper_button"
           @click="show_helper=true"
           v-show="!show_helper && 2==3"
           :class="[!show_helper?'':'hide_button']">
    Онлайн помощник
  </section>
    </transition>
  </section>
</template>

<script>
import OnlineHelperChat from "./OnlineHelperChat";
import OnlineHelperFaq from "./OnlineHelperFaq";
import OnlineHelperContacts from "./OnlineHelperContacts";
export default {
  name: "OnlineHelper",
  components: {OnlineHelperContacts, OnlineHelperFaq, OnlineHelperChat},
  data() {
    return {
      type:'faq',
      show_helper:'',
      first_load:true

    }
  },
  watch:{
  "$route.fullPath"(newVal){

    if(newVal == '/info/support')
      this.show_helper='hide'

  }
  },
  mounted() {

  },
  methods: {



  }


}
</script>

<style scoped>
.online_helper{
  position: fixed;
  right: 10px;
  height: 500px;
  background-color: white;
  box-shadow: 0 0 10px var(--base-color);
  overflow: hidden;

  bottom: -470px;
  width: 150px;
  border: 3px;
  border-radius: 3px;
  background-color: var(--base-color);
  color: white;
}
header:hover{
  cursor: pointer;
}
.show header:hover{
  cursor: inherit;
}
.chat_title{
  padding-top: 10px;
}
.hide{
  animation: 1s hide_help forwards;


}
.first_load{

  transition: 1s ease-in;
  opacity: 1;
}
.show{
  animation: 1s show_help forwards;
}
.show_main{
  opacity: 1;

}
.hide_main{
  transition: 1s ease-in-out;
}
@keyframes show_help {
  0%{
    bottom: -465px;
    width: 150px;
    border: 3px;
    border-radius: 3px;
    background-color: var(--base-color);
    color: white;
  }
  30%{
    width: 300px;
    bottom: -465px;
    border: 3px;
    border-radius: 20px;
    background-color: white;
    color: black;
  }
  100%{
    bottom: 10px;
    width: 300px;
    border-radius: 20px;
    background-color: white;
    color: black;
  }



}
@keyframes hide_help {
  0%{
    bottom: 10px;
    width: 300px;
    border-radius: 20px;
    background-color: white;
    color: black;
  }

  70%{
    width: 300px;
    bottom: -465px;
    border: 3px;
    border-radius: 20px;
    background-color: white;
    color: black;
  }
  100%{
    bottom: -465px;
    width: 150px;
    border-radius: 3px;
    background-color: var(--base-color);
    color: white;
  }
}



.helper_button:hover{
  cursor: pointer;
}
.online_helper header{
  text-align: center;


}
nav{
  list-style: none;
  justify-content: space-around;
  display: flex;
  margin-top: 10px;
}
nav li{
  display: inline-flex;
  border-bottom: 4px solid rgba(0,0,0,0.5);
  width: 100%;
  font-size: smaller;
  text-align: center;
  justify-content: inherit;
  transition: 0.3s ease-in-out;

}
nav li.active{
  border-bottom: 4px solid var(--base-color-o08);
}
nav li:hover{
  cursor: pointer;
}
.chat_icon{
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-left: 5px;
  transition: 0.3s ease-in-out;
}
.active{
  transition: 0.3s ease-in-out;
}
.chat_icon_question{
  background-image: url("/files/client/images/chat/question_black.png");

}
.chat_icon_chat{
  background-image: url("/files/client/images/chat/chat_black.png");
}
.chat_icon_contacts{
  background-image: url("/files/client/images/chat/contacts_black.png");
}

.active .chat_icon_question {
  background-image: url("/files/client/images/chat/question_orange.png");
}
.active .chat_icon_chat{
  background-image: url("/files/client/images/chat/chat_orange.png");
}
.active .chat_icon_contacts{
  background-image: url("/files/client/images/chat/contacts_orange.png");
}
.chat_title, .chat_close{
  display: inline-flex;
}
.chat_close{
  position: absolute;
  width: 30px;
  height: 30px;
  right: -5px;
  top: -5px;
  align-items: center;
  justify-items: center;
  border-bottom-left-radius: 10px;
  padding-left: 5px;
  padding-top: 3px;
  background-color: var(--base-color);
  transition: 0.3s ease-in-out;
}
.chat_close:hover:hover{
  cursor: pointer;
  color: white;
  transition: 0.3s ease-in-out;
}

</style>