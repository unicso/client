<template>
<section>
  <h1>Акции</h1>
  <article v-for="item in banners" @click="$router.push(item.link)" :style="'background-image: url('+ item.url + ')'">


  </article>



</section>
</template>

<script>
export default {
  name: "actions",
  data(){
    return{
      banners:[
        {url:"/files/client/images/slider/main/gloves.jpg", link:"/catalog/search?search=перчатки"},
        {url:"/files/client/images/slider/main/labels.jpg", link:false},
      ]

    }
  }



}
</script>

<style scoped>
  article{
    width: 100%;
    height: 300px;
    box-shadow: 0px 0px 8px 5px rgb(34 60 80 / 20%);

    border-radius: 7px;
    margin-top: 20px;
  }
  article:hover{
    box-shadow: 0px 0px 8px 10px rgb(34 60 80 / 20%);
  /*  box-shadow: 0px 0px 8px 10px rgba(255,73,0, 0.3);*/
    transition: 0.3s ease-in-out;
    cursor: pointer;

  }
  h1 {
    font-size: 2rem;
    font-weight: bold;
    text-shadow: 1px 1px white,
    2px 2px #777;
    color: #333;
    transition: all 1s;
  }
  h1:hover {
    text-shadow: 1px 1px white,
    2px 2px tomato;
    color: rgb(255,73,0);
  }
</style>