import api, {baseURL} from '../api/main'
import {
    ACCEPT_STUDENT_VACANCY,
    ACCEPT_VACANCY, APPLICATIONS_CLEAN,
    APPLICATIONS_ERROR, APPLICATIONS_REQUEST, APPLICATIONS_SUCCESS, APPLY_STUDENT_VACANCY, APPLY_VACANCY,
    CANCEL_STUDENT_VACANCY,
    CANCEL_VACANCY,
    DISCARD_STUDENT_VACANCY,
    DISCARD_VACANCY, GET_ACCEPTED_APPLICATIONS, GET_ALL_APPLICATIONS,
    GET_APPLICATIONS, GET_INCOME_APPLICATIONS, GET_OUTCOME_APPLICATIONS, GET_REJECTED_APPLICATIONS, MERGE_APPLICATION,
    MERGE_APPLICATIONS,
    REJECT_STUDENT_VACANCY,
    REJECT_VACANCY,
    SET_APPLICATION
} from "../types/applications";
import {GET_VACANCY} from "../types/vacancies";
import {GET_STUDENT} from "../types/students";

const state = {
    list: [],
    all: {
        applications: {},
        students: {},
        vacancies: {}
    },
    status: 'clean'
}

const getters = {
    [GET_ALL_APPLICATIONS]: (state) => {
        if (state) {
            const list =  Object.values(state.all.applications).sort((a, b) => a.order - b.order)
            return JSON.parse(JSON.stringify(list)) || []
        } return []
    },
    [GET_INCOME_APPLICATIONS]: (state, getters) => {
        return getters[GET_ALL_APPLICATIONS].filter(a => a.status === 1)
    },
    [GET_OUTCOME_APPLICATIONS]: (state, getters) => {
        return getters[GET_ALL_APPLICATIONS].filter(a => a.status === 2)
    },
    [GET_ACCEPTED_APPLICATIONS]: (state, getters,) => {
        return getters[GET_ALL_APPLICATIONS].filter(a => a.status === 3)
    },
    [GET_REJECTED_APPLICATIONS]: (state, getters) => {
        return getters[GET_ALL_APPLICATIONS].filter(a => a.status === 4)
    },
    [GET_VACANCY]: (state) => id => {
        if (!state.all.vacancies[id]) return null
        const vacancy = state.all.vacancies[id]
        return vacancy
    },
    [GET_STUDENT]: (state) => id => {
        if (!state.all.students[id]) return null
        const student = state.all.students[id]
        return student
    },
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
    },
    [MERGE_APPLICATIONS]: (state, payload) => {
        const all = state.all
        payload.applications.forEach(i => {
            i.id = i._id || i.id
            delete i._id
            all.applications[i.id] = i
        })
        payload.students.forEach(i => {
            i.id = i._id || i.id
            delete i._id
            all.students[i.id] = i
        })
        payload.vacancies.forEach(i => {
            i.id = i._id || i.id
            delete i._id
            i.image = baseURL + '/company/image-avatar/' + i.companyId + '.png';
            all.vacancies[i.id] = i
        })
        state.all = JSON.parse(JSON.stringify(all))
        state.list = Object.values(state.all.applications).sort((a, b) => a.order - b.order)
    },
    [MERGE_APPLICATION](state, payload) {
        payload.application.id = payload._id || payload.id
        delete payload._id
        payload.application.order = state.all[payload.id].order || state.all.length
        state.all[payload.id] = payload
        state.all = JSON.parse(JSON.stringify(state.all))
        state.list = Object.values(state.all).sort((a, b) => a.order - b.order)
    },
}

const actions = {
    [APPLY_VACANCY]: ({commit}, payload) => new Promise((respond, reject) => {
        commit(APPLICATIONS_REQUEST)
        console.log(payload)
        api.post('/student/vacancy/apply/', payload)
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
    [CANCEL_VACANCY]: ({commit}, payload) => new Promise((respond, reject) => {
        commit(APPLICATIONS_REQUEST)
        api.post('/student/vacancy/cancel/', {vacancyId: payload})
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
    [CANCEL_STUDENT_VACANCY]: ({commit}, payload) => new Promise((respond, reject) => {
        commit(APPLICATIONS_REQUEST)
        api.post('/company/vacancy/cancel/', payload)
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
        return api.post('/company/vacancy/getApplications')
            .then(res => {
                const applications = res.data.applications.map((i, index) => {
                    i.order = index;
                    return i })
                const students = res.data.students.map((i, index) => {
                    i.order = index;
                    i.image = baseURL + '/student/image-avatar/' + i._id + '.png';
                    return i })
                const vacancies = res.data.vacancies.map((i, index) => {
                    i.order = index
                    i.status = 0
                    return i
                })
                commit(MERGE_APPLICATIONS, {applications, students, vacancies})
                commit(APPLICATIONS_SUCCESS)
            })
            .catch(err => {
                console.log(err)
                commit(APPLICATIONS_ERROR)
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