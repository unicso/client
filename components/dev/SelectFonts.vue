<template>
<p>
  <select v-model="font">
    <option v-for="item in fonts_array" :key="item" :value="item">{{item}}</option>
  </select>
  <select v-model="font_size">
    <option v-for="item in font_sizes" :key="item" :value="item">{{item}}</option>
  </select>

</p>
</template>

<script>
export default {
  name: "SelectFonts",
  head(){
    return{
      bodyAttrs: {
        style:'font-family: '+this.font + '; font-size: ' + this.font_size + 'rem !important',


      }
    }
  },
  data(){
    return{
      font:'Verdana',
      font_size: 1,
      fonts_array:
        [   "MicrosoftSansSerif",
            "Verdana"
        ],
      font_sizes:[

        0.8,
        0.82,
        0.84,
        0.86,
        0.88,
        0.9,
        0.92,
        0.94,
        0.96,
        0.98,

        1,
        1.02,
        1.04,
        1.06,
        1.08,
        1.1,
        1.12,
        1.14,
        1.16,
        1.18,
        1.2,
        1.22,
        1.24,
        1.26,
        1.28,
        1.3



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