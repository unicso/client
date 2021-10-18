<template>
<section>

    <action-component-type-a :item="item" v-if="item!=false"/>
  <hr>
    <action-component-type-a :item="item2" v-if="item2!=false"/>

</section>
</template>

<script>
import ActionComponentTypeA from "../../components/promo/Sales/ActionComponentTypeA";
import ActionComponentTypeB from "../../components/promo/Sales/ActionComponentTypeB";
export default {
  name: "action",
  components: {ActionComponentTypeB, ActionComponentTypeA},
  data(){
    return{
      item:false,
      item2:false
    }
  },
  mounted() {
    this.loadItem()
  },
  methods:{
    async loadItem()
    {
      const result = await this.$store.dispatch('api/get', {endpoint:'shop/item/8165'})
      const result2 = await this.$store.dispatch('api/get', {endpoint:'shop/item/22374'})

      if(result.error==false)
      {
        this.item = result.body.products
        this.item.expired = "2021-09-28"
      }
      if(result2.error==false)
      {
        this.item2 = result2.body.products
        this.item2.expired = "2021-09-30"
      }


    }
  }

}
</script>

<style scoped>

</style>