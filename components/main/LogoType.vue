<template>
  <section class="logotype">

    <div class="type-1" v-if="2==3">
      <div class="type-1__image"></div>
      <div class="type-1__name">ЮНИКСО</div>
      <div class="type-1__description">Ваш надежный партнер</div>
    </div>
    <div class="type-2" v-if="2==2">
      <div class="type-2__image" v-html="$store.state.icons.logotype_vertical"></div>
      <div class="type-2__description">Ваш надежный партнер</div>
    </div>


  </section>
</template>

<script>
export default {
  name: "LogoType",
  data() {
    return {}
  },
  mounted() {
  },
  methods: {}


}
</script>

<style scoped>
.logotype{

}
.logotype .type-1, .logotype .type-2{
  width: 300px;
  height: 100px;
  display: flex;
  align-items: center;
  position: relative;
  transform: scale(1.25);
}
.logotype .type-1__image{
  background-image: url("/files/client/images/logo.png");
  background-repeat: no-repeat;
  height: 100%;
  width: 35%;
  background-size: contain;
}
.logotype .type-2__image{
  height: 100%;
  width: 35%;

  transform: scale(1.3);

}


.type-1>div{
  display: inline-flex;
}
.type-1__name{
  font-size: 1.6em;
  font-weight: bolder;
  font-family: Logotype;
  color: black;
}
.type-1__description,
.type-2__description
{
  font-size: 0.65em;
  position: absolute;
  left: 25%;
  padding-top: 40px;
  font-style: oblique;
  color: black;
}
.type-2{
  margin-left: 45px;
  margin-top: 0px;

}
</style>