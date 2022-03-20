export const strict = false
export const state = () =>({

    smart_request:{
    services:[], name:'', phone:'', email:'', position:'', object:'',
    location:'', area:'', comment:'', budget:'', staff:'', subject:'SMART сервисы'
}


})




export const actions = {
    priceSet({context}, data){


        var price       = Number.prototype.toFixed.call(parseFloat(data) || 0, 2),
            price_sep   = price.replace(/(\D)/g, ","),
            price_sep   = price_sep.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
        return price_sep + ' ₽';


    },


}