<template>
<section v-if="show_component">
  <sa-menu/>

  <sa-users v-if="$route.params.sa_components == 'users'"/>
  <product-report  v-if="$route.params.sa_components == 'product_report'"/>
  <sa-chat  v-if="$route.params.sa_components == 'sachat'"/>

  {{$store.state.user}}
</section>
</template>

<script>
import SaMenu from "../../../../components/lk/sa/SaMenu";
import SaUsers from "../../../../components/lk/sa/SaUsers";
import ProductReport from "../../../../components/lk/sa/ProductReport";
import SaChat from "../../../../components/lk/sa/SaChat";
export default {
  name: "sa_components",
  components: {SaChat, ProductReport, SaUsers, SaMenu},
  data(){
    return{
      show_component:false
    }
  },
  mounted() {
    if(this.$store.state.user.type != 100)
      this.$router.push('/user/auth')
    else
      this.show_component = true
  }
}
</script>

<style scoped>

</style>