import Vue from 'vue'
import Vuex from 'vuex'
import vacancies from './modules/vacancies'
import people from './modules/people'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogged: 0,
    },
    getters: {
    },
    mutations: {
        logout(state) {
            state.isLogged = 0;
            localStorage.setItem('isLogged', 0)
            localStorage.removeItem('vacancies')
            localStorage.removeItem('people')
        },
        loginClient(state) {
            state.isLogged = 1;
            localStorage.setItem('isLogged', 1)
        },
        loginCompany(state) {
            state.isLogged = 2;
            localStorage.setItem('isLogged', 2)
        },
        setLogged(state, val) {
            state.isLogged = val;
            localStorage.setItem('isLogged', val)
        },
    },
    modules: {
        vacancies,
        people
    },
})
