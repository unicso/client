export const strict = false
export const state = () =>({
    category:{},
    basket: {}


})
export const getters = {


}

export const mutations = {

    setCategory(state, category){
        state.category = category
    },
    addItemToBasket(state, item)
    {
        state.basket[item.item.guid]=item.item
        state.basket[item.item.guid]['count']=item.count

    }

}

export const actions = {

    async fetchShopData(){
        var params ={
            endpoint:'shop/config'
        }
        const result = await  this.dispatch('api/get',params)
            console.log(result)

        if(result.body.category)
        {
            this.commit('shop/setCategory', result.body.category)
        }


    }

}