<template>
<section>
  <div>
    <label class="btn-std">Выбрать файл
      <input type="file" id="file" ref="file" class="select_file" v-on:change="handleFileUpload()"/>
    </label>
  </div>


</section>
</template>

<script>
export default {
  name: "ConfigLoadFile",
  props:['onSelect', 'type', 'index'],

  data() {
    return {
      files:false,
      close:false,
      data:false
    }
  },
  mounted() {
  },
  methods: {
    handleFileUpload(){
      this.uploaded_file = this.$refs.file.files[0];

      this.uploadFile()
    },

    selectFile(data)
    {

    //  this.onSelect(data)

    },

    async uploadFile(){
      let formData = new FormData();
      formData.append('file', this.uploaded_file);

      let params ={
        endpoint:'config/library?others=true',
        params:{
          file:this.uploaded_file
        }
      }

      const result = await this.$store.dispatch('api/post', params)
      if(result.error==false)
      {
       this.data = {type:this.type, index:this.index, file:result.body}
        this.onSelect(this.data)
      }

    }


  }


}
</script>

<style scoped>
section{
  margin-top: 20px;
}
.select_file{
  visibility: hidden;
}
</style>