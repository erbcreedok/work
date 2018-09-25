import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/NotFound.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Dashboard from './views/Dashboard.vue'
import Profile from './views/Profile.vue'
import Vacancies from './views/Vacancies.vue'
import Survey from './views/Survey.vue'
import Request from './views/Request.vue'
import Workers from './views/Workers.vue'
import Settings from './views/Settings.vue'
import LoginModal from './components/ClientModals/LoginModal.vue'
import RegisterModal from './components/ClientModals/RegisterModal.vue'
import LoginCompanyModal from './components/CompanyModals/LoginModal.vue'
import RegisterCompanyModal from './components/CompanyModals/RegisterModal.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
          path: '/profile',
          component: Dashboard,
          children: [
              {
                  path: 'survey/:set',
                  name: 'survey',
                  component: Survey
              },
              {
                  path: 'request',
                  name: 'request',
                  component: Request
              },
              {
                  path: 'workers',
                  name: 'workers',
                  component: Workers
              },
              {
                  path: 'settings',
                  name: 'settings',
                  component: Settings
              },
              {
                  path: '',
                  name: 'profile',
                  component: Profile
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
      path: '/about',
      name: 'about',
      component: About
    },
    {
          path: '/',
          name: 'home',
          component: Home,
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
