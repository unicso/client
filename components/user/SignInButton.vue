<template>
<section>

    <div class="as-text  text_hovered" v-if="astext" @click="show_submenu=!show_submenu">
      <div v-if="!$store.state.user.isAuth" class="sigin_description" >Личный кабинет</div>
      <div v-else class=" ">{{$store.state.user.name}}</div>
    </div>
    <div v-else  class="private_zone icons avatar_hovered text_hovered"   @click="show_submenu=!show_submenu">
      <div v-if="!$store.state.user.isAuth" class="sigin_description menu__icon__text " >Личный<br>кабинет</div>
      <div v-else class="sigin_description menu__icon__text ">{{$store.state.user.name}}</div>
    </div>

  <div class="submenu on_top_200" v-if="show_submenu" @mouseleave="show_submenu=false">
    <div class="dropdown_forward">
      <ul class="content_block ">
        <li class="full__width">
          <nuxt-link class="full__width  std_link" to="/user/auth" >Личный кабинет</nuxt-link>
          <div class="close_submenu icon_base icon_close" @click="show_submenu=false"></div>

        </li>
        <li>
          <nuxt-link to="/catalog/favorits">Избранное</nuxt-link>
        </li>
        <li v-if="2==3">
          <select-price-type />

        </li>
        <li class="new__client" v-if="$store.state.user.isAuth">
          <div class="default__link" @click="logout">Выйти</div>
        </li>
        <li class="new__client" v-else>
          <nuxt-link to="/user/registration" class="default__link">Новый клиент?<br>Зарегистрироваться</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</section>
</template>

<script>
import SelectPriceType from "../lk/client/SelectPriceType";
export default {
  name: "SignInButton",
  components: {SelectPriceType},
  props:['astext'],
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
        this.$cookies.removeAll();
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
/*  height: 100px;*/
  margin-left: -50px;
}
.submenu.content_block{
  padding-right: 2px;
}
li{
  /*display: inline-flex;*/
}
.close_submenu{
  float: right;
}
.close_submenu:hover{
  cursor: pointer;

  color: var(--base-color)
}
ul li{
  padding-bottom: 10px;
}
.private_zone .sigin_description{
  margin-top: 32px;
  width: 64px;
  position: absolute;
  margin-left: -16px;
  text-align: center;

}
.as-text{
  font-size: inherit;
  margin: inherit;
  display: block;
}
.as-text:hover{
  cursor: pointer;
}
.as-text .sigin_description{

  margin-left: -16px;
  text-align: center;

}
.submenu{
  font-size: 1em;
}
.submenu{

  box-shadow: 0 0 5px 2px rgb(0 0 0 / 20%);
  border-radius: 7px;
  margin-top: 10px;
  z-index: 600;
}
.content_block{
  margin: 0;
}
</style>