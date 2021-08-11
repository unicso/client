export const strict = false
export const state = () =>({
    loaded:false,
    isAuth:false,
    username:false,
    app_token:'',
    auth_token:'',
    email:false,
    version:1,
    lk_link:'user/auth',
    type:1,
    name:''


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
        state.email = data.email
        state.version = data.version
        state.lk_link = data.lk_link
        state.type = data.type
        state.name = data.name.split(' ')[0]
        console.log(data)


    },
    logout(state){
        state.isAuth = false
        state.username = false
        state.email = false
        state.version = 1
        state.type = 1
            state.lk_link = '/user/auth'

    }



}
export const actions = {


    async nuxtServerInit ({ commit }, { req }) {


    },
}