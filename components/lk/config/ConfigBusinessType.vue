<template>
  <section>
    <h3>Конфигуратор решений для бизнеса</h3>

      <select v-model="selected_type">
        <option v-for="type in business_types">{{type.name}}</option>
      </select>

      <div class="add_buttons">
        <button class="btn-std" @click="addPdf">Добавить PDF</button>
        <button class="btn-std" @click="addVideo">Добавить Видео</button>

      </div>
      <div class="video_block">


          <div class="video_block base_shadow" v-for="(video, index ) in edited_item.video" v-if="type_data!=false">
            <h4>Видеофайлы</h4>
            <div class="input__field">
              <label>Название видео</label>
              <input type="text" v-model="edited_item.video[index].file_title">
            </div>
            <div class="input__field">
              <label>Вес блока</label>
              <input type="number" v-model="edited_item.video[index].weight">
            </div>
            <div class="input__field">
              <label>Дополнительное описание</label>
              <textarea type="number" v-model="edited_item.video[index].description">
              </textarea>
            </div>
            <div class="input__field">
                <label>Ссылка на файл</label>
                <input type="text" v-model="edited_item.video[index].filename"/><br>
                <config-load-file :onSelect="selectFile" :index="index" :type="'video'"/>
            </div>
            <div class="delete btn-std" @click="deleteItem(edited_item.video[index].id)">Удалить документ</div>
          </div>
        <div class="video_block base_shadow" v-for="(pdf, index ) in edited_item.pdf" v-if="type_data!=false">
          <h4>PDF файлы</h4>
          <div class="input__field">
            <label>Название PDF файла</label>
            <input type="text" v-model="edited_item.pdf[index].file_title">
          </div>
          <div class="input__field">
            <label>Вес блока</label>
            <input type="number" v-model="edited_item.pdf[index].weight">
          </div>
          <div class="input__field">
            <label>Дополнительное описание</label>
            <textarea type="number" v-model="edited_item.pdf[index].description">
              </textarea>
          </div>
          <div class="input__field">
            <label>Ссылка на PDF файл</label>
            <input type="text" v-model="edited_item.pdf[index].filename"/><br>
            <config-load-file :onSelect="selectFile" :index="index" :type="'pdf'"/>
          </div>
          <div class="input__field">
            <label>Ссылка на файл изображения</label>
            <input type="text" v-model="edited_item.pdf[index].image"/><br>
            <config-load-file :onSelect="selectFile" :index="index" :type="'pdf_image'"/>
          </div>
          <div class="delete btn-std" @click="deleteItem(edited_item.pdf[index].id)">Удалить документ</div>
        </div>

        <button class="btn-std" @click="save">Сохранить данные</button>

      </div>


  </section>
</template>

<script>
import FileLibrary from "../../common/library/FileLibrary";
import ConfigLoadFile from "./ConfigLoadFile";
export default {
  name: "ConfigBusinessType",
  components: {ConfigLoadFile, FileLibrary},
  data() {
    return {
      business_types:false,
      selected_type:'',
      type_data:false,
      edited_item:{
        video:[],
        pdf:[],
      },
      show_lib:{}

    }
  },
  watch:{
    selected_type(newVal)
    {
      this.edited_item = {video:[], pdf:[]}
      this.loadSelected()

    }
  },
  mounted() {
    this.loadTypes()

  },
  methods: {
    addPdf()
    {
      this.edited_item.pdf.push({filename:'', file_title:'', description:''})
    },
    addVideo()
    {
      this.edited_item.video.push({filename:'', file_title:'', description:''})
    },
    selectFile(data)
    {


      if(data.type == 'video' || data.type =='pdf')
        this.edited_item[data.type][data.index].filename = data.file



      if(data.type=='pdf_image')
        this.edited_item['pdf'][data.index].image = data.file

      this.$forceUpdate();


    },
    async loadTypes(){
      const result = await  this.$store.dispatch('api/get', {endpoint:'shop/promotions/mainpage'})
      if(result.error == false)
        this.business_types = result.body[0].items;
    },
    async deleteItem(id)
    {
      let params ={
        endpoint:'config/business',
        params:{
          delete:id
        }
      }

      const result = await  this.$store.dispatch('api/post', params);

      this.loadSelected()

    },

    async loadSelected(){
      const result = await  this.$store.dispatch('api/get', {endpoint:'shop/promotions/businesstype?type='+this.selected_type})
      if(result.error == false)
        this.type_data = result.body;
        if(this.type_data.video!=false)
        {
          this.edited_item.video = this.type_data.video
        }
      if(this.type_data.pdf!=false)
      {
        this.edited_item.pdf = this.type_data.pdf
      }

      this.$forceUpdate();
    },

    async save()
    {
      this.edited_item['business_type'] = this.selected_type;

      let params ={
        endpoint:'config/business',
        params:{
          data:JSON.stringify(this.edited_item),
          type:this.selected_type
        }
      }

      const result = await  this.$store.dispatch('api/post', params);

      this.edited_item = {video:[], pdf:[]}
      this.selected_type = '';

    }

  }


}
</script>

<style scoped>
  .video_block{
    border: 1px solid grey;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
  }
</style>