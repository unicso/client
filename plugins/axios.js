
export default function ({ $axios, redirect, app }) {

  $axios.onRequest(config => {
    $nuxt.$loading.delay = 20;
    $nuxt.$loading.start();

  })

  $axios.onResponse(config => {
    $nuxt.$loading.finish();
  })

}
