<template>
  <div class="profile">
    <div class="container">
      <el-container>
        <nav-panel></nav-panel>
        <!--  Временный обход child роутинга -->
        <el-main v-if="isLogged === 1"> <!-- 1-ый тип - залогинился работник -->
          <user-profile v-if="!$route.params.page || $route.params.page === '' "></user-profile>
          <user-requests v-else-if="$route.params.page && $route.params.page === 'request' "></user-requests>
          <user-settings v-else-if="$route.params.page && $route.params.page === 'settings' "></user-settings>
        </el-main>
        <el-main v-if="isLogged === 2"> <!-- 2-ой тип - залогинилась компания -->
          <company-profile v-if="!$route.params.page || $route.params.page === '' "></company-profile>
          <company-search v-else-if="$route.params.page && $route.params.page === 'workers' "></company-search>
          <company-requests v-else-if="$route.params.page && $route.params.page === 'request' "></company-requests>
          <user-settings v-else-if="$route.params.page && $route.params.page === 'settings' "></user-settings>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
  import NavPanel from '../components/NavPanel.vue'
  import UserProfile from '../components/UserProfile.vue'
  import UserRequests from '../components/UserRequests.vue'
  import UserSettings from '../components/UserSettings.vue'
  import CompanyProfile from '../components/CompanyProfile.vue'
  import CompanySearch from '../components/CompanySearch.vue'
  import CompanyRequests from '../components/CompanyRequests.vue'

  export default {
      name: 'Profile',
      components: {
          NavPanel,
          UserProfile,
          UserRequests,
          UserSettings,
          CompanyProfile,
          CompanySearch,
          CompanyRequests,
      },
      computed: {
          isLogged() {
              return this.$store.state.isLogged // Проверка на логин через store
          }
      },
      beforeMount() {
          // Временный обход security роутинга, для не зарегестрированных пользователей
          if (!this.$store.state.isLogged) {
              this.$router.push('/')
          }
      }
  }
</script>