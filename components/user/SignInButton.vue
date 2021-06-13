<template>
<section>

    <div  class="private_zone icons avatar_hovered text_hovered"   @click="show_submenu=!show_submenu">
      <div class="sigin_description menu__icon__text ">Личный<br>кабинет</div>
    </div>

  <div class="submenu " v-if="show_submenu" >
    <div class="dropdown_forward">
      <ul class="content_block ">
        <li class="full__width"><nuxt-link class="full__width" to="/user/auth" >Личный кабинет</nuxt-link> <div class="close_submenu icon_base icon_close" @click="show_submenu=false"></div></li>

        <li class="new__client">
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

  methods:{


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
  z-index: 200;
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