<template>
<p>
  <select v-model="font">
    <option v-for="item in fonts_array" :key="item" :value="item">Шрифт: {{item}}</option>

  </select>

</p>
</template>

<script>
export default {
  name: "SelectFonts",
  head(){
    return{
      bodyAttrs: {
        style:'font-family: '+this.font
      }
    }
  },
  data(){
    return{
      font:'Unicso1',
      fonts_array:
        ["Unicso1","Unicso2","Unicso3","Unicso4","Unicso5","Unicso6", "Unicso7","Unicso8","Unicso9"
          ,"Unicso10","Unicso11","Unicso12","Unicso13", "Unicso14","Unicso15","Unicso16","Unicso17",
            "--Ниже стандартные",
          "Arial","Arial Black","Comic Sans MS","Courier New","Helvetica","Garamond","Georgia",
          "Impact","Lucida Console","Lucida Sans Unicode","Microsoft Sans Serif", "Tahoma",
          "Times New Roman","Trebuchet MS","Verdana","Webdings"
        ]



    }
  }
}
</script>

<style scoped>
select{
  cursor: pointer;
}
</style>