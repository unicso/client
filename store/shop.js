export const strict = false
export const state = () =>({
    category:{},
    current_category:false,
    data_filter:{},
    data_filter_selected:{},
    showedProducts:[],
    show_filters:false,
    main_page_items:false


})
export const getters = {


}

export const mutations = {

    setCategory(state, category){
        state.category = category
    },
    setFilter(state, data){
        state.data_filter = data
    },
    setMainPage(state, data){state.main_page_items = data},
    clearMainPage(state){state.main_page_items = false},


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
    },

    async getMainPage({state}){

        const result = await  this.dispatch('api/get',{endpoint:'shop/promotions/mainpage'})

        if(result.error == false)
        {
            state.main_page_items = result.body
            return state.main_page_items
        }
        else
        {
            return state.main_page_items

        }

    }


}