<template>
<div class="info_page">

  <politika-konfidentsialnosti v-if="$route.params.cef_name=='politika-konfidentsialnosti'"/>
  <contacts v-if="$route.params.cef_name=='contacts'"/>
  <about-us  v-if="$route.params.cef_name=='about'"/>
  <delivery-page  v-if="$route.params.cef_name=='delivery'"/>
  <payment-page   v-if="$route.params.cef_name=='payment'"/>
  <client-support v-if="$route.params.cef_name=='support'"/>

</div>

</template>

<script>

import PolitikaKonfidentsialnosti from "../../components/info/PolitikaKonfidentsialnosti";
import Contacts from "../../components/info/Contacts";
import AboutUs from "../../components/info/AboutUs";
import Delivery from "../../components/info/DeliveryPage";
import DeliveryPage from "../../components/info/DeliveryPage";
import PaymentPage from "../../components/info/PaymentPage";
import ClientSupport from "../../components/info/ClientSupport";
export default {


name: "cef_name",
  components: {ClientSupport, PaymentPage, DeliveryPage, AboutUs, Contacts, PolitikaKonfidentsialnosti}
}
</script>

<style >
.info_page > * {
  width: 900px;
  margin: 0 auto;
}
</style>