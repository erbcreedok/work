import api, {baseURL} from '../api/main'
import {
    GET_PROFILE, GET_TESTS, MERGE_PROFILE, PROFILE_CLEAN, PROFILE_ERROR, PROFILE_REQUEST,
    PROFILE_SUCCESS
} from "../types/userProfile";
import {logoutActions} from "../../actions/auth";
import {GET_STATUS, RESEND_VERIFICATION} from "../mutation-types";

const initState = {
    status: 'clean',
    profile: {
        id: null,
        firstName: null,
        lastName: null,
        rate: 5,
        phone: null,
        email: null,
        image: null,
        description: null,
        confirmed: false
    },
    tests: []
}

const state = JSON.parse(JSON.stringify(initState))

const getters = {
    [GET_PROFILE]   : state => state.profile,
    [GET_TESTS]     : state => state.tests,
    [GET_STATUS]: state => state.status,
}

const mutations = {
    [MERGE_PROFILE]: (state, {student, questionSets}) => {
        student.id = student._id
        delete student._id
        student.image = baseURL + '/student/image-avatar/' + student.id + '.png'
        state.profile   = {...state.profile, ...student}
        state.tests     = {...state.tests, ...questionSets}
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
        state = JSON.parse(JSON.stringify(initState))
        return state

    }
}

const actions = {
    [GET_PROFILE]: ({commit}) => new Promise(() => {
        commit(PROFILE_REQUEST)
        api.get('student/private/profile').then(res => {
            commit(PROFILE_SUCCESS)
            commit(MERGE_PROFILE, JSON.parse(JSON.stringify(res.data)))
        }).catch(err => {
            if (err.response.status === 401 || err.response.status === 403) {
                logoutActions()
            }
            console.log(err)
            commit(PROFILE_ERROR)
        })
    }),
    [RESEND_VERIFICATION]: () => api.get('student/auth/resend-verification')
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}