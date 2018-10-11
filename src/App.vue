<template>
  <div id="app">
    <Header></Header> <!-- Шапка приложения -->
    <router-view></router-view> <!-- Компонент отображающий контент в зависимости от маршрута -->
    <Footer></Footer> <!-- Нижний колонтитул -->
  </div>
</template>


<script>
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'
  import {COMPANY, USER} from "./store/mutation-types";
  import {USER_PROFILE, GET_PROFILE as USER_GET_PROFILE} from "./store/types/userProfile";
  import {COMPANY_PROFILE, GET_PROFILE as COMPANY_GET_PROFILE} from "./store/types/companyProfile";

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
      beforeMount() {
          if (this.isLogged) { //isLogged - переменная из computed()
              this.$router.push('/') //Переадресация на корневую страницы в случае не авторизованности
          } else if (this.isLogged === USER) {
              this.$store.dispatch(USER_PROFILE + USER_GET_PROFILE) //Загрузка профиля студента из Бэка при случае авторизации от лица студента
          } else if (this.isLogged === COMPANY) {
              this.$store.dispatch(COMPANY_PROFILE + COMPANY_GET_PROFILE)  //Загрузка профиля компании из Бэка при случае авторизации от лица компании
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
