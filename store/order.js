export const strict = false
export const state = () =>({
    basket: {},
    basket_count_items:0,
    basket_load_item:false,
    basket_summary:0,
    favorite_count:0,
    favorite_items:[]

})
export const getters = {


}

export const mutations = {

    addItemToBasket(state,item) {
        state.basket_load_item = true;
        setTimeout(()=>state.basket_load_item = false, 500)
        state.basket[item.code] = item
        this.$cookies.set('basket', state.basket)
        state.basket_count_items = Object.keys(state.basket).length;
        state.basket_summary = 0

        for(var key in state.basket){
            state.basket_summary = state.basket_summary + state.basket[key].count*state.basket[key].price
        }


    },
    deleteItemFromBasket(state,code) {
       delete  state.basket[code]
        this.$cookies.set('basket', state.basket)
        state.basket_count_items = Object.keys(state.basket).length;
        state.basket_summary = 0
        for(var key in state.basket){

            state.basket_summary = state.basket_summary + state.basket[key].count*state.basket[key].price
        }
    },

    addToFavorite(state,code){

        if (state.favorite_items.indexOf(code)==-1)
            state.favorite_items.push(code)
            state.favorite_count = state.favorite_items.length
        this.$cookies.set('favorites', state.favorite_items)
    },
    deleteFromFavorite(state,code){


        if (state.favorite_items.indexOf(code)>=0)
        {
           var favorits  = []
            for( var codes of state.favorite_items)
            {

                if(codes!=code) {
                    favorits.push(codes)
                }
            }
            state.favorite_items = favorits

        this.$cookies.set('favorites', state.favorite_items)
        }
        state.favorite_count = state.favorite_items.length
    }


}

export const actions = {


    async getBasket()
    {
        return await this.dispatch('api/get', {endpoint:'basket'})
    },
    async deleteItemFromBasket({context, commit},code)
    {
        var uri = 'basket/'+code
        return await this.dispatch('api/delete', {endpoint:uri})
    },




}