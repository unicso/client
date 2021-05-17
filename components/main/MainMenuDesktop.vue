<template>
 <div class="main_menu"
    <div class="main_menu_desktop ">
      <ul>
        <li class="logo">
          <nuxt-link to="/">
                <div v-html="logotype2">

                </div>

          </nuxt-link>
        </li>

        <li class="search"  >
          <p>
            <input class="base_shadow_hover" type="text" name="search" placeholder="Поиск" v-model="search_string" v-on:keyup.enter="$router.push({path:'/catalog/search', query:{search:search_string}})">
            <i class="search_svg_icon" v-html="$store.state.icons.search" @click="$router.push({path:'/catalog/search', query:{search:search_string}})"></i>
          </p>
        </li>
        <li>

            <select-fonts v-if="true==false"/>

        </li>

        <li>

        </li>


        <li v-if="!$store.state.user.isAuth">

         <basket-button/>

        </li>



      </ul>


    </div>
</template>

<script>
import SelectFonts from "../dev/SelectFonts";
import BasketButton from "../order/BasketButton";
export default {
name: "MainMenuDesktop",
  components:{
    BasketButton,
  SelectFonts
  },
  data(){
    return{
    search_string:'',
      logotype: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="200px" height="80px" viewBox="0 0 237.165625 161.8" style="enable-background:new 0 0 197.165625 141.8;" xml:space="preserve"><style type=\'text/css\'>.title{fill:#373e46;}.slogan{fill:#5f6a69;}</style><g transform="scale(2.1487450217653) translate(26.420509765625,0)"><g><polygon opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" fill="#f24c21" points="16.373,0 10.023,3.72 29.269,14.668 29.269,30.128 19.619,35.557 16.577,33.847 16.419,22.387 9.878,18.604 9.878,37.707 19.674,43.188 35.939,34.021 35.939,11.124 "/><polygon fill-rule="evenodd" clip-rule="evenodd" fill="#f24c21" points="6.981,5.356 0,9.212 0,32.192 6.67,35.917 6.67,12.871 19.879,20.397 19.752,31.936 26.422,28.211 26.422,16.715 \t"/></g></g><g transform="scale(0.0435) translate(73.563218390805, 3029.8850574713)"><path transform="translate(0,0) rotate(180) scale(-1, 1)" d="M47 553h146v-198h72c33 132 153 211 295 211c168 0 303 -109 303 -290s-135 -290 -303 -290c-151 0 -277 89 -301 238h-66v-224h-146v553zM403 276c0 -105 54 -165 157 -165s157 60 157 165s-54 165 -157 165s-157 -60 -157 -165z" class=\'title\'/><path transform="translate(897,0) rotate(180) scale(-1, 1)" d="M47 553h147v-202h271v202h148v-553h-148v219h-271v-219h-147v553z" class=\'title\'/><path transform="translate(1556,0) rotate(180) scale(-1, 1)" d="M47 553h146v-351l291 351h140v-553h-146v349l-290 -349h-141v553z" class=\'title\'/><path transform="translate(2227,0) rotate(180) scale(-1, 1)" d="M47 553h146v-195h130l133 195h170l-178 -256l190 -297h-175l-136 223h-134v-223h-146v553z" class=\'title\'/><path transform="translate(2888,0) rotate(180) scale(-1, 1)" d="M637 409l-114 -65c-41 60 -89 92 -174 92c-98 0 -163 -62 -163 -160c0 -97 67 -160 163 -160c84 0 135 32 173 91l114 -64c-56 -105 -153 -157 -285 -157c-178 0 -311 111 -311 290c0 178 136 290 311 290c134 0 229 -53 286 -157z" class=\'title\'/><path transform="translate(3563,0) rotate(180) scale(-1, 1)" d="M190 276c0 -101 72 -165 164 -165c91 0 163 64 163 165s-72 165 -163 165c-92 0 -164 -64 -164 -165zM665 276c0 -173 -146 -290 -311 -290s-311 117 -311 290s146 290 311 290s311 -117 311 -290z" class=\'title\'/></g></svg>',
      logotype2: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="220px" height="90px"width="1700px" height="747.93230059862px" viewBox="0 0 317.165625 121.24533236874"\t\t style="enable-background:new 0 0 277.165625 101.24533236874;" xml:space="preserve"><style type=\'text/css\'>.title{fill:#373e46;}.slogan{fill:#5f6a69;}</style><g transform="scale(2.0479145218287) translate(0, 0)"><g>\t<polygon opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" fill="#f24c21" points="16.373,0 10.023,3.72 29.269,14.668 29.269,30.128 19.619,35.557 16.577,33.847 16.419,22.387 9.878,18.604 9.878,37.707 19.674,43.188 35.939,34.021 35.939,11.124 "/>\t<polygon fill-rule="evenodd" clip-rule="evenodd" fill="#f24c21" points="6.981,5.356 0,9.212 0,32.192 6.67,35.917 6.67,12.871 \t19.879,20.397 19.752,31.936 26.422,28.211 26.422,16.715 \t"/></g></g><g transform="scale(0.0435) translate(1986.2068965517, 1382.1302571119)"><path transform="translate(0,0) rotate(180) scale(-1, 1)" d="M47 553h146v-198h72c33 132 153 211 295 211c168 0 303 -109 303 -290s-135 -290 -303 -290c-151 0 -277 89 -301 238h-66v-224h-146v553zM403 276c0 -105 54 -165 157 -165s157 60 157 165s-54 165 -157 165s-157 -60 -157 -165z" class=\'title\'/><path transform="translate(897,0) rotate(180) scale(-1, 1)" d="M47 553h147v-202h271v202h148v-553h-148v219h-271v-219h-147v553z" class=\'title\'/><path transform="translate(1556,0) rotate(180) scale(-1, 1)" d="M47 553h146v-351l291 351h140v-553h-146v349l-290 -349h-141v553z" class=\'title\'/><path transform="translate(2227,0) rotate(180) scale(-1, 1)" d="M47 553h146v-195h130l133 195h170l-178 -256l190 -297h-175l-136 223h-134v-223h-146v553z" class=\'title\'/><path transform="translate(2888,0) rotate(180) scale(-1, 1)" d="M637 409l-114 -65c-41 60 -89 92 -174 92c-98 0 -163 -62 -163 -160c0 -97 67 -160 163 -160c84 0 135 32 173 91l114 -64c-56 -105 -153 -157 -285 -157c-178 0 -311 111 -311 290c0 178 136 290 311 290c134 0 229 -53 286 -157z" class=\'title\'/><path transform="translate(3563,0) rotate(180) scale(-1, 1)" d="M190 276c0 -101 72 -165 164 -165c91 0 163 64 163 165s-72 165 -163 165c-92 0 -164 -64 -164 -165zM665 276c0 -173 -146 -290 -311 -290s-311 117 -311 290s146 290 311 290s311 -117 311 -290z" class=\'title\'/></g></svg>'

    }
  },
  methods:{




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
  grid-template-columns: 1.5fr 2fr 1fr  1fr 1fr;
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
.search_svg_icon{
  cursor: pointer;
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