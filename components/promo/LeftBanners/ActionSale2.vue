<template>
<section>
  <nuxt-link to="/promo/actions">
  <div class="sale-wrap">
    <div class="sale-inner">
      <div class="sale-text"><h2>Специальные предложения</h2>
        <p><span>скидки до</span> 40%</p>
        <span class="button">Посмотреть</span>
        <p class="sale-text-info"></p>
      </div>
    </div>
  </div>
  </nuxt-link>

</section>
</template>

<script>
export default {
  name: "ActionSale2"
}
</script>

<style scoped>
.sale-wrap {
  position: relative;
  width: inherit;
  height: 200px;
  padding: 30px 40px;
  margin: 50px auto 0;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.07);
  box-sizing: border-box;
  overflow: hidden;
}
.sale-wrap:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 760px;
  height: 760px;
  background: rgb(240,96,96);
  border-radius: 50%;
}
.sale-inner {
  position: relative;
  height: 100%;
  background: linear-gradient(45deg, rgb(240,96,96), rgb(243,181,96));
  box-shadow: 0 10px 45px rgba(240,96,96, 0.3), 0 -10px 45px rgba(240,96,96, 0.3);
}
.sale-inner:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  border-bottom-right-radius: 150px;
  box-shadow: 3px 3px 20px rgba(0,0,0,.06);
}
.sale-text {
  position: absolute;
  top: 0;
  width: 100%;
  /*z-index: 5;*/
  padding: 10px 10px 0 20px;
  box-sizing: border-box;
  zoom: 0.8;
}
.sale-text h2 {
  margin: 0 0 5px;
  color: #888888;
  font-family: 'Comfortaa', cursive;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1px;
}
.sale-text p {
  margin: 0;
  font-family: 'Merriweather', serif;
  font-size: 40px;
  font-weight: bold;
  color: rgb(240,96,96);
}
.sale-text p span {
  font-size: 20px;
  ont-weight: normal;
}
.button {
  display: inline-block;
  margin: 20px 0;
  padding: 5px 10px;
  text-decoration: none;
  color: rgb(240,96,96);
  font-family: 'Comfortaa', cursive;
  text-transform: lowercase;
  font-size: 15px;
  border: 1px solid rgb(240,96,96);
  cursor: pointer;
}
.sale-text .sale-text-info {
  color: #888888;
  font-family: 'Comfortaa', cursive;
  font-size: 10px;
  font-weight: normal;
}
</style>