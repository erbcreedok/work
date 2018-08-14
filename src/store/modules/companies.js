import {GET_COMPANY, SET_COMPANY} from "../types/companies";
import api from '../api/main'

export const state = {
    all: {},
    list: [],
    state: 'clear'
}

export const getters = {

}

export const mutations = {
    [SET_COMPANY](state, payload) {
        const all = {}
        payload.forEach(i => {
            i.id = i._id || i.id
            delete i._id
            all[i.id] = i
        })
        state.all[payload.id] = payload
    }
}

export const actions = {
    [GET_COMPANY]: (_, id) => new Promise(() => {
        api.post('company/' + id).then(
        )
    })
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}