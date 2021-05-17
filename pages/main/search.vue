<template>
<div>
  <h1>Поиск на сайте.</h1>
  <pre>
{{$route.query['search_string']}}
  </pre>
</div>
</template>

<script>
export default {
  name: "search",


  mounted() {
    console.log(this.$route)
  }

}
</script>

<style scoped>

</style>