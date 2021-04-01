<template>
<div>

  <politika-konfidentsialnosti v-if="$route.params.cef_name=='politika-konfidentsialnosti'"/>
  <contacts v-if="$route.params.cef_name=='contacts'"/>


</div>

</template>

<script>

import PolitikaKonfidentsialnosti from "../../components/info/PolitikaKonfidentsialnosti";
import Contacts from "../../components/info/Contacts";
export default {


name: "_cef_name",
  components: {Contacts, PolitikaKonfidentsialnosti}
}
</script>

<style scoped>

</style>