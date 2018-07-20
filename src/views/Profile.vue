<template>
  <div class="profile">
    <div class="container">
      <el-container>
        <nav-panel></nav-panel>
        <el-main>
          <user-profile v-if="!$route.params.page || $route.params.page === '' "></user-profile>
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

  export default {
      name: 'Profile',
      components: {
          NavPanel,
          UserProfile,
          UserRequests,
          UserSettings,
      }
  }
</script>