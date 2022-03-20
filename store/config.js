export const strict = false
export const state = () =>({

    view_type_catalog:'list',
    show_chat:true,

    head:{
        title:'Юниксо - надежный помощник Вашего бизнеса',
        meta:[
          {
              hid: 'description',
              name: 'description',
              content: 'Компания ООО «Юниксо» осуществляет коммерческую деятельность, ориентированную на предоставление заказчикам комплексных решений по планированию, разработке, обеспечению и управлению процессами закупочной деятельности организаций'
          }

        ]



    }


})
export const getters = {


}

export const mutations = {

    seo(state, data){
            if(typeof data.title!=undefined)
            {
                state.head.title = data.title
            }
            for (var key in state.head.meta)
            {
                if(state.head.meta[key].name == 'description' && typeof data.description!= undefined){
                    state.head.meta[key].content = data.description
                }
            }



    },




    setViewTypeCatalog(state, value)
    {
        this.$cookies.set('view_type_catalog', value)
        state.view_type_catalog = value
       // this.$cookies.set('config', cookie)
    },
}

export const actions ={

    getConfig()
    {
        var view_type = this.$cookies.get('view_type_catalog')
        if(view_type!= undefined)
            this.commit('config/setViewTypeCatalog', view_type)
    }




}