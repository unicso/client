<template>
<section>
  <manager-menu/>

  <manager-clients v-if="$route.params.manager_components == 'clients'"/>
  <manager-reconcilement v-if="$route.params.manager_components == 'reconcilement'"/>

</section>
</template>

<script>

import ManagerMenu from "../../../../components/lk/manager/ManagerMenu";
import ManagerClients from "../../../../components/lk/manager/ManagerClients";
import ManagerReconcilement from "../../../../components/lk/manager/ManagerReconcilement";
export default {
  name: "manager_components",
  components: {ManagerReconcilement, ManagerClients, ManagerMenu},
  data(){
    return{
      show_component:false
    }
  },
  mounted() {
    if(this.$store.state.user.type != 50)
      this.$router.push('/user/auth')
    else
      this.show_component = true
  }
}
</script>

<style scoped>

</style>