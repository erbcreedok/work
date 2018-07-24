import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogged: 0,
    },
    mutations: {
        logout() {
            this.state.isLogged = 0;
        },
        loginClient() {
            this.state.isLogged = 1;
        },
        loginCompany() {
            this.state.isLogged = 2;
        }
    },
    actions: {

    }
})
