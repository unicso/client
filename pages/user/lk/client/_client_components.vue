<template>
<section>
  <client-menu/>

  <client-profile  v-if="$route.params.client_components == 'profile'"/>
  <client-orders   v-if="$route.params.client_components == 'orders'"/>
  <client-reconcilement v-if="$route.params.client_components == 'reconcilement'"/>
</section>
</template>

<script>


import ClientMenu from "../../../../components/lk/client/ClientMenu";
import ClientProfile from "../../../../components/lk/client/ClientProfile";
import ClientOrders from "../../../../components/lk/client/ClientOrders";
import ClientReconcilement from "../../../../components/lk/client/ClientReconcilement";
export default {
  name: "client_components",
  components: {ClientReconcilement, ClientOrders, ClientProfile, ClientMenu},
  data(){
    return{
      show_component:false
    }
  },
  mounted() {
    setTimeout(()=>this.checkRedirect(), 1000)
  },
  methods:{
    checkRedirect(){
      if(this.$store.state.user.type != 10)
        this.$router.push('/user/auth')
      else
        this.show_component = true
    }
  }
}
</script>

<style scoped>

</style>