<template>
  <section class="smart_services">
    <cartridge-selection v-if="$route.params.name=='cartridge-selection'"/>
    <smart-ohrana  v-if="$route.params.name=='smart-ohrana'"/>
    <smart-skud   v-if="$route.params.name=='smart-skud'"/>
    <smart-request v-if="$route.params.name=='smart-request'"/>

  </section>
</template>

<script>
import CartridgeSelection from "../../components/smart/CartridgeSelection";
import SmartOhrana from "../../components/smart/SmartOhrana";
import SmartSkud from "../../components/smart/SmartSkud";
import SmartRequest from "../../components/smart/SmartRequest";
export default {
  name: "smart",
  components: {SmartRequest, SmartSkud, SmartOhrana, CartridgeSelection},

  mounted() {
    this.$store.state.helper.smart_request.subject = this.$route.query.name
  }
}
</script>

<style>
.smart_services h1{
  font-size: 1.5rem;

}
</style>