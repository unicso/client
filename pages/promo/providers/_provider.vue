<template>
<section>
  <h1>Промо</h1>
<promo-component  :file="'/files/client/promo/providers/Акустические решения toFORM.pdf'"/>

<logo-animated :width="'200px'" :height="'200px'"/>


</section>
</template>

<script>
import PromoComponent from "../../../components/promo/providers/PromoComponent";
import LogoAnimated from "../../../components/common/LogoAnimated";
export default {
  name: "provider",
  components: {LogoAnimated, PromoComponent},


  data(){
    return{

    }
  }
}
</script>

<style scoped>



</style>