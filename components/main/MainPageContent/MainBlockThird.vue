<template>
<div class="main-block-first">
<header>
  Третий блок
</header>
<main class="content_block">
Содержимое блока
</main>
</div>
</template>

<script>
export default {
  name: "MainBlockThird"
}
</script>

<style scoped>
.main-block-first{
  margin-top: 20px;
  grid-column-start: 1;
  grid-column-end: 3;
}
header{
  font-size: 1.3rem;
}
main{
  height: 200px;
}
</style>