import {SET_VACANCY_STATUS, SET_VACANCIES, CREATE_VACANCY, USER} from '../mutation-types'
import api, {baseURL} from '../api/main'
import {
    GET_ACCEPTED_VACANCIES, GET_ALL_STUDENT_VACANCIES,
    GET_ALL_VACANCIES, GET_FILTERED_STUDENT_VACANCIES, GET_FILTERED_VACANCIES, GET_INCOME_VACANCIES,
    GET_LOAD_VACANCIES,
    GET_LOADING_STATUS,
    GET_OUTCOME_VACANCIES,
    GET_OWN_VACANCIES,
    GET_REJECTED_VACANCIES,
    GET_VACANCY,
    MERGE_VACANCIES, MERGE_VACANCY, SET_LOADED_VACANCY, VACANCY_CLEAN, VACANCY_ERROR, VACANCY_REQUEST, VACANCY_SUCCESS
} from "../types/vacancies";

const state = {
    all: {},
    list: [],
    loadedList: [],
    status: 'clear'
}


const getters = {
    [GET_INCOME_VACANCIES]: (state, getters) => {
        return getters[GET_ALL_VACANCIES].filter(v => v.status === 1)
    },
    [GET_OUTCOME_VACANCIES]: (state, getters) => {
        return getters[GET_ALL_VACANCIES].filter(v => v.status === 2)
    },
    [GET_ACCEPTED_VACANCIES]: (state, getters) => {
        return getters[GET_ALL_VACANCIES].filter(v => v.status === 3)
    },
    [GET_REJECTED_VACANCIES]: (state, getters) => {
        return getters[GET_ALL_VACANCIES].filter(v => v.status === 4)
    },
    [GET_OWN_VACANCIES]: (state, getters, rootState) => {
        const companyId = rootState.companyProfile.profile._id
        return getters[GET_ALL_VACANCIES].filter(v => {
            return v.companyId === companyId
        }).sort((a, b) => a.order - b.order)
    },
    [GET_ALL_VACANCIES]: (state, getters, rootState) => {
        const list =  Object.values(state.all).sort((a, b) => a.order - b.order)
        if(rootState.auth.role === USER) {
            list.map(v => {
                return v
            })
        }
        return list
    },
    [GET_VACANCY]: (state) => id => {
        if (!state.all[id]) return null
        const vacancy = state.all[id]
        return vacancy
    },
    [GET_LOAD_VACANCIES]: (state) => {
        return state.loadedList.slice()
    },
    [GET_LOADING_STATUS]: (state) => {
        return state.status
    }
}

const mutations = {
    [SET_VACANCY_STATUS] (state, payload) {
        state.find(v => v.id === payload.id).status = payload.val
        localStorage.setItem('vacancies', JSON.stringify(state))
    },
    [VACANCY_REQUEST] (state) {
        state.status = 'loading'
    },
    [VACANCY_SUCCESS] (state) {
        state.status = 'success'
    },
    [VACANCY_ERROR] (state) {
        state.status = 'error'
    },
    [VACANCY_CLEAN] (state) {
        state.status = 'clean'
        state.all = {}
        state.list = []
        state.loadedList = []
    },
    [SET_VACANCIES](state, payload) {
        state = payload
    },
    [MERGE_VACANCIES](state, payload) {
        const all = state.all
        payload.forEach(i => {
            i.id = i._id || i.id
            delete i._id
            i.image = baseURL + '/company/image-avatar/' + i.companyId + '.png';
            all[i.id] = i
        })
        state.all = JSON.parse(JSON.stringify(all))
        state.list = Object.values(state.all).sort((a, b) => a.order - b.order)
    },
    [MERGE_VACANCY](state, payload) {
        payload.id = payload._id || payload.id
        delete payload._id
        payload.image = baseURL + '/company/image-avatar/' + payload.companyId + '.png';
        payload.order = state.all[payload.id].order || state.all.length
        state.all[payload.id] = payload
        state.all = JSON.parse(JSON.stringify(state.all))
        state.list = Object.values(state.all).sort((a, b) => a.order - b.order)
    },
    [SET_LOADED_VACANCY](state, payload) {
        state.loadedList = []
        payload.forEach(v => {
            state.loadedList.push(state.all[v.id])
        })
    }
}
const actions = {
    [CREATE_VACANCY]: (_, payload) => new Promise((resolve, reject) => {
        return api.put('/company/vacancy/', payload)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    }),
    [GET_ALL_VACANCIES]: ({commit}) => new Promise((resolve, reject) => {
        commit(VACANCY_REQUEST)
        return api.post('vacancy/0/200')
            .then(res => {
                const vacancies = res.data.map((i, index) => {
                    i.order = index
                    i.status = 0
                    return i
                })
                commit(MERGE_VACANCIES, vacancies)
                commit(SET_LOADED_VACANCY, vacancies)
                commit(VACANCY_SUCCESS)
                resolve(res)
            })
            .catch(err => {
                commit(VACANCY_ERROR)
                reject(err)
            })
    }),
    [GET_ALL_STUDENT_VACANCIES]: ({commit}) => new Promise((resolve, reject) => {
        commit(VACANCY_REQUEST)
        return api.post('student/vacancy/0/200')
            .then(res => {
                const vacancies = res.data.vacancies.map((i, index) => {
                    i.order = index
                    i.status = i.status
                    return i
                })
                commit(MERGE_VACANCIES, vacancies)
                commit(SET_LOADED_VACANCY, vacancies)
                commit(VACANCY_SUCCESS)
                resolve(res)
            })
            .catch(err => {
                commit(VACANCY_ERROR)
                reject(err)
            })
    }),
    [GET_FILTERED_VACANCIES]: ({commit}, payload = {}) => new Promise((resolve, reject) => {
        commit(VACANCY_REQUEST)
        return api.post('vacancy/0/200', {filter: payload})
            .then(res => {
                const vacancies = res.data.map((i, index) => {
                    i.order = index
                    i.status = 0
                    return i
                })
                commit(MERGE_VACANCIES, vacancies)
                commit(SET_LOADED_VACANCY, vacancies)
                commit(VACANCY_SUCCESS)
                resolve(res)
            })
            .catch(err => {
                console.log(err.response.status)
                commit(VACANCY_ERROR)
                reject(err)
            })
    }),
    [GET_FILTERED_STUDENT_VACANCIES]: ({commit}, payload = {}) => new Promise((resolve, reject) => {
        commit(VACANCY_REQUEST)
        return api.post('student/vacancy/0/200', {filter: payload})
            .then(res => {
                const vacancies = res.data.vacancies.map((i, index) => {
                    i.order = index
                    i.status = i.status || 0
                    return i
                })
                commit(MERGE_VACANCIES, vacancies)
                commit(SET_LOADED_VACANCY, vacancies)
                commit(VACANCY_SUCCESS)
                resolve(res)
            })
            .catch(err => {
                console.log(err.response.status)
                commit(VACANCY_ERROR)
                reject(err)
            })
    }),
    [GET_OWN_VACANCIES]: ({commit}) => new Promise((resolve, reject) => {
        commit(VACANCY_REQUEST)
        return api.post('vacancy/0/200')
            .then(res => {
                const vacancies = res.data.map((i, index) => {
                    i.order = index
                    i.status = 0
                    return i
                })
                commit(MERGE_VACANCIES, vacancies)
                commit(SET_LOADED_VACANCY, vacancies)
                commit(VACANCY_SUCCESS)
                resolve(res)
            })
            .catch(err => {
                console.log(err)
                commit(VACANCY_ERROR)
                reject(err)
            })
    }),
    [GET_VACANCY]: ({commit}, id) => new Promise((resolve, reject) => {
        commit(VACANCY_REQUEST)
        return api.post('vacancy/' + id)
            .then(res => {
                const vacancy = res.data
                vacancy.status = vacancy.status || 0
                commit(MERGE_VACANCY, vacancy)
                commit(VACANCY_SUCCESS)
                resolve(res)
            })
            .catch(err => {
                console.log(err)
                commit(VACANCY_ERROR)
                reject(err)
            })
    }),

}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}