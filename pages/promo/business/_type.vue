<template>
<section>
  <Type1 :type="$route.params.type"/>

</section>
</template>

<script>
import Type1 from "../../../components/promo/BusinessType/Types/Type1";
export default {
  name: "type",
  components: {Type1}
}
</script>

<style scoped>

</style>