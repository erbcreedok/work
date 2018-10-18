import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '../views/NotFound.vue'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Profile from '../views/Profile.vue'
import ProfileUnconfirmed from '../views/ProfileUnconfirmed.vue'
import Vacancies from '../views/Vacancies.vue'
import Survey from '../views/Survey.vue'
import Request from '../views/Request.vue'
import Workers from '../views/Workers.vue'
import Settings from '../views/Settings.vue'
import LoginModal from '../components/ClientModals/LoginModal.vue'
import RegisterModal from '../components/ClientModals/RegisterModal.vue'
import LoginCompanyModal from '../components/CompanyModals/LoginModal.vue'
import RegisterCompanyModal from '../components/CompanyModals/RegisterModal.vue'
import {accountConfirmed, requireAuth, unrequireAuth} from "./router-guards";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/profile',
      component: Dashboard,
      beforeEnter: requireAuth,
      children: [
        {
          path: 'survey/:set',
          name: 'survey',
          component: Survey,
          beforeEnter: accountConfirmed,
        },
        {
          path: 'request',
          name: 'request',
          component: Request,
          beforeEnter: accountConfirmed,
        },
        {
          path: 'workers',
          name: 'workers',
          component: Workers,
          beforeEnter: accountConfirmed,
        },
        {
          path: 'settings',
          name: 'settings',
          component: Settings,
          beforeEnter: accountConfirmed,
        },
        {
          path: 'unconfirmed',
          name: 'unconfirmed',
          component: ProfileUnconfirmed,
        },
        {
          path: '',
          name: 'profile',
          component: Profile,
        },
        {
          path: '**',
          name: 'not-found',
          component: NotFound
        }
      ]
    },
    {
      path: '/vacancies',
      name: 'vacancies',
      component: Vacancies
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: unrequireAuth,
      meta: {showModal: false},
      children: [
        {
          path: 'register',
          name: 'register',
          component: RegisterModal,
          meta: {showModal: true},
        },
        {
          path: 'login',
          name: 'login',
          component: LoginModal,
          meta: {showModal: true},
        },
        {
          path: 'register-company',
          name: 'register-company',
          component: RegisterCompanyModal,
          meta: {showModal: true},
        },
        {
          path: 'login-company',
          name: 'login-company',
          component: LoginCompanyModal,
          meta: {showModal: true},
        },
      ]
    },
  ]
})
