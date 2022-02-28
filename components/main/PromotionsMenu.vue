<template>
  <section class="promotions_menu">
    <ul v-if="items!=false">
      <li v-for="(item, name) in items">
        <nuxt-link :to="item.link+ ''">
          <div class="item">
            <div class="title">{{name}}</div>
          </div>
        </nuxt-link>
      </li>


    </ul>





  </section>
</template>

<script>
export default {
  name: "PromotionsMenu",
  data() {
    return {
      items:false
    }
  },
  mounted() {
    this.loadBannerItems()
  },
  watch:{
    '$store.state.user.current_price_type'(){
      this.loadBannerItems()
    },
  },
  methods: {
    async loadBannerItems(){
      const result = await this.$store.dispatch('api/get', {endpoint:'shop/promotions/left_banners'})

      if(result.error == false)
        this.items = result.body

    }


  }


}
</script>

<style scoped>
.promotions_menu{
  margin-bottom: 80px;
}
.promotions_menu ul{
  display: flex;
/*  justify-content: space-between;*/

  height: 50px;
}
.promotions_menu ul li{
  display: inline-flex;
  width: 20%;
  transition: 0.5s ease-in-out;
}
.promotions_menu ul li:hover{
  transform: scale(1.1);
}
  .item{
    background-image: url("/files/client/images/template2.png");
    background-repeat: no-repeat;
    width: 50px;
    height: 44px;
    background-size: contain;
    display: flex;
    align-items: center;

  }
  .item .title{

    padding-left: 20px;
    line-height: 0.8em;
  }

  .hexogen{
  position: relative;
    z-index: 222222;
  }
  .hexogen .top-trapezoid{
    border-bottom: 100px solid red;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    height: 0;
    width: 100px;
    position: absolute;
  }
  .hexogen .top-trapezoid-white{
  border-bottom: 100px solid green; opacity: 0.7;
  border-left: 50px solid transparent;
  height: 0;
  width: 135px;
  position: absolute;
  left: 0px;
  top: 0px;
  }



.hexogen .top-trapezoid:nth-child(2){
  transform: scale(1,-1);
  top:222px
}

</style>