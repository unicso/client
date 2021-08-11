<template>
  <section>
      <div class="" v-if="chain_data.type === 'vertical'">
        <div class="tree vertical">
          <ul>
            <li  v-for="item in chain_data.chains" class="btn-std "
            :class="[item.success?'active':'base_shadow_hover']"
            >
              {{item.user_name}} - {{item.user_email}}

              <div v-if="
              show_accept_menu
                  && item.role == chain_data.current_user_chain.role
                && chain_data.next_chain.role <= chain_data.current_user_chain.role
                ">

                <div class="accept_menu">
                  <br>
                  <button class="btn-std base_shadow_hover" @click="acceptOrder">Согласовать</button>
                  <button class="btn-std base_shadow_hover">Отказать</button>


                </div>
              </div>
            </li>
            <li :class="[(chain_data.next_chain===true?'active':'')]">Отправка поставщику</li>
          </ul>
        </div>


      </div>

  </section>
</template>

<script>
export default {
  name: "ChainsAction",
  props:[
      'chain_data'
  ],
  data(){
    return{
      show_accept_menu:true,

    }
  },
  methods:{

    async acceptOrder(){
      const result = await this.$store.dispatch('api/get',{endpoint:'lk/reconcilement/order/'+ this.chain_data.order + '/true'})
      console.log(result)

      if(result.error == false)
      {
        location.reload()

      }

    }

  }

}
</script>

<style scoped>
li.active.btn-std{
  cursor: context-menu;
  cursor: no-drop;

}
li{

}


</style>