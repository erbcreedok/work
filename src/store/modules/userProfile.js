import api, {baseURL} from '../api/main'
import {
    GET_PROFILE, MERGE_PROFILE, PROFILE_CLEAN, PROFILE_ERROR, PROFILE_REQUEST,
    PROFILE_SUCCESS
} from "../types/userProfile";
import {logoutActions} from "../../actions/auth";
const state = {
    status: 'clean',
    profile: {
        id: null,
        name: null,
        firstName: null,
        lastName: null,
        rate: 5,
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
            firstName: null,
            lastName: null,
            phone: null,
            email: null,
            image: null,
            description: null
        }
    }
}

const actions = {
    [GET_PROFILE]: ({commit}) => new Promise(() => {
        commit(PROFILE_REQUEST)
        api.get('student/private/profile').then(res => {
            res.data.image = baseURL + '/student/image-avatar/' + res.data._id + '.png'
            commit(PROFILE_SUCCESS)
            commit(MERGE_PROFILE, res.data)
        }).catch(err => {
            if (err.response.status === 401 || err.response.status === 403) {
                logoutActions()
            }
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