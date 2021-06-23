<template>
<section>
  <sa-menu/>

  <sa-users v-if="$route.params.sa_components == 'users'"/>
  {{$route.params}}
</section>
</template>

<script>
import SaMenu from "../../../../components/lk/sa/SaMenu";
import SaUsers from "../../../../components/lk/sa/SaUsers";
export default {
  name: "sa_components",
  components: {SaUsers, SaMenu}
}
</script>

<style scoped>

</style>