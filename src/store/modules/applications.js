import api from '../api/main'
import {
    ACCEPT_STUDENT_VACANCY,
    ACCEPT_VACANCY, APPLICATIONS_CLEAN,
    APPLICATIONS_ERROR, APPLICATIONS_REQUEST, APPLICATIONS_SUCCESS, APPLY_STUDENT_VACANCY, APPLY_VACANCY,
    DISCARD_STUDENT_VACANCY,
    DISCARD_VACANCY,
    GET_APPLICATIONS, REJECT_STUDENT_VACANCY,
    REJECT_VACANCY,
    SET_APPLICATION
} from "../types/applications";
const state = {
    list: [],
    status: 'clean'
}

const getters = {
}

const mutations = {
    [APPLICATIONS_REQUEST]: (state) => {
        state.status = 'loading'
    },
    [APPLICATIONS_SUCCESS]: (state) => {
        state.status = 'success'
    },
    [APPLICATIONS_ERROR]: (state) => {
        state.status = 'error'
    },
    [APPLICATIONS_CLEAN]: (state) => {
        state.status = 'clean'
        state.list = []
    },
    [SET_APPLICATION]: (state, payload) => {
        console.log(state, payload)
    }
}

const actions = {
    [APPLY_VACANCY]: ({commit}, payload) => new Promise((respond, reject) => {
        commit(APPLICATIONS_REQUEST)
        api.post('/student/vacancy/apply/', {vacancyId: payload})
            .then(res => {
                console.log(res)
                respond(res)
                commit(APPLICATIONS_SUCCESS)
                return res
            })
            .catch(err => {
                console.log(err)
                commit(APPLICATIONS_ERROR)
                reject(err)
            })
    }),
    [ACCEPT_VACANCY]: ({commit}, payload) => new Promise((respond, reject) => {
        commit(APPLICATIONS_REQUEST)
        api.post('/student/vacancy/accept/', {vacancyId: payload})
            .then(res => {
                console.log(res)
                respond(res)
                commit(APPLICATIONS_SUCCESS)
                return res
            })
            .catch(err => {
                console.log(err)
                commit(APPLICATIONS_ERROR)
                reject(err)
            })
    }),
    [REJECT_VACANCY]: ({commit}, payload) => new Promise((respond, reject) => {
        commit(APPLICATIONS_REQUEST)
        api.post('/student/vacancy/reject/', {vacancyId: payload})
            .then(res => {
                console.log(res)
                respond(res)
                commit(APPLICATIONS_SUCCESS)
                return res
            })
            .catch(err => {
                console.log(err)
                commit(APPLICATIONS_ERROR)
                reject(err)
            })
    }),
    [DISCARD_VACANCY]: ({commit}, payload) => new Promise((respond, reject) => {
        commit(APPLICATIONS_REQUEST)
        api.post('/student/vacancy/discard/', {vacancyId: payload})
            .then(res => {
                console.log(res)
                respond(res)
                commit(APPLICATIONS_SUCCESS)
                return res
            })
            .catch(err => {
                console.log(err)
                commit(APPLICATIONS_ERROR)
                reject(err)
            })
    }),
    [APPLY_STUDENT_VACANCY]: ({commit}, payload) => new Promise((respond, reject) => {
        commit(APPLICATIONS_REQUEST)
        api.post('/company/vacancy/apply/', payload)
            .then(res => {
                console.log(res)
                respond(res)
                commit(APPLICATIONS_SUCCESS)
                return res
            })
            .catch(err => {
                console.log(err)
                commit(APPLICATIONS_ERROR)
                reject(err)
            })
    }),
    [ACCEPT_STUDENT_VACANCY]: ({commit}, payload) => new Promise((respond, reject) => {
        commit(APPLICATIONS_REQUEST)
        api.post('/company/vacancy/accept/', payload)
            .then(res => {
                console.log(res)
                respond(res)
                commit(APPLICATIONS_SUCCESS)
                return res
            })
            .catch(err => {
                console.log(err)
                commit(APPLICATIONS_ERROR)
                reject(err)
            })
    }),
    [REJECT_STUDENT_VACANCY]: ({commit}, payload) => new Promise((respond, reject) => {
        commit(APPLICATIONS_REQUEST)
        api.post('/company/vacancy/reject/', payload)
            .then(res => {
                console.log(res)
                respond(res)
                commit(APPLICATIONS_SUCCESS)
                return res
            })
            .catch(err => {
                console.log(err)
                commit(APPLICATIONS_ERROR)
                reject(err)
            })
    }),
    [DISCARD_STUDENT_VACANCY]: ({commit}, payload) => new Promise((respond, reject) => {
        commit(APPLICATIONS_REQUEST)
        api.post('/company/vacancy/discard/', payload)
            .then(res => {
                console.log(res)
                respond(res)
                commit(APPLICATIONS_SUCCESS)
                return res
            })
            .catch(err => {
                console.log(err)
                commit(APPLICATIONS_ERROR)
                reject(err)
            })
    }),
    [GET_APPLICATIONS]: ({commit}) => {
        commit(APPLICATIONS_REQUEST)
        return api.post('/company/vacancy/get')
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
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