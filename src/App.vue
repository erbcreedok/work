<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>


<script>
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  export default {
      name: 'app',
      components: {
          Header,
          Footer
      },
      beforeMount() {

          //Имитация сессии логина с использованием localStorage
          if (localStorage.getItem('isLogged') && !isNaN(localStorage.getItem('isLogged'))) {
              this.$store.commit('setLogged', localStorage.getItem('isLogged') - 0)
          } else {
              localStorage.setItem('isLogged', 0)
          }

          //Имитация базы данных сохраненных вакансии
          if (this.$store.state.isLogged === 1) {
              if (localStorage.getItem('vacancies')) {
                  this.$store.commit('setVacancies', JSON.parse(localStorage.getItem('vacancies')))
              }
          } else {
              localStorage.removeItem('vacancies') //Очистка данных при logout от юзера
          }

          //Имитация базы данных сохраненных резюме
          if (this.$store.state.isLogged === 2) {
              if (localStorage.getItem('people')) {
                  this.$store.commit('setPeople', JSON.parse(localStorage.getItem('people')))
              }
          } else {
              localStorage.removeItem('people') //Очистка данных при logout от компании
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
