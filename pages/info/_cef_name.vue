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
  components: {ClientSupport, PaymentPage, DeliveryPage, AboutUs, Contacts, PolitikaKonfidentsialnosti},

  head() {
    return {
      title: this.fetchedData.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.fetchedData.description
        },
        { property:"og:title", content:this.fetchedData.title},
        { property:"og:description", content:this.fetchedData.description},
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.fetchedData.keywords
        },

      ]
    }
  },

  asyncData(context) {
    let endpoint
    if(process.env.API_SERVER!=undefined)
       endpoint = process.env.API_SERVER + '/v1/config/seo?page=' + context.route.fullPath;
    else
       endpoint = '/config/seo?page=' + context.route.fullPath;


    return context.$axios
        .get(endpoint)
        .then((res) => {
          if(res.data.error==false)
            return { fetchedData: res.data.body }
          else
            return {fetchedData: {title:'Юниксо - надежный помощник Вашего бизнеса', description:'Компания ООО «Юниксо» осуществляет коммерческую деятельность, ориентированную на предоставление заказчикам комплексных решений по планированию, разработке, обеспечению и управлению процессами закупочной деятельности организаций'}}
        })
        .catch((err)=>{
          return {fetchedData: {title:'Юниксо - надежный помощник Вашего бизнеса', description:'Компания ООО «Юниксо» осуществляет коммерческую деятельность, ориентированную на предоставление заказчикам комплексных решений по планированию, разработке, обеспечению и управлению процессами закупочной деятельности организаций'}}
        })
  },




}
</script>

<style >
.info_page > * {
  width: 900px;
  margin: 0 auto;
}
</style>