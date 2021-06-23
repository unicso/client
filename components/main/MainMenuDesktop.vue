<template>

    <div class="main_menu_desktop ">

      <div class="graph__menu2">
        <div class="logo">
          <nuxt-link to="/"> <div v-html="$store.state.icons.logotype_vertical"></div></nuxt-link>
        </div>

        <div class="menu__items">
          <div class="string__menu" :class="[fix_menu?'fixed_menu_string on_top_100':'']">
            <ul class=" " >
              <li><nuxt-link to="/" class="std_link">Главная</nuxt-link></li>
              <li><nuxt-link to="/info/about" class="std_link">О компании</nuxt-link></li>

              <li><nuxt-link to="/info/delivery" class="std_link">Доставка</nuxt-link></li>
              <li><nuxt-link to="/info/payment" class="std_link">Оплата</nuxt-link></li>
              <li><nuxt-link to="/info/contacts" class="std_link">Контакты</nuxt-link></li>
              <li v-if="2==3"><nuxt-link  to="/info/contacts" class="std_link">Карьера</nuxt-link></li>
              <li><nuxt-link to="/info/support" class="std_link">Служба поддержки</nuxt-link></li>
              <li v-if="fix_menu"><nuxt-link  to="/order/basket">Корзина ({{$store.state.order.basket_count_items}})</nuxt-link></li>
            </ul>

          </div>
          <hr class="string_menu_decorate">
          <div class="second__line">
            <div class="search">
              <p>
                <input class="base_shadow_hover" type="text" name="search" placeholder="Поиск" v-model="search_string" v-on:keyup.enter="$router.push({path:'/catalog/search', query:{search:search_string}})">
                <span v-if="search_string!=''" class="clear__search_string" @click="search_string=''">&#10006;</span>
                <i  class="search_svg_icon" v-html="$store.state.icons.search" @click="$router.push({path:'/catalog/search', query:{search:search_string}})"></i>
              </p>
            </div>
            <div>
              <select-fonts v-if="true==false"/>
            </div>
            <div>
              <sign-in-button  v-if="3==2"/>
            </div>
            <nuxt-link to="/catalog/favorits" class="favorites__button" >
              <div>
                <div class="icons " :class="[$route.fullPath =='/catalog/favorits'?'favorites':'favorites_black']"> </div>
                <sub class="favorites_count" v-if="$store.state.order.favorite_count>0">{{$store.state.order.favorite_count}}</sub>
              </div>
              <div class="name menu__icon__text">Избранное</div>
            </nuxt-link>

            <div v-if="!$store.state.user.isAuth">
              <basket-button/>
            </div>

          </div>
        </div>



      </div>


    </div>

</template>

<script>
import SelectFonts from "../dev/SelectFonts";
import BasketButton from "../order/BasketButton";
import SignInButton from "../user/SignInButton";
export default {
name: "MainMenuDesktop",
  components:{
    SignInButton,
    BasketButton,
  SelectFonts
  },
  data(){
    return{
    search_string:'',

      fix_menu:false
    }
  },
  created() {

  },
  mounted() {
    window.addEventListener('scroll', this.scroll);
    if(typeof this.$cookies.get('favorites') != 'undefined')
    {
      var items =  this.$cookies.get('favorites')
      for (var code  of items) {
        this.$store.commit('order/addToFavorite', code)
      }
    }
  },
  methods:{


    scroll() {
      window.onscroll = () => {


        if(window.pageYOffset>20)
        {
          this.fix_menu = true
        }
        else
        {
          this.fix_menu = false
        }
      };


    }

  }


}
</script>
<style>

</style>
<style scoped>
.main_menu_desktop{

}
.graph__menu ul{
  list-style: none;
  margin: 0px;
  padding: 0px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

}
.graph__menu{
  display: grid;
  grid-template-columns: 320px 2fr 1fr  1fr 1fr;
  width: 100%;
  padding-top: 50px;
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

.graph__menu li p{
  display: flex;
  justify-content: center;

}
.search_svg_icon{
  cursor: pointer;
  margin-left: 10px;
}
.main_menu_fixed{
  display: flex;
  position: fixed;
  left: 0px;
  width: 100%;
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
.string__menu{
  background-color: transparent;
  font-weight: bold;
  white-space: nowrap;
}
.string__menu ul{
  display: flex;
  justify-content: space-between;
  text-align: center;
  width: 100%;
  margin-left: -25px;
  background-color: inherit;
  max-height: 50px;

}
.string__menu ul li{
  width: 100%;
  text-align: center;
}
.string__menu ul {
  padding-top: 10px;
  padding-bottom: 10px;
  max-width: 1200px;
  margin-left: -40px;
  margin-right: auto;
}
.fixed_menu_string{
  position: fixed;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  width: 100%;
  left: 0px;
  top:0px;
  overflow: hidden;
  background-color: white;
  animation: 1s show_fixed forwards;
}
.fixed_menu_string  ul{
  margin-left: auto;
}
@keyframes show_fixed {
  0%{height: 0px;}
  100%{height: 40px;}
}
.menu__items, .second__line, .first__line{

  justify-content: space-between;
  width: 100%;
}
.second__line{
  display: flex;
}
.search{
  width: 500px;
}
.graph__menu2{
  display: inline-flex;
  padding-left: 20px;
  width: 100%;
}
.graph__menu2 .logo{
  width: 420px;
}
.clear__search_string{
  margin-left: -30px;
  font-size: 25px;
  cursor: pointer;
  text-align: left;
}
.clear__search_string:hover{
  color: rgb(255,73,0);
}
.basket_button_string{

}

hr {
  margin-top: 0px;
  margin-bottom: 15px;
  border: 0;
  height: 1px;
  background: #000;
  background-image: -webkit-linear-gradient(left, #fff, #000, #fff);
  background-image: -moz-linear-gradient(left, #fff, #000, #fff);
  background-image: -ms-linear-gradient(left, #fff, #000, #fff);
  background-image: -o-linear-gradient(left, #fff, #000, #fff);
}
.favorites__button div:first-child{
  display: inline-flex;
}
.favorites__button div:first-child sub{
  margin-top: 19px;
  margin-left: -5px;
  font-size: 0.65rem;

}
.favorites__button .name{

  margin-left: -10px;
}
.favorites_black:hover {
  background-position: 0px -192px;
}
.favorites__button:hover{
  color: rgb(255,73,0);
}
.header__background{
  background-image: url(/files/client/images/header.jpg);
}
</style>