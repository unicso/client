<template>
  <div class="wrapper">
    <div class="warning"></div>
    <div class="show__alert">
      Ваш браузер устарел и не соответствует требованиям безопасности, а так же не позволяет полноценно использовать сайт.
    </div>
  <div class="content">
    <header class="main_menu_desktop" ref="main_menu_desktop">
      <main-menu-desktop/>
    </header>
    <header class="main_menu_mobile">
      <main-menu-mobile />
    </header>

    <main >
      <div >
        <product-category v-if="2==3" />
        <left-banners  v-if="two_columns"/>
      </div>
      <section  class="nuxt__content" :class="{'nuxt__content__two_columns':two_columns}">
        <div class="empty_block" ></div>
        <Nuxt class=""/>
      </section>
    </main>

  </div>






    <footer-component class="footer_desktop"/>
    <div v-if="scroll_to_top_show" class="scroll_to_top" v-html="$store.state.icons.scroll_up" @click="scrollToTop"></div>
    <socket-chat v-if="$store.state.config.show_chat && 2==3"/>
    <online-helper v-if="$store.state.config.show_chat  && 2==3"/>

    <select-price-type :show="false"/>
  </div>
</template>
<script>
import MainMenuDesktop from "../components/main/MainMenuDesktop";
import FooterComponent from "../components/main/FooterComponent";
import MainMenuMobile from "../components/main/MainMenuMobile";
import ProductCategory from "../components/main/ProductCategory";
import LeftBanners from "../components/main/LeftBanners";
import SocketChat from "../components/common/chat/SocketChat";
import OnlineHelper from "../components/common/chat/OnlineHelper";
import SelectPriceType from "../components/lk/client/SelectPriceType";


export default {
  name: "default.vue",
  head:{
    title:'Юниксо - надежный помощник Вашего бизнеса',
    meta:[

    ]
  },
  components:{
    SelectPriceType,
    OnlineHelper,
    SocketChat,
    LeftBanners,
    ProductCategory,
    MainMenuMobile,
    FooterComponent,
    MainMenuDesktop
  },

  data(){
        return{
          scroll_to_top_show:false,
          mainHeight:'100%',
          two_columns:false
         }
  },
  watch:{
    '$route.fullPath'(newVal){
      if(newVal == '/catalog/favorits')
        this.showTwoColumns()

    },
    "$route.name"(newVal){
      this.showTwoColumns();
    },
    "$store.state.user.isAuth"(newVal)
    {
      this.$store.dispatch('shop/fetchShopData')
      this.$store.dispatch('api/get', {endpoint:'lk/client/info'})
    },
    "$store.state.user.current_price_type"(newVal, oldVal)
    {
  //    if(typeof newVal == 'undefined' ||  newVal!=false)
 //       this.$store.state.user.current_price_type = false;

        this.$store.dispatch('shop/fetchShopData')
     // if(newVal!=oldVal)
        //location.reload()
    },

  },
  beforeMount() {

  },
  mounted() {
    this.login()
    this.$store.dispatch('shop/fetchShopData')


    this.$store.dispatch('config/getConfig')


    this.showTwoColumns();

 //   window.addEventListener('scroll', this.scroll);
  },

  methods: {
    showTwoColumns()
    {
      if(this.$route.name=='catalog-catalog' && this.$route.path!='/catalog/favorits')
        this.two_columns = true;
      else
        this.two_columns = false;

      console.log(this.$route.name)
    },

    scrollToTop() {
     var position = window.pageYOffset-100
      if(position>2000)
        var offset = 200
      else
        var offset = 50
      window.scrollTo(0, position-offset)
        if (window.pageYOffset > 0) {requestAnimationFrame(this.scrollToTop)}



    },

    async login() {
      var params = {
        'username': '',
        'password': ''
      };
      const response = await this.$store.dispatch('api/put', {'endpoint': 'user/auth', 'params': params});

      if (response.is_guest == false) {
        this.$store.commit('user/login', response.body)
      }

    },

    scroll(person) {


      window.onscroll = () => {
        //let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;


      }



    }
  }
}
</script>
<style>
.scroll_to_top{
  cursor: pointer;
  position: fixed;
  right: 10px;
  bottom: 0px;
  opacity: 0.2;
}
.content {
  min-height: calc(100vh - 70px);
  min-height: 1000px;
}
footer {
 /* height: 30px;*/
}
.nuxt__content{
  min-height: 1200px;
  margin-left: 10px;
}
.empty_block{
  width: 10px;
  display: none;
}
.main_page{
  width: 100%;
}
.nuxt__content__two_columns{
  grid-template-columns: minmax(300px, 1fr) minmax(500px, 4fr);
}
.nuxt__content__two_columns .empty_block{

  display: flex;
}
</style>
