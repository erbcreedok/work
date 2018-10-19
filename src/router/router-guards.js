import store from '../store'
import {COMPANY, GET_STATUS, USER} from "../store/mutation-types";
import {USER_PROFILE} from "../store/types/userProfile";
import {COMPANY_PROFILE, GET_PROFILE} from "../store/types/companyProfile";

export const requireAuth = (to, from, next)  => {
    const isLogged = store.getters['auth/isLogged'];
    if (isLogged === USER || isLogged === COMPANY) {
        next()
    } else {
        next(from.fullPath)
    }
}

export const unrequireAuth = (to, from, next) => {
    const isLogged = store.getters['auth/isLogged'];
    if (isLogged === USER || isLogged === COMPANY) {
        next('/profile')
    } else {
        next()
    }
}

export const accountConfirmed = (to, from, next) => {
    const isLogged = store.getters['auth/isLogged'];
    const profileType = isLogged === USER ? USER_PROFILE : (isLogged === COMPANY ? COMPANY_PROFILE : false)
    const proceed = () => {
        if (store.getters[profileType + GET_PROFILE].confirmed) {
            next()
        }
        else {
            next('/profile/unconfirmed')
        }
    }

    if (!isLogged) {
        next(from.fullPath)
    }
    else if (store.getters[profileType + GET_STATUS] === 'success') {
        proceed();
    } else {
        store.watch((state, getters) => getters[profileType + GET_STATUS], function () {
            if (store.getters[profileType + GET_STATUS] === 'success') {
                proceed();
            }
        })
    }
}