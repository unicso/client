<template>
<section>
  <div class="tree vertical">
    <ul>
      <li  v-for="item in chains" class="btn-std">{{item.user_name}} - {{item.user_email}}</li>
      <li>Отправка поставщику</li>
    </ul>
  </div>

</section>
</template>

<script>
export default {
  name: "ChainsVertical",
  props:[
      'chains'
  ]
}
</script>

<style scoped>

</style>