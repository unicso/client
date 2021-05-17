export const strict = false
export const state = () =>({
    loaded:false,
    isAuth:false,
    username:false


})
export const getters = {


}

export const mutations = {
    isLoaded(state)
    {
        state.loaded = true;
    },
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