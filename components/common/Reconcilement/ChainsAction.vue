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
                  <button class="btn-std base_shadow_hover" v-if="!show_decline_comment" @click="show_decline_comment=true">Отказать</button>
                  <div class="input__field" v-if="show_decline_comment">
                    <label>Комментарий:</label>
                    <textarea   v-model="comment"/>
                    <button class="btn-std base_shadow_hover" @click="declineOrder" >Отказать</button>



                  </div>

                </div>
              </div>
            </li>
            <li :class="[(chain_data.next_chain===true?'active':'')]">Отправка поставщику</li>
          </ul>
        </div>


      </div>
      <div class="" v-if="chain_data.type === 'horizontal'">

        <div class="tree horizontal" >
          <ul>
            <li  class="btn-std" :class="[chain_data.chains[0].success?'active':'base_shadow_hover']">{{chain_data.chains[0].user_name}} - {{chain_data.chains[0].user_email}}</li>
            <li   class="btn-disabled" >
              <ul>
                <li  v-for="(item, index) in chain_data.chains"  class="btn-std sub_item" :class="[item.success?'active':'base_shadow_hover']" v-if="index>0">
                  {{item.user_name}} - {{item.user_email}}
                        <div v-if="show_accept_menu
                        && item.user_email == $store.state.user.email
                        && !item.success ">

                          <div class="accept_menu">
                            <br>
                            <button class="btn-std base_shadow_hover" @click="acceptOrder">Согласовать</button>
                            <button class="btn-std base_shadow_hover" v-if="!show_decline_comment" @click="show_decline_comment=true">Отказать</button>
                            <div class="input__field" v-if="show_decline_comment">
                              <label>Комментарий:</label>
                              <textarea   v-model="comment"/>
                              <button class="btn-std base_shadow_hover" @click="declineOrder" >Отказать</button>



                            </div>

                          </div>
                        </div>

                </li>
              </ul>
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
      show_decline_comment:false,
      comment:''
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
    },
    async declineOrder(){
      const result = await this.$store.dispatch('api/get',{endpoint:'lk/reconcilement/order/'+ this.chain_data.order + '/false?comment=' + this.comment})

     console.log(result)
      if(result.error == false)
      {
        location.reload()
      }
    },



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