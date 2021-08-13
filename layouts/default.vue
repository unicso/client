<template>
  <div class="wrapper">
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
        <product-category/>
        <left-banners  />
      </div>
      <section  class="nuxt__content">
        <div class="empty_block"></div>
        <Nuxt class=""/>
      </section>
    </main>

  </div>






    <footer-component class="footer_desktop"/>
    <div v-if="scroll_to_top_show" class="scroll_to_top" v-html="$store.state.icons.scroll_up" @click="scrollToTop"></div>

  </div>
</template>
<script>
import MainMenuDesktop from "../components/main/MainMenuDesktop";
import FooterComponent from "../components/main/FooterComponent";
import MainMenuMobile from "../components/main/MainMenuMobile";
import ProductCategory from "../components/main/ProductCategory";
import LeftBanners from "../components/main/LeftBanners";


export default {
  name: "default.vue",
  head:{

    meta:[

    ]
  },
  components:{
    LeftBanners,
    ProductCategory,
    MainMenuMobile,
    FooterComponent,
    MainMenuDesktop
  },

  data(){
        return{
          scroll_to_top_show:false,
          mainHeight:'100%'
         }
  },
  beforeMount() {

  },
  mounted() {
    this.login()
    this.$store.dispatch('shop/fetchShopData')


    this.$store.dispatch('config/getConfig')



 //   window.addEventListener('scroll', this.scroll);
  },

  methods: {


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
        'username': '123',
        'password': '123'
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
  margin-left: 10px;
}

</style>
