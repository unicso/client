<template>
<section v-if="show_component">
  <sa-menu/>

  <sa-users v-if="$route.params.sa_components == 'users'"/>
  <product-report  v-if="$route.params.sa_components == 'product_report'"/>
  <sa-chat  v-if="$route.params.sa_components == 'sachat'"/>
  <sa-config   v-if="$route.params.sa_components == 'config'"/>
</section>
<access-denied-please-login v-else/>
</template>

<script>
import SaMenu from "../../../../components/lk/sa/SaMenu";
import SaUsers from "../../../../components/lk/sa/SaUsers";
import ProductReport from "../../../../components/lk/sa/ProductReport";
import SaChat from "../../../../components/lk/sa/SaChat";
import AccessDeniedPleaseLogin from "../../../../components/user/AccessDeniedPleaseLogin";
import SaConfig from "../../../../components/lk/sa/SaConfig";
import OnlineHelperChatAdmin from "../../../../components/lk/sa/OnlineHelperChatAdmin";
export default {
  name: "sa_components",
  components: {OnlineHelperChatAdmin, SaConfig, AccessDeniedPleaseLogin, SaChat, ProductReport, SaUsers, SaMenu},
  data(){
    return{
      show_component:false
    }
  },
  watch:{
    '$store.state.user.type'(newVal){
      if(newVal>=100)
        this.show_component = true
    }

  },
  mounted() {
    if(this.$store.state.user.type >= 100)
      this.show_component = true
  }
}
</script>

<style scoped>

</style>