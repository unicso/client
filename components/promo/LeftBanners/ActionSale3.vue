<template>
<section @click="$router.push('/catalog/aptechki-individualnye-i-kollektivnye')">
  <div class="sale-wrap">

  </div>


</section>
</template>

<script>
export default {
  name: "ActionSale3"
}
</script>

<style scoped>
.sale-wrap {
  background-image: url("/files/client/images/news.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  width: 270px;
  height: 210px;
  padding: 30px 40px;
  margin: 50px auto 0;

  box-shadow: 0 1px 2px rgba(0,0,0,0.07);
  box-sizing: border-box;
  overflow: hidden;
}
section{
  cursor: pointer;
}
</style>