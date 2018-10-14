import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/scss/index.scss'
import '@fortawesome/fontawesome-free/css/all.css'
import {setAuth} from './store/api/main'
import wysiwyg from 'vue-wysiwyg'
import VueScrollTo from 'vue-scrollto'

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
Vue.use(BootstrapVue)
Vue.use(wysiwyg, {})
Vue.use(VueScrollTo, {
    container: "body",
    duration: 300,
    easing: "ease",
    offset: 0
})

// Проверка авторизации
const token = localStorage.getItem('user-token')
if (token) {
    setAuth(token) // Добавление хидэра Authentication в параметры HTTP сервиса axios
}

new Vue({
  router, //Routing parameters
  store, //Storage
  render: h => h(App)//Rendering Application
}).$mount('#app')
