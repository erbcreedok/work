import Vue from 'vue'
import Vuex from 'vuex'
import vacancies from './modules/vacancies'
import people from './modules/people'
import auth from "./modules/auth";
import profile from "./modules/profile";
import userProfile from "./modules/userProfile";
import companyProfile from "./modules/companyProfile";
import companies from "./modules/companies";
import applications from "./modules/applications";
import students from "./modules/students";

Vue.use(Vuex)

const store = new Vuex.Store({
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
        auth,
        vacancies,
        people,
        profile,
        userProfile,
        companyProfile,
        companies,
        students,
        applications
    },
})
export default store
