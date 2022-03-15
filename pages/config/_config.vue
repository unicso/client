<template>
    <section>
      <ul>
        <li><nuxt-link to="/config/general">Основные параметры</nuxt-link></li>
        <li><nuxt-link to="/config/permissions">Роли</nuxt-link></li>

      </ul>

      <div class="components-block">
        <config-base-params v-if="$route.params.config=='general'"/>
        <config-permissions v-if="$route.params.config=='permissions'"/>
      </div>


    </section>
</template>

<script>
import ConfigBaseParams from "../../components/config/ConfigBaseParams";
import ConfigPermissions from "../../components/config/ConfigPermissions";

export default {
  name: "config",
  components: {ConfigPermissions,  ConfigBaseParams},
  data() {
    return {
      config:false

    }
  },
  mounted() {
  },
  methods: {




  }


}
</script>

<style scoped>
ul{
list-style: none;
}
li{
  display: inline-flex;
}
li:not(:last-child):after
{
  content: "|";
  margin-left: 5px;
}

</style>