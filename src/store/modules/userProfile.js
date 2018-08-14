import api from '../api/main'
import {GET_PROFILE, MERGE_PROFILE, PROFILE_ERROR, PROFILE_REQUEST, PROFILE_SUCCESS} from "../types/userProfile";
const state = {
    status: '',
    profile: {
        name: null,
        rate: 5,
        phone: null,
        email: null,
        image: 'https://static.intercomassets.com/avatars/1309094/square_128/lk-1498832667.jpg?1498832667',
        description: null
    }
}

const getters = {
    getProfile: state => state.profile
}

const mutations = {
    [MERGE_PROFILE]: (state, payload) => {
        state.profile = {...state.profile, ...payload}
    },
    [PROFILE_REQUEST]: state => {
        state.status = 'loading'
    },
    [PROFILE_SUCCESS]: state => {
        state.status = 'success'
    },
    [PROFILE_ERROR]: state => {
        state.status = 'error'
    }
}

const actions = {
    [GET_PROFILE]: ({commit}) => new Promise(() => {
        commit(PROFILE_REQUEST)
        api.get('student/private/profile').then(res => {
            commit(PROFILE_SUCCESS)
            commit(MERGE_PROFILE, res.data)
        }).catch(err => {
            console.log(err)
            commit(PROFILE_ERROR)
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