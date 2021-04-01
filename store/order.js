export const strict = false
export const state = () =>({
    basket: {},
    basket_count_items:0,
    basket_load_item:false,
    basket_summary:0

})
export const getters = {


}

export const mutations = {

    addItemToBasket(state,item) {
        state.basket_load_item = true;
        setTimeout(()=>state.basket_load_item = false, 500)
        state.basket[item.guid] = item
        this.$cookies.set('basket', state.basket)
        state.basket_count_items = Object.keys(state.basket).length;
        state.basket_summary = 0
        for(var key in state.basket){
            state.basket_summary = state.basket_summary + state.basket[key].count*state.basket[key].price
        }

    }


}

export const actions = {

    addItemToBasket({context, commit},item)
    {

        commit('addItemToBasket', item)

    },
     loadBasketFromCookies({commit})
    {
        var cookies = this.$cookies.get('basket')


        if(cookies!='undefined')
            for (var key  in cookies)
            {
                commit('addItemToBasket', cookies[key])
            }



    }


}