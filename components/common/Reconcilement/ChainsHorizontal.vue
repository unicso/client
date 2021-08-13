<template>
<section>
  <div class="tree horizontal" >
    <ul>
      <li  class="btn-std" >{{chains[0].user_name}} - {{chains[0].user_email}}</li>
      <li   class="btn-disabled" >
        <ul>
          <li  v-for="(item, index) in chains"  class="btn-std sub_item" v-if="index>0">
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
        </ul>
      </li>
      <li>Отправка поставщику</li>
    </ul>
  </div>

</section>
</template>

<script>
export default {
  name: "ChainsHorizontal",
  props:[
      'chains'
  ]
}
</script>

<style scoped>

</style>