import api, {baseURL} from '../api/main'
import {
    GET_PROFILE, MERGE_PROFILE, PROFILE_CLEAN, PROFILE_ERROR, PROFILE_REQUEST,
    PROFILE_SUCCESS
} from '../types/companyProfile';
const state = {
    status: 'clean',
    profile: {
        id: null,
        name: null,
        phone: null,
        email: null,
        image: null,
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
    },
    [PROFILE_CLEAN]: state => {
        state.status = 'clean'
        state.profile = {
            id: null,
            name: null,
            phone: null,
            email: null,
            image: null,
            description: null
        }
    }
}

const actions = {
    [GET_PROFILE]: ({commit}) => new Promise((respond, reject) => {
        commit(PROFILE_REQUEST)
        api.get('company/private/profile').then(res => {
            commit(PROFILE_SUCCESS)
            res.data.image = baseURL + '/company/image-avatar/' + res.data.id + '.png'
            commit(MERGE_PROFILE, res.data)
            respond(res)
        }).catch(err => {
            commit(PROFILE_ERROR)
            console.log(err)
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