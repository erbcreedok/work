import api from '../api/main'
import {
    GET_ALL_QUESTIONS, GET_SET_QUESTIONS, GET_SET_SURVEY, MERGE_SURVEYS, SET_SURVEY_ANSWER,
    SURVEYS_CLEAN, SURVEYS_ERROR,
    SURVEYS_REQUEST, GET_SURVEYS_STATUS,
    SURVEYS_SUCCESS
} from "../types/surveys"

const state = {
    status: 'clear',
    survey: {}
}


const getters = {
    [GET_SET_SURVEY]: (state) => JSON.parse(JSON.stringify(state.survey)),
    [GET_SURVEYS_STATUS]: (state) => JSON.parse(JSON.stringify(state.status))
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
        state.survey = {}
    },
    [MERGE_SURVEYS](state, payload) {
        payload.id = payload._id
        delete payload._id
        payload.questions.forEach(i => {
            i.id = i._id || i.id
            delete i._id
        })
        state.survey = JSON.parse(JSON.stringify(payload))
    },
}

const actions = {
    [GET_ALL_QUESTIONS]: ({commit}) => new Promise((resolve, reject) => {
        commit(SURVEYS_REQUEST)
        return api.get('questionnaire/all-question-sets')
            .then(res => {
                const questions = res.data.questionSets[0]
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
        return api.get(`questionnaire/question-set/${payload}`)
            .then(res => {
                const questions = res.data.questionSet[0]
                commit(MERGE_SURVEYS, questions)
                commit(SURVEYS_SUCCESS)
                resolve(JSON.parse(JSON.stringify(questions)))
            })
            .catch(err => {
                commit(SURVEYS_ERROR)
                reject(err)
            })
    }),
    [SET_SURVEY_ANSWER]: ({commit}, {setNumber, questionNumber, answers}) => new Promise((resolve, reject) => {
        commit(SURVEYS_REQUEST)
        return api.post(`/student/questionnaire/answer/${setNumber}/${questionNumber}`, {answers})
            .then(res => {
                commit(SURVEYS_SUCCESS)
                resolve(res)
            })
            .catch(err => {
                commit(SURVEYS_ERROR)
                reject(err)
            })
    })

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}