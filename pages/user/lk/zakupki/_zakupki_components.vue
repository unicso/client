<template>
<section v-if="show_component">
  <zakupki-menu/>

  <product-report  v-if="$route.params.zakupki_components == 'product_report'"/>
  <zakupki-chat v-if="$route.params.zakupki_components == 'chat'"/>
  <sa-config   v-if="$route.params.zakupki_components == 'config'"/>



</section>
<access-denied-please-login v-else/>
</template>

<script>


import AccessDeniedPleaseLogin from "../../../../components/user/AccessDeniedPleaseLogin";
import ZakupkiMenu from "../../../../components/lk/zakupki/ZakupkiMenu";
import ProductReport from "../../../../components/lk/sa/ProductReport";
import SaChat from "../../../../components/lk/sa/SaChat";
import SaConfig from "../../../../components/lk/zakupki/SaConfig";
import ZakupkiChat from "../../../../components/lk/zakupki/ZakupkiChat";
export default {
  name: "zakupki_components",
  components: {
    ZakupkiChat,
    SaConfig,
    SaChat,
    ProductReport, ZakupkiMenu, AccessDeniedPleaseLogin},
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