import Vue from 'vue'

Vue.filter('price', (value) => {
    const date = new Date(value)

    var price       = Number.prototype.toFixed.call(parseFloat(value) || 0, 2),
        price_sep   = price.replace(/(\D)/g, ","),
        price_sep   = price_sep.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

    return price_sep + ' ₽';

})