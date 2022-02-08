<template>
  <section class="file_library" v-if="show==true">
        <div class="media">
          <div>Библиотека файлов
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
            <button @click="uploadFile">Загрузить</button>
            <div class="btn__close" @click="close=true"></div>
          </div>
          <image-library :data="files.images" :selectFile="selectFile" />



        </div>

    <pre>
      {{uploaded_file}}
    </pre>
  </section>
</template>

<script>
import ImageLibrary from "./ImageLibrary";
export default {
  name: "FileLibraryIcon",
  props:[
    'onSelect', 'show'
  ],
  components: {ImageLibrary},
  data() {
    return {
      files:false,
      close:false,
      select:false,
      file:false,
      uploaded_file: false
    }
  },
  mounted() {

    this.loadFiles()
  },
  watch:{
    close(newVal){
      if(newVal==true)
        setTimeout(()=>this.close=false, 500)
    }
  },
  methods: {
    handleFileUpload(){
      this.uploaded_file = this.$refs.file.files[0];

    },
   async loadFiles(){
      const result = await this.$store.dispatch('api/get', {endpoint:'config/library'})

      this.files = result.body
    },
    selectFile(data)
    {
      this.onSelect(data)
    },
    async uploadFile(){
      let formData = new FormData();
      formData.append('file', this.uploaded_file);

      let params ={
        endpoint:'config/library',
        params:{
          file:this.uploaded_file
        }
      }

      const result = await this.$store.dispatch('api/post', params)
      if(result.error==false)
      {
        this.loadFiles()
      }

    }


  }


}
</script>

<style scoped>
h3{
  text-align: center;
}
.file_library{
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: grey;
  top:0;
  left:0;
  z-index: 11111;
  display: flex;
}
.file_library .media{
  width: 90%;
  height: 90%;
  background-color: white;
  margin: 0 auto;
}
.upload_file{
  display: flex;
  align-self: center;
}
.btn__close{
  float: right;
  right: 30px;
}
</style>