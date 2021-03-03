export const strict = false
export const state = () =>({

    isAuth:false,
    username:false


})
export const getters = {


}

export const mutations = {
    login(state, data){
        state.isAuth = true
        state.username = data.username
    },
    logout(state){
        state.isAuth = false
        state.username = false
    }



}
export const actions = {


    async nuxtServerInit ({ commit }, { req }) {


    },
}