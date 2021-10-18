<template>
  <section>
    <cartridge-selection v-if="$route.params.name=='cartridge-selection'"/>

  </section>
</template>

<script>
import CartridgeSelection from "../../components/smart/CartridgeSelection";
export default {
  name: "smart",
  components: {CartridgeSelection},
}
</script>

<style scoped>

</style>