<template>
<section>
<h1>Карта сайта</h1>
  <ul>
    <li v-for="(item, name) in data">
      <nuxt-link :to="item.link">{{name}}</nuxt-link>
      <ul>
        <li  v-for="(item2, name2) in item.child">
          <nuxt-link :to="item2.link">{{name2}}</nuxt-link>
          <ul>
            <li  v-for="(item3, name3) in item2.child">

              <details>
                <summary>
                  <nuxt-link :to="item3.link">{{name3}}</nuxt-link>
                </summary>
                <ul>
                  <li  v-for="(item4, name4) in item3.child">
                    <nuxt-link :to="item4">{{name4}}</nuxt-link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </li>
      </ul>
    </li>


  </ul>


<br><br><br>

</section>
</template>

<script>
export default {
  name: "sitemap",

  async asyncData({ params, $axios }) {
    const result = await $axios.$get('https://dev.unicso.ru/v1/config/sitemap')
    var data = result.body
    return { data }
  }
}
</script>

<style scoped>
ul{
  margin-left: 20px;
}
</style>