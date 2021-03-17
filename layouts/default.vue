<template>
  <div class="wrapper">


    <main-menu-desktop :class="[scroll_to_top_show?'main_menu_fixed':'main_menu']"/>
      <Nuxt/>
  <div v-if="scroll_to_top_show" class="scroll_to_top" v-html="$store.state.icons.scroll_up" @click="scrollToTop"></div>

  </div>
</template>
<script>
import MainMenuDesktop from "../components/main/MainMenuDesktop";


export default {
  name: "default.vue",
  components:{
    MainMenuDesktop
  },
  data(){
        return{
          scroll_to_top_show:false,

         }
  },
  beforeMount() {

  },
  mounted() {
    this.login()
    this.$store.dispatch('shop/fetchShopData')

    this.scroll()

  },

  methods: {

    scrollToTop() {
      window.scrollTo(0, 0);
    },

    async login() {
      var params = {
        'username': '123',
        'password': '123'
      };
      const response = await this.$store.dispatch('api/put', {'endpoint': 'user/auth', 'params': params});
      console.log(response)
      if (response.is_guest == false) {
        this.$store.commit('user/login', response.body)
      }

    },

    scroll(person) {
      window.onscroll = () => {
        //let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if(window.pageYOffset>=10)
        {
          this.scroll_to_top_show = true;

        }
        if(window.pageYOffset<10)
        {
          this.scroll_to_top_show = false;

        }

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

</style>
