import {removeAuth, setAuth} from "../store/api/main";
import {USER} from "../store/mutation-types";

export const loginActions = (token, role = USER) => {
    localStorage.setItem('user-token', token)
    localStorage.setItem('user-role', role)
    setAuth(token)
}

export const logoutActions = () => {
    localStorage.removeItem('user-token')
    localStorage.removeItem('user-role')
    removeAuth()
}