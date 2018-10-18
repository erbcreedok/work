<template>
  <div id="app">
    <Header :isLogged="isLogged"></Header> <!-- Шапка приложения -->
    <router-view></router-view> <!-- Компонент отображающий контент в зависимости от маршрута -->
    <Footer></Footer> <!-- Нижний колонтитул -->
  </div>
</template>


<script>
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'
  import {COMPANY, USER} from "./store/mutation-types";
  import {USER_PROFILE, GET_PROFILE} from "./store/types/userProfile";
  import { COMPANY_PROFILE } from "./store/types/companyProfile";

  export default {
      name: 'app',
      components: {
          Header,
          Footer
      },
      computed: {
          isLogged() {
              // Проверка авторизации в storage.
              // Возвращает false(не авторизован),
              //            'USER'(авторизован от лца студента),
              //            'COMPANY'(авторизован от лица компании)
              return this.$store.getters['auth/isLogged']
          },

      },
      watch: {
          isLogged: function (newValue, oldValue) {
              if (oldValue !== newValue && newValue === USER) {
                  this.$store.dispatch(USER_PROFILE + GET_PROFILE)  //Загрузка профиля студента из Бэка при случае авторизации от лица студента
              }
              if (oldValue !== newValue && newValue === COMPANY) {
                  this.$store.dispatch(COMPANY_PROFILE + GET_PROFILE) //Загрузка профиля компании из Бэка при случае авторизации от лица компании
              }
          }
      },
      beforeMount() {
          if (this.$store.state.userProfile.status === 'clean' && this.isLogged === USER) {
              this.$store.dispatch(USER_PROFILE + GET_PROFILE) //Загрузка профиля студента из Бэка при случае авторизации от лица студента
          }
          if (this.$store.state.companyProfile.status === 'clean' && this.isLogged === COMPANY) {
              this.$store.dispatch(COMPANY_PROFILE + GET_PROFILE)  //Загрузка профиля компании из Бэка при случае авторизации от лица компании
          }
      }
  }
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100vw;
  overflow: hidden;
}
</style>
