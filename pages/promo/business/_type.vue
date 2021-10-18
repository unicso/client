<template>
<section>
  <School v-if="$route.params.type=='school'"/>

</section>
</template>

<script>
import School from "../../../components/promo/BusinessType/Types/School";
export default {
  name: "_type",
  components: {School}
}
</script>

<style scoped>

</style>