<template>
<section class="content_block">

<h1>Карта сайта</h1>
  <ul>
    <li v-for="(item, name) in sitemap">
      <nuxt-link class="default__link" :to="item.link">{{name}}</nuxt-link>
      <ul>
        <li  v-for="(item2, name2) in item.child">
          <nuxt-link class="default__link" :to="item2.link">{{name2}}</nuxt-link>
          <ul>
            <li  v-for="(item3, name3) in item2.child">

              <details>
                <summary>
                  <nuxt-link class="default__link" :to="item3.link">{{name3}}</nuxt-link>
                </summary>
                <ul>
                  <li  v-for="(item4, name4) in item3.child">
                    <nuxt-link class="default__link" :to="item4">{{name4}}</nuxt-link>
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

  data(){
    return{
      sitemap:false
    }
  },
  mounted()
  {
    this.load_sitemap()
  },
  methods:{
    async load_sitemap()
    {
      let result = await this.$store.dispatch('api/get',{endpoint:'config/sitemap'})
      this.sitemap = result.body

    }

  }

}
</script>

<style scoped>
ul{
  margin-left: 20px;
}
details summary::-webkit-details-marker {
  display: none
}
/* Убираем стандартный маркер Firefox */
details > summary {
  list-style: none;
}

/* Добавляем собственный маркер для закрытого состояния */
details summary:before {
  content: '+ ';
  font-size: 1.5rem;
  margin-right: 7px;
  cursor: pointer;
}

/* Добавляем собственный маркер для открытого состояния */
details[open] summary:before {
  content: '- ';
  font-size: 2rem;
  cursor: pointer;
}


</style>