<template>
  <div class="p-0">
    <user-profile v-if="isLogged === USER"></user-profile> <!-- 1-ый тип - залогинился работник -->
    <company-profile v-if="isLogged === COMPANY" ></company-profile> <!-- 2-ой тип - залогинилась компания -->
    <unconfirmed-block v-if="isLoaded && !isConfirmed"></unconfirmed-block>
  </div>
</template>

<script>
  import UserProfile from '../components/UserProfile/UserProfile.vue'
  import CompanyProfile from '../components/CompanyProfile/CompanyProfile.vue'
  import {COMPANY, GET_STATUS, USER} from "../store/mutation-types";
  import {COMPANY_PROFILE, GET_PROFILE} from "../store/types/companyProfile";
  import {USER_PROFILE} from "../store/types/userProfile";
  import UnconfirmedBlock from "../components/UnconfirmedBlock";

  export default {
      name: 'profile',
      components: {
          UnconfirmedBlock,
          UserProfile,
          CompanyProfile,
      },
      computed: {
          isLogged() {
              return this.$store.getters['auth/isLogged']
          },
          profile() {
              return this.profileStore ? this.$store.getters[this.profileStore + GET_PROFILE] : false
          },
          profileStore() {
              if (this.isLogged === COMPANY) return COMPANY_PROFILE
              if (this.isLogged === USER) return USER_PROFILE
              return false
          },
          isLoaded() {
              return this.profileStore ? this.$store.getters[this.profileStore + GET_STATUS] === 'success' : false
          },
          isConfirmed() {
              return (this.profile && this.profile.confirmed)
          }
      },
      data() {
          return {
              USER: USER,
              COMPANY: COMPANY
          }
      },
  }
</script>