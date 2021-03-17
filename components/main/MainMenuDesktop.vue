<template>
<div class="main_menu_desktop ">
  <ul>
    <li class="logo">
      <nuxt-link to="/">
        <img src="/files/client/images/logo.png"/>
          <div>
            <p>
              <b>ЮНИКСО</b>
            </p>
          </div>
      </nuxt-link>
    </li>

    <li class="search"  >
      <p>
        <input class="base_shadow_hover" type="text" name="search" placeholder="Поиск" v-model="search_string" v-on:keyup.enter="search">
        <i class="search_svg_icon" v-html="$store.state.icons.search" @click="search"></i>
      </p>
    </li>
    <li>

        <select-fonts/>

    </li>

    <li v-if="!$store.state.user.isAuth">
      <p>
        <nuxt-link to="/user/auth" class="btn-blick base_shadow_hover">Личный кабинет (1)</nuxt-link>
      </p>
    </li>
    <li v-else>
      <p>
        <nuxt-link to="/user/profile" class="btn-blick base_shadow_hover">Личный кабинет (1)</nuxt-link>
      </p>
    </li>


    <li v-if="!$store.state.user.isAuth">
      <p>
        <nuxt-link to="/user/auth" class="btn-std base_shadow_hover">Личный кабинет (2)</nuxt-link>
      </p>
    </li>
    <li v-else>
      <p>
        <nuxt-link to="/user/profile" class="btn-std base_shadow_hover">Личный кабинет (2)</nuxt-link>
      </p>
    </li>


  </ul>


</div>
</template>

<script>
import SelectFonts from "../dev/SelectFonts";
export default {
name: "MainMenuDesktop",
  components:{
  SelectFonts
  },
  data(){
    return{
    search_string:''
    }
  },
  methods:{

  async search()
  {
      this.$router.push({path:'/main/search', query:{search_string:this.search_string}})
  }


  }


}
</script>
<style>

</style>
<style scoped>
.main_menu_desktop{

}
ul{
  list-style: none;
  margin: 0px;
  padding: 0px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

}
ul{
  display: grid;
  grid-template-columns: 1fr 2fr 1fr  1fr 1fr;
  width: 100%;
}
.logo a{
  width: 150px;
  display: grid;
  grid-template-columns: 50px 100px;


}
.logo img{

  max-width: 50px;
  max-height: 50px;

}
.search p{
  display: flex;
  opacity: 0.7;

}
.search p input:focus{
  opacity: 1;
}
.search p input{
  float: left;
}

li p{
  display: flex;
  justify-content: center;

}

.main_menu_fixed{
  display: flex;
  position: fixed;
  left: 0px;
  width: 100%;
  z-index: 102;
  top:0px;
  animation: 1s forwards ease-in;
  background-color: white;

  transition: 0.1s;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}
.main_menu{

  width: 100%;
 /* box-shadow: 0 1px 10px rgba(0,0,0,0.5);*/
}
</style>