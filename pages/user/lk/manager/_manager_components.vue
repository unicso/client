<template>
<section v-if="show_component">
  <manager-menu/>

  <manager-clients v-if="$route.params.manager_components == 'clients'"/>
  <manager-reconcilement v-if="$route.params.manager_components == 'reconcilement'"/>
  <manager-orders  v-if="$route.params.manager_components == 'orders'"/>

  <client-info v-if="$route.params.manager_components == 'client_edit'" :user="$route.query.user"/>
  <edit-price-type  v-if="$route.params.manager_components == 'edit_price_type'" :user="$route.query.type"/>
</section>
<access-denied-please-login v-else/>
</template>

<script>

import ManagerMenu from "../../../../components/lk/manager/ManagerMenu";
import ManagerClients from "../../../../components/lk/manager/ManagerClients";
import ManagerReconcilement from "../../../../components/lk/manager/ManagerReconcilement";
import AccessDeniedPleaseLogin from "../../../../components/user/AccessDeniedPleaseLogin";
import ClientInfo from "../../../../components/lk/manager/ClientInfo";
import EditPriceType from "../../../../components/lk/manager/EditPriceType";
import ManagerOrders from "../../../../components/lk/manager/ManagerOrders";
export default {
  name: "manager_components",
  components: {
    ManagerOrders,
    EditPriceType, ClientInfo, AccessDeniedPleaseLogin, ManagerReconcilement, ManagerClients, ManagerMenu},
  data(){
    return{
      show_component:false
    }
  },
  watch:{
    '$store.state.user.type'(newVal){
      if(newVal>=50)
        this.show_component = true
    }

  },
  mounted() {
    if(this.$store.state.user.type >= 50)
      this.show_component = true
  }
}
</script>

<style scoped>

</style>