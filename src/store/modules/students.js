import api, {baseURL} from '../api/main'
import {
    GET_ALL_STUDENTS, GET_STUDENT, MERGE_STUDENT, MERGE_STUDENTS, STUDENT_CLEAN, STUDENT_ERROR, STUDENT_REQUEST,
    STUDENT_SUCCESS
} from "../types/students";

const state = {
    all: {},
    list: [],
    status: 'clear'
}


const getters = {
    [GET_ALL_STUDENTS]: (state) => {
        return Object.values(state.all).sort((a, b) => a.order - b.order)
    },
    [GET_STUDENT]: state => id => {
        return state.all[id]
    }
}

const mutations = {
    [STUDENT_REQUEST] (state) {
        state.status = 'loading'
    },
    [STUDENT_SUCCESS] (state) {
        state.status = 'success'
    },
    [STUDENT_ERROR] (state) {
        state.status = 'error'
    },
    [STUDENT_CLEAN] (state) {
        state.status = 'clean'
        state.all = {}
        state.list = []
    },
    [MERGE_STUDENTS](state, payload) {
        const all = state.all
        payload.forEach(i => {
            i.id = i._id || i.id
            delete i._id
            all[i.id] = i
        })
        state.all = JSON.parse(JSON.stringify(all))
    },
    [MERGE_STUDENT](state, payload) {
        payload.id = payload._id || payload.id
        delete payload._id
        payload.order = state.all[payload.id].order || state.all.length
        state.all[payload.id] = payload
        state.all = JSON.parse(JSON.stringify(state.all))
        state.list = Object.values(state.all).sort((a, b) => a.order - b.order)
    },
}
const actions = {
    [GET_ALL_STUDENTS]({commit}) {
        commit(STUDENT_REQUEST)
        return api.post('student/0/200')
            .then(res => {
                const data = res.data.map((i, index) => {
                    i.order = index;
                    i.image = baseURL + '/student/image-avatar/' + i._id + '.png';
                    return i })
                commit(MERGE_STUDENTS, data)
                commit(STUDENT_SUCCESS)
                return data
            })
            .catch(err => {
                console.log(err)
                commit(STUDENT_ERROR)
                return err
            })
    },
    [GET_STUDENT]({commit}, payload) {
        commit(STUDENT_REQUEST)
        return api.post('student/' + payload)
            .then(res => {
                res.data.image = baseURL + '/student/image-avatar/' + res.data._id + '.png'
                commit(MERGE_STUDENT, res.data)
                commit(STUDENT_SUCCESS)
            })
            .catch(err => {
                console.log(err)
                commit(STUDENT_ERROR)
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