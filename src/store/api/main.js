import axios from 'axios'

export const baseURL = 'http://letswork.tk:3000'

const api = axios.create({
    baseURL: baseURL,
    // baseURL: 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json',
    }
})

export const setAuth = token => { api.defaults.headers.common.Authorization = token }
export const removeAuth = () => { delete api.defaults.headers.common.Authorization }

export const authCompany    = data => api.post('/company/auth/signin', data)
export const createCompany  = data => api.post('/company/auth/signup', data)
export const authUser       = data => api.post('/student/auth/signin', data)
export const createUser     = data => api.post('/student/auth/signup', data)

export const getProfile = () => axios({url: 'http://localhost:3000/company/private/profile', method: 'get'})

export default api