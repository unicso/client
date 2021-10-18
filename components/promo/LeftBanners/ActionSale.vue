<template>
<section>

  <nuxt-link to="/promo/sales">
  <div class="sale-wrap">
    <div class="sale-inner">
      <div class="sale-info">
        <div class="sale-info-top"><small></small> </div>
        <div class="sale-info-bottom">
          <logo-animated :width="'inherit'" :height="'inherit'"/>
        </div>
      </div>
      <div class="sale-text">
        <p></p>
        <h3>Товары с макисимальной выгодой</h3>
        <p>1 - 28 сентября 2021</p>
      </div>
    </div>
  </div>
  </nuxt-link>

</section>
</template>

<script>
import LogoAnimated from "../../common/LogoAnimated";
export default {
  name: "ActionSale",
  components: {LogoAnimated}
}
</script>

<style scoped>
.sale-wrap {
  width: inherit;
  height: 200px;
  padding: 1px;
  margin: 50px auto 0;
  background: #ffffff;
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.07);
  box-sizing: content-box;
}
.sale-inner {
  position: relative;
  height: 100%;
  background: repeating-linear-gradient(-45deg, #bc2423, #bc2423 7px, #910707 8px, #910707 13px);
}
.sale-text {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  background: #910707;
  text-align: center;
  color: rgba(255,255,255,.8);
  transform: translateY(-50%);
}
.sale-text p {
  margin: 0;
  padding: 5px;
  font-size: 10px;
  letter-spacing: 3px;
  color: rgba(255,255,255,.8);
  font-family: 'Comfortaa', cursive;
  text-transform: uppercase;
  background: #bc2423;
  box-shadow: 0 2px 5px rgba(0,0,0,.2), 0 -2px 5px rgba(0,0,0,.2);
}
.sale-text h3 {
  margin: 0;
  padding: 8px 0 8px;
  font-family: 'Playfair Display', serif;
  line-height: 1;
  font-style: italic;
  font-size: 20px;
  font-weight: normal;
}
.sale-info {
  position: relative;
  width: 70px;
  height: 100%;
  margin: 0 auto;
  background: #910707;
  font-family: 'Oswald', sans-serif;
  font-size: 30px;
  text-align: center;
  color: rgba(255,255,255,.8);
  border-left: 20px solid #bc2423;
  border-right: 20px solid #bc2423;
  box-shadow: 2px 0 5px rgba(0,0,0,.2), -2px 0 5px rgba(0,0,0,.2);
  box-sizing: content-box;
}
.sale-info-top {
  padding: 1px 0;
}
.sale-info-bottom {
  position: absolute;
  bottom: 1px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 50px;
  height: 50px;
}
.sale-info-top{
  display: inline-flex;
}
small{
  font-size: 0.7rem;

}
.nuxt-link-active{
  font-weight: normal;
}
</style>