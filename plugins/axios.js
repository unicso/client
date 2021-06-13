
export default function ({ $axios, redirect, app }) {

  $axios.onRequest(config => {
   if(typeof $nuxt != 'undefined') {
     $nuxt.$loading.delay = 200;
     $nuxt.$loading.start();
   }


  })

  $axios.onResponse(config => {
    if(typeof $nuxt != 'undefined') {
      $nuxt.$loading.finish();
    }

  })

}
