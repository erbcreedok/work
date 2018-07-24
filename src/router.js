import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Profile from './views/Profile.vue'
import Vacancies from './views/Vacancies.vue'
import LoginModal from './components/ClientModals/LoginModal.vue'
import RegisterModal from './components/ClientModals/RegisterModal.vue'
import LoginCompanyModal from './components/CompanyModals/LoginModal.vue'
import RegisterCompanyModal from './components/CompanyModals/RegisterModal.vue'
Vue.use(Router)

export default new Router({
  routes: [
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
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      children: [

      ]
    },
    {
      path: '/profile/:page',
      name: 'profile-page',
      component: Profile
    },
    {
      path: '/vacancies',
      name: 'vacancies',
      component: Vacancies
    }
  ]
})
