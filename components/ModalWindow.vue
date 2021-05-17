<template>
  <div class="modal">
    <client-only>
      <modal
          :name="modal_name"
          transition="pop-out"
          height="95%"
          width="95%"
          :max-width="960"
          :adaptive="true"
          :scrollable="true"
          :pivot-y="0.5"
          :reset="true"
          @before-open="">
        <h1>{{name}}</h1>
        <div class="content">
          {{text}}
        </div>

        <div class="close" @click="$modal.hide(modal_name)">+</div>

      </modal>

    </client-only>
  </div>
</template>

<script>
export default {
  name: "ModalWindow",
  props:[
    'modal_name',
    'name',
    'text'
  ]
}
</script>

<style scoped>
.close{
  position: absolute;
  font-size: 3rem;
  top:0px;
  right: 10px;
  transform: rotate(45deg);
  cursor: pointer;
}
</style>
