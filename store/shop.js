export const strict = false
export const state = () =>({
    category:{}


})
export const getters = {


}

export const mutations = {

    setCategory(state, category){
        state.category = category
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