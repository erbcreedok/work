import api from '../api/main'
import {
    GET_ALL_QUESTIONS, GET_ALL_SURVEYS, GET_SET_QUESTIONS, GET_SET_SURVEYS, MERGE_SURVEYS, SURVEYS_CLEAN, SURVEYS_ERROR,
    SURVEYS_REQUEST,
    SURVEYS_SUCCESS
} from "../types/surveys"

const state = {
    all: {},
    list: [],
    loadedList: [],
    status: 'clear'
}


const getters = {
    [GET_ALL_SURVEYS]: (state) => {
        const list =  Object.values(state.all).sort((a, b) => a.order - b.order)
        return JSON.parse(JSON.stringify(list))
    },
    [GET_SET_SURVEYS]: (state, getters) => (set) => {
        return getters[GET_ALL_SURVEYS].filter(s => {
            return s.setNumber === set
        })
    }
}

const mutations = {
    [SURVEYS_REQUEST] (state) {
        state.status = 'loading'
    },
    [SURVEYS_SUCCESS] (state) {
        state.status = 'success'
    },
    [SURVEYS_ERROR] (state) {
        state.status = 'error'
    },
    [SURVEYS_CLEAN] (state) {
        state.status = 'clean'
        state.all = {}
        state.list = []
        state.loadedList = []
    },
    [MERGE_SURVEYS](state, payload) {
        const all = state.all
        payload.forEach(i => {
            i.id = i._id || i.id
            delete i._id
            i.order = Object.values(all).length
            all[i.id] = i
        })
        state.all = JSON.parse(JSON.stringify(all))
        state.list = JSON.parse(JSON.stringify(Object.values(state.all).sort((a, b) => a.order - b.order)))
    },
}
const actions = {
    [GET_ALL_QUESTIONS]: ({commit}) => new Promise((resolve, reject) => {
        commit(SURVEYS_REQUEST)
        return api.get('questionnaire/all-questions')
            .then(res => {
                const questions = res.data.questions
                commit(MERGE_SURVEYS, questions)
                commit(SURVEYS_SUCCESS)
                resolve(res)
            })
            .catch(err => {
                commit(SURVEYS_ERROR)
                reject(err)
            })
    }),
    [GET_SET_QUESTIONS]: ({commit}, payload = 0) => new Promise((resolve, reject) => {
        commit(SURVEYS_REQUEST)
        return api.get('questionnaire/set-questions/' + payload)
            .then(res => {
                const questions = res.data.questions
                commit(MERGE_SURVEYS, questions)
                commit(SURVEYS_SUCCESS)
                resolve(questions)
            })
            .catch(err => {
                commit(SURVEYS_ERROR)
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