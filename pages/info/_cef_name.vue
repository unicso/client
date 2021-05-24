<template>
<div>

  <politika-konfidentsialnosti v-if="$route.params.cef_name=='politika-konfidentsialnosti'"/>
  <contacts v-if="$route.params.cef_name=='contacts'"/>
  <about-us  v-if="$route.params.cef_name=='about'"/>

</div>

</template>

<script>

import PolitikaKonfidentsialnosti from "../../components/info/PolitikaKonfidentsialnosti";
import Contacts from "../../components/info/Contacts";
import AboutUs from "../../components/info/AboutUs";
export default {


name: "_cef_name",
  components: {AboutUs, Contacts, PolitikaKonfidentsialnosti}
}
</script>

<style scoped>

</style>