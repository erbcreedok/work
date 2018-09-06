import api, {baseURL} from '../api/main'
import {
    GET_PROFILE, MERGE_PROFILE, PROFILE_CLEAN, PROFILE_ERROR, PROFILE_REQUEST,
    PROFILE_SUCCESS
} from '../types/companyProfile';
import {logoutActions} from "../../actions/auth";
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
    [GET_PROFILE]: ({commit}) => new Promise(() => {
        commit(PROFILE_REQUEST)
        api.get('company/private/profile').then(res => {
            console.log(res);
            res.data.image = baseURL + '/company/image-avatar/' + res.data.id + '.png'
            commit(MERGE_PROFILE, res.data)
            commit(PROFILE_SUCCESS)
        }).catch(err => {
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                logoutActions()
            }
            commit(PROFILE_ERROR)
            console.log(err)
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