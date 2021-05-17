<template>
<div class="main_menu_mobile">
      <div class="header">
        <div class="logo"  v-if="$route.fullPath=='/'">
          <nuxt-link to="/">
            <div v-html="logotype"></div>
          </nuxt-link>
        </div>

        <div class="search" v-if="show_search_string">
          <input class="base_shadow_hover" autocomplete="off" type="text" name="search" placeholder="Поиск" v-model="search_string" v-on:keyup.enter="$router.push({path:'/catalog/search', query:{search:search_string}});  show_search_string=false">
          <i class="search_svg_icon" v-html="$store.state.icons.search" @click="$router.push({path:'/catalog/search', query:{search:search_string}}); show_search_string=false"></i>
        </div>
      </div>
      <div class="mobile_menu" >
        <button class="menu_button" @click="$router.push('/'); show_menu=false">
          <i class="svg_icon" v-html="$store.state.icons.house"></i>
        </button>
        <button class="menu_button" @click="show_menu=false">
          <basket-button :asIcon="true"/>
        </button>
        <button class="menu_button" @click="show_search_string=!show_search_string">
          <i class="svg_icon" v-html="$store.state.icons.search"></i>
        </button>
        <button class="menu_button" @click="show_menu=!show_menu">
          <i class="svg_icon" v-html="$store.state.icons.menu"></i>
        </button>
      </div>
      <div class="mobile_fullscreen_menu" v-if="show_menu">
        <nuxt-link to="/">
          <div v-html="logotype"></div>
        </nuxt-link>
        <ul class="">
          <li  class="parent_category" v-for="(main, index, count) in $store.state.shop.category"
               :key="main.id">
            <p>
              <button class="std_link" @click="show_submenu = count">{{main.name}}</button>
            </p>
            <ul :class="[show_submenu === count?'visible':'invisible']" >
              <li v-for="sub_menu in main.child" @click="show_menu=false">
                <p>
                  <nuxt-link :to="'/catalog/'+sub_menu.cef_name">{{sub_menu.name}}</nuxt-link>
                </p>
              </li>
            </ul>
          </li>
        </ul>

      </div>

</div>
</template>

<script>
import BasketButton from "../order/BasketButton";
import BreadcrumbComponent from "../catalog/BreadcrumbComponent";
export default {
  name: "MainMenuMobile",
  components: {BreadcrumbComponent, BasketButton},
  data(){
    return{
      logotype: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="220px" height="90px"width="1700px" height="747.93230059862px" viewBox="0 0 317.165625 121.24533236874"\t\t style="enable-background:new 0 0 277.165625 101.24533236874;" xml:space="preserve"><style type=\'text/css\'>.title{fill:#373e46;}.slogan{fill:#5f6a69;}</style><g transform="scale(2.0479145218287) translate(0, 0)"><g>\t<polygon opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" fill="#f24c21" points="16.373,0 10.023,3.72 29.269,14.668 29.269,30.128 19.619,35.557 16.577,33.847 16.419,22.387 9.878,18.604 9.878,37.707 19.674,43.188 35.939,34.021 35.939,11.124 "/>\t<polygon fill-rule="evenodd" clip-rule="evenodd" fill="#f24c21" points="6.981,5.356 0,9.212 0,32.192 6.67,35.917 6.67,12.871 \t19.879,20.397 19.752,31.936 26.422,28.211 26.422,16.715 \t"/></g></g><g transform="scale(0.0435) translate(1986.2068965517, 1382.1302571119)"><path transform="translate(0,0) rotate(180) scale(-1, 1)" d="M47 553h146v-198h72c33 132 153 211 295 211c168 0 303 -109 303 -290s-135 -290 -303 -290c-151 0 -277 89 -301 238h-66v-224h-146v553zM403 276c0 -105 54 -165 157 -165s157 60 157 165s-54 165 -157 165s-157 -60 -157 -165z" class=\'title\'/><path transform="translate(897,0) rotate(180) scale(-1, 1)" d="M47 553h147v-202h271v202h148v-553h-148v219h-271v-219h-147v553z" class=\'title\'/><path transform="translate(1556,0) rotate(180) scale(-1, 1)" d="M47 553h146v-351l291 351h140v-553h-146v349l-290 -349h-141v553z" class=\'title\'/><path transform="translate(2227,0) rotate(180) scale(-1, 1)" d="M47 553h146v-195h130l133 195h170l-178 -256l190 -297h-175l-136 223h-134v-223h-146v553z" class=\'title\'/><path transform="translate(2888,0) rotate(180) scale(-1, 1)" d="M637 409l-114 -65c-41 60 -89 92 -174 92c-98 0 -163 -62 -163 -160c0 -97 67 -160 163 -160c84 0 135 32 173 91l114 -64c-56 -105 -153 -157 -285 -157c-178 0 -311 111 -311 290c0 178 136 290 311 290c134 0 229 -53 286 -157z" class=\'title\'/><path transform="translate(3563,0) rotate(180) scale(-1, 1)" d="M190 276c0 -101 72 -165 164 -165c91 0 163 64 163 165s-72 165 -163 165c-92 0 -164 -64 -164 -165zM665 276c0 -173 -146 -290 -311 -290s-311 117 -311 290s146 290 311 290s311 -117 311 -290z" class=\'title\'/></g></svg>',
      search_string:'',
      show_menu:false,
      show_submenu:false,
      show_search_string:false
    }
  }
}
</script>

<style scoped>
.main_menu_mobile .header{
  text-align: center;
  margin-bottom: 10px;
}
.search{
  display: inline-flex;
  width: 100%;
}
.logo{
  height: 70px;
}
.menu_button{
  background-color: white;
  border: none;
}
.bar1, .bar2, .bar3 {
  width: 10px;
  height: 2px;
  background-color: #333;
  margin: 2px 0;
  transition: 0.4s;
}

.mobile_menu{
  display: inline-flex;
  position: fixed !important;
  height: 40px;
  width: 100%;
  background-color: white;
  bottom: 0px !important;
  z-index: 10000;
  box-shadow: 0px -5px 8px 0px rgba(34, 60, 80, 0.2);
  justify-content: space-between;

}
.search{
  position: fixed !important;
  bottom: 43px !important;
  width: 100%;
  z-index: 10000;
  left: 0px;
  background-color: white;
}
.mobile_fullscreen_menu{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  background-color: white;
  z-index: 9999;
  text-align: center;

}
.mobile_fullscreen_menu .parent_category .std_link{
  font-size: 1.5rem;
}
.search input{
  height: 3rem;
}
</style>