<template>
<section>

    <div  class="private_zone icons avatar_hovered text_hovered"   @click="show_submenu=!show_submenu">
      <div class="sigin_description menu__icon__text ">Личный<br>кабинет</div>
    </div>

  <div class="submenu on_top_200" v-if="show_submenu" >
    <div class="dropdown_forward">
      <ul class="content_block ">
        <li class="full__width">
          <nuxt-link class="full__width  std_link" to="/user/auth" >Личный кабинет
            <b v-if="$store.state.user.isAuth">{{$store.state.user.email}}</b>
          </nuxt-link>
          <div class="close_submenu icon_base icon_close" @click="show_submenu=false"></div>
        </li>


        <li class="new__client" v-if="$store.state.user.isAuth">
          <div class="default__link" @click="logout">Выйти</div>
        </li>
        <li class="new__client" v-else>
          <nuxt-link to="/" class="default__link">Новый клиент?<br>Зарегистрироваться</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</section>
</template>

<script>
export default {
  name: "SignInButton",
  data(){
    return{
      show_submenu:false
    }
  },
  watch:{
    '$route.fullPath'(newVal){
      this.show_submenu = false
    },
    '$store.state.user.isAuth'(newVal){
      if(newVal == false)
       // this.$router.replace('/')
        location.reload()
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
.private_zone{
  cursor: pointer;

}
ul{
  list-style: none;
}
.submenu{
  position: absolute;

  width: 200px;
  height: 100px;
  margin-left: -50px;
}
.submenu.content_block{
  padding-right: 2px;
}
li{
  display: inline-flex;
}
.close_submenu{
  float: right;
}
.close_submenu:hover{
  cursor: pointer;

  color: rgb(255,72,0)
}
ul li{
  padding-bottom: 10px;
}
.sigin_description{
  margin-top: 32px;
  margin-left: -4px;
}
</style>