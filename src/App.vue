<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
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
              return this.$store.getters['auth/isLogged'] // Проверка на логин через store
          },

      },
      beforeMount() {
          const isLogged = this.$store.getters['auth/isLogged']
          if (!isLogged) {
              this.$router.push('/')
          } else if (isLogged === USER) {
              this.$store.dispatch(USER_PROFILE + USER_GET_PROFILE)
          } else if (isLogged === COMPANY) {
              this.$store.dispatch(COMPANY_PROFILE + COMPANY_GET_PROFILE)
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
