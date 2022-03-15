<template>
  <section>

    <select v-model="$store.state.user.current_price_type" v-if="show"
            @change="setPriceType($store.state.user.current_price_type)"
    :disabled="disabled"
    >
      <option v-for="type in user_info.price_types" :value="type.price_type">{{type.price_type_name}}</option>
    </select>

  </section>
</template>

<script>
export default {
  name: "SelectPriceType",
  props:['show'],
  data() {
    return {
      user_info:false,
      current_price_type:false,
      disabled:false

    }
  },
  mounted() {
    this.getPriceType()
    this.getInfo()
  },
  watch:{
    "$store.state.user.current_price_type"(newVal)
    {
     //   this.setPriceType(newVal)
    //    this.$cookies.set('price_type', newVal)

    }

  },
  methods: {
    async getInfo()
    {
      this.disabled = true
      const result = await this.$store.dispatch('api/get', {endpoint:'lk/client/info'})

      if(result.error == false) {
        this.user_info = result.body
        this.disabled = false
        if(!this.$store.state.user.current_price_type)
        {
      //    this.setPriceType(this.user_info.price_types[0].price_type)


        }



      }
    },
    getPriceType(){
  //   this.current_price_type = this.$cookies.get('price_type')
  //    this.$store.state.user.current_price_type = this.$cookies.get('price_type')
    },
  async setPriceType(type)
    {
      const result = await this.$store.dispatch('api/get', {endpoint:'lk/client/pricetype/'+ type})


     // this.$cookies.set('price_type', type)
      this.$store.state.user.current_price_type = type

    }

  }


}
</script>

<style scoped>

</style>