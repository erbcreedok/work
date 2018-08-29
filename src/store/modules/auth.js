import {authCompany, authUser, createCompany, createUser} from '../api/main'
import {
    AUTH_ERROR, AUTH_LOGOUT, AUTH_REQUEST, AUTH_SUCCESS, COMPANY, COMPANY_CREATE,
    COMPANY_LOGIN, USER, USER_CREATE, USER_LOGIN
} from '../mutation-types';
import {loginActions, logoutActions} from "../../actions/auth";
import {GET_TOKEN, IS_LOGGED} from "../types/auth";

const state = {
    status: '',
    token: localStorage.getItem('user-token') || null,
    role: localStorage.getItem('user-role') || null,
}

const getters = {
    isLogged: state => state.token ? state.role : false,
    [IS_LOGGED]: state => state.token ? state.role : false,
    authStatus: state => state.status,
    [GET_TOKEN]: state => state.token
}

const mutations = {
    [AUTH_REQUEST]: (state) => {
        state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, {token, role}) => {
        state.status = 'success'
        state.token = token
        state.role = role
    },
    [AUTH_ERROR]: (state) => {
        state.status = 'error'
    },
    [AUTH_LOGOUT]: (state) => {
        state.status = 'success'
        state.token = null
        state.role = null
    }
}

const actions = {
    [COMPANY_CREATE]: ({commit}, company) =>
        new Promise((resolve, reject) => { // The Promise used for router redirect in login
            commit(AUTH_REQUEST)
            createCompany(company).then(res => {
                const token = res.data.token
                loginActions(token, COMPANY)
                commit(AUTH_SUCCESS, {token, role: COMPANY})
                resolve(token)
            })
            .catch(err => {
                commit(AUTH_ERROR, err)
                logoutActions()
                reject(err)
            })
        })
    ,
    [COMPANY_LOGIN]: ({commit}, company) => new Promise((resolve, reject) => { // The Promise used for router redirect in login
        commit(AUTH_REQUEST)
        authCompany(company)
            .then(res => {
                const token = res.data.token
                loginActions(token, COMPANY)
                commit(AUTH_SUCCESS, {token, role: COMPANY})
                resolve(token)
            })
            .catch(err => {
                commit(AUTH_ERROR, err)
                logoutActions()
                reject(err)
            })
    }),
    [USER_CREATE]: ({commit}, company) => {
        return new Promise((resolve, reject) => { // The Promise used for router redirect in login
            commit(AUTH_REQUEST)
            createUser(company).then(res => {
                const token = res.data.token
                loginActions(token, USER)
                commit(AUTH_SUCCESS, {token, role: USER})
                resolve(token)
            })
            .catch(err => {
                commit(AUTH_ERROR, err)
                logoutActions()
                reject(err)
            })
        })
    },
    [USER_LOGIN]: ({commit}, student) => {
        return new Promise((resolve, reject) => { // The Promise used for router redirect in login
            commit(AUTH_REQUEST)
            authUser(student).then(res => {
                const token = res.data.token
                loginActions(token, USER)
                commit(AUTH_SUCCESS, {token, role: USER})
                resolve(token)
            })
            .catch(err => {
                commit(AUTH_ERROR, err)
                logoutActions()
                reject(err)
            })
        })
    },
    [AUTH_LOGOUT]: ({commit}) => {
        return new Promise((resolve) => {
            commit(AUTH_LOGOUT)
            logoutActions()
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}