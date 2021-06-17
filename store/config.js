export const strict = false
export const state = () =>({

    view_type_catalog:'list'


})
export const getters = {


}

export const mutations = {

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