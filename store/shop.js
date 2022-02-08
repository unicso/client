export const strict = false
export const state = () =>({
    category:{},
    current_category:false,
    data_filter:{},
    data_filter_selected:{},
    showedProducts:[],
    show_filters:false


})
export const getters = {


}

export const mutations = {

    setCategory(state, category){
        state.category = category
    },
    setFilter(state, data){
        state.data_filter = data
    }

}

export const actions = {

    async fetchShopData(){
        var params ={
            endpoint:'shop/config'
        }
        const result = await  this.dispatch('api/get',params)
             

        if(result.body.category)
        {
            this.commit('shop/setCategory', result.body.category)
        }


    }

}