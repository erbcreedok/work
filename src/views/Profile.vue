<template>
  <div class="profile">
    <div class="container">
      <el-container>
        <nav-panel></nav-panel>
        <el-main v-if="isLogged === 1">
          <user-profile v-if="!$route.params.page || $route.params.page === '' "></user-profile>
          <user-requests v-else-if="$route.params.page && $route.params.page === 'request' "></user-requests>
          <user-settings v-else-if="$route.params.page && $route.params.page === 'settings' "></user-settings>
        </el-main>
        <el-main v-if="isLogged === 2">
          <company-profile v-if="!$route.params.page || $route.params.page === '' "></company-profile>
          <user-requests v-else-if="$route.params.page && $route.params.page === 'request' "></user-requests>
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

  export default {
      name: 'Profile',
      components: {
          NavPanel,
          UserProfile,
          UserRequests,
          UserSettings,
          CompanyProfile,
      },
      computed: {
          isLogged() {
              return this.$store.state.isLogged
          }
      }
  }
</script>