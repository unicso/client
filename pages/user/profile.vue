<template>
<div class="user_profile">
  <h1>Личный кабинет</h1>
<br>
  <button @click="logout" class="">Выйти</button>
</div>
</template>

<script>
export default {
  name: "profile",

  mounted() {
    if(!this.$store.state.user.isAuth)
      this.$router.replace('/user/auth')
  },
  watch:{
    '$store.state.user.isAuth'(newVal){
      if(newVal == false)
        this.$router.replace('/')
    }
  },
  methods:{

    async logout()
    {
      const result = await this.$store.dispatch('api/delete', {endpoint:'user/auth'});

      if(result.is_guest)
      {
        this.$store.commit('user/logout');
      }

    }
  }

}
</script>

<style scoped>

</style>