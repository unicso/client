<template>
<section v-if="show_component">
  <client-menu/>

  <client-profile  v-if="$route.params.client_components == 'profile'"/>
  <client-orders   v-if="$route.params.client_components == 'orders'"/>
  <client-reconcilement v-if="$route.params.client_components == 'reconcilement'"/>
</section>
  <access-denied-please-login v-else/>
</template>

<script>


import ClientMenu from "../../../../components/lk/client/ClientMenu";
import ClientProfile from "../../../../components/lk/client/ClientProfile";
import ClientOrders from "../../../../components/lk/client/ClientOrders";
import ClientReconcilement from "../../../../components/lk/client/ClientReconcilement";
import AccessDeniedPleaseLogin from "../../../../components/user/AccessDeniedPleaseLogin";
export default {
  name: "client_components",
  components: {AccessDeniedPleaseLogin, ClientReconcilement, ClientOrders, ClientProfile, ClientMenu},
  data(){
    return{
      show_component:false
    }
  },
  watch:{
    '$store.state.user.type'(newVal){
      if(newVal>=10)
        this.show_component = true
    }

  },
  mounted() {
    if(this.$store.state.user.type >= 10)
      this.show_component = true
  }
}
</script>

<style scoped>

</style>