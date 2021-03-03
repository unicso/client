<template>
  <div class="wrapper">
<main-menu-desktop/>
      <Nuxt/>


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

        }
  },
  mounted() {
    this.login()
  },
  methods:{


    async login(){
      var params ={
        'username':'123',
        'password':'123'
      };
      const response = await this.$store.dispatch('api/put',{'endpoint':'user/auth', 'params':params});
      console.log(response)
      if(response.is_guest == false)
      {
        this.$store.commit('user/login', response.body)
      }

    }
  }
}
</script>
<style>

</style>
