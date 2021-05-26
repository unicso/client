<template>
<div>

  <politika-konfidentsialnosti v-if="$route.params.cef_name=='politika-konfidentsialnosti'"/>
  <contacts v-if="$route.params.cef_name=='contacts'"/>
  <about-us  v-if="$route.params.cef_name=='about'"/>
  <delivery-page  v-if="$route.params.cef_name=='delivery'"/>
  <payment-page   v-if="$route.params.cef_name=='payment'"/>
</div>

</template>

<script>

import PolitikaKonfidentsialnosti from "../../components/info/PolitikaKonfidentsialnosti";
import Contacts from "../../components/info/Contacts";
import AboutUs from "../../components/info/AboutUs";
import Delivery from "../../components/info/DeliveryPage";
import DeliveryPage from "../../components/info/DeliveryPage";
import PaymentPage from "../../components/info/PaymentPage";
export default {


name: "_cef_name",
  components: {PaymentPage, DeliveryPage, AboutUs, Contacts, PolitikaKonfidentsialnosti}
}
</script>

<style scoped>

</style>