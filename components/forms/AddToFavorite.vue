<template>
  <div  v-if="as_icon" class="add__to__favorite">
    <button v-if="$store.state.order.favorite_items.indexOf(code)==-1" class="btn-std" @click="addToFavorite(code)">В избранное</button>
    <button v-else class="btn-std small" @click="deleteFromFavorits(code)">Убрать из избранного</button>
  </div>
  <div v-else class="add__to__favorite" >
    <button v-if="$store.state.order.favorite_items.indexOf(code)==-1" class="btn-std" @click="addToFavorite(code)">В избранное</button>
    <button v-else class="btn-std small" @click="deleteFromFavorits(code)">Убрать из избранного</button>
  </div>


</template>

<script>
export default {
  props:[
    'code', 'as_icon'
  ],
  name: "AddToFavorite",
  created() {


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
.btn-std.small{
  font-size: 0.7rem;
}
</style>