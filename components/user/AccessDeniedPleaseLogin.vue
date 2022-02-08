<template>
<section v-if="show!=false">
  <h2>Доступ к странице ограничен.</h2>
  <h3>Пожалуйста, <nuxt-link to="/user/auth" class="default__link">авторизуйтесь</nuxt-link></h3>

</section>
</template>

<script>
export default {
  name: "AccessDeniedPleaseLogin",

  data(){
    return{
      show:false
    }
  },

  mounted() {
    setTimeout(()=>this.show=true, 1000)

  }

}
</script>

<style scoped>
h2,h3{
  text-align: center;
}
</style>