<template>
  <div  v-if="as_icon" class="add__to__favorite">
    <button v-if="$store.state.order.favorite_items.indexOf(code)==-1" class="btn-std" @click="addToFavorite(code)">В избранное</button>
    <button v-else class="btn-std small delete_from_favorite" @click="deleteFromFavorits(code)">
      Убрать из <div class="icons favorites icon_favorite"></div>
    </button>
  </div>
  <div v-else class="add__to__favorite" >
    <button v-if="$store.state.order.favorite_items.indexOf(code)==-1" class="btn-std" @click="addToFavorite(code)">В избранное</button>
    <button v-else class="btn-std small delete_from_favorite" @click="deleteFromFavorits(code)">
      Убрать из <div class="icons favorites icon_favorite"></div>
    </button>
  </div>


</template>

<script>
export default {
  props:[
    'code', 'as_icon'
  ],
  name: "AddToFavorite",
  data(){
    return{
    cookiename:''

    }
  },
  created() {


  },
  mounted() {

  },
  methods:{

    addToFavorite(code) {
      this.$store.commit('order/addToFavorite', code)
    },
    deleteFromFavorits(code)
    {
      this.$store.commit('order/deleteFromFavorite', code)
    }


  }
}
</script>

<style scoped>
.btn-std{
width: 150px;
}
.favorit_text{
  line-height: 100%;
  display: inline-flex;
}
.icon_favorite{
  zoom: 0.6;
  display: inline-flex;
}
b{
  font-weight: normal;
}
.delete_from_favorite{
  display: inline-flex;
  text-align: center;
  justify-content: center;
}
.delete_from_favorite .icon_favorite{
  margin-top: -2px;
  margin-left: 8px;
}
</style>