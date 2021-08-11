<template>
<section>
  <div class="tree horizontal" >
    <ul>
      <li  class="btn-std" >{{chains[0].user_name}} - {{chains[0].user_email}}</li>
      <li   class="btn-disabled" >
        <ul>
          <li  v-for="(item, index) in chains"  class="btn-std sub_item" v-if="index>0">{{item.user_name}} - {{item.user_email}}</li>
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