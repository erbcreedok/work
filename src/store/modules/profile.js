import {getProfile} from '../api/main'
import {GET_COMPANY_PROFILE} from "../mutation-types";
import axios from "axios";
const state = {
    profileType: null,
    role: localStorage.getItem('user-role') || null,
    data: {}
}

const getters = {
    getRole: state => state.role,
    getData: state => state.data
}

const actions = {
    [GET_COMPANY_PROFILE]: () => {
        console.log('new request')
        return new Promise (() => {
            getProfile()
                .then(res => console.log(res.data))
                .catch(err => console.log(err, delete axios.defaults.headers.common['Authorization']))
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions
}