<template>
  <div class="p-0">
    <user-profile v-if="isLogged === USER"></user-profile> <!-- 1-ый тип - залогинился работник -->
    <company-profile v-if="isLogged === COMPANY" ></company-profile> <!-- 2-ой тип - залогинилась компания -->
  </div>
</template>

<script>
  import UserProfile from '../components/UserProfile/UserProfile.vue'
  import CompanyProfile from '../components/CompanyProfile/CompanyProfile.vue'
  import {COMPANY, USER} from "../store/mutation-types";
  import {USER_PROFILE, GET_PROFILE} from "../store/types/userProfile";
  import {COMPANY_PROFILE} from "../store/types/companyProfile";

  export default {
      name: 'profile',
      components: {
          UserProfile,
          CompanyProfile,
      },
      data() {
          return {
              USER: USER,
              COMPANY: COMPANY
          }
      },
      computed: {
          isLogged() {
              return this.$store.getters['auth/isLogged'] // Проверка на логин через store
          },

      },
      beforeMount() {
          // Временный обход security роутинга, для не зарегестрированных пользователей
          const isLogged = this.$store.getters['auth/isLogged']
          if (!isLogged) {
              this.$router.push('/')
          } else if (isLogged === USER) {
              this.$store.dispatch(USER_PROFILE + GET_PROFILE)
          } else if (isLogged === COMPANY) {
              this.$store.dispatch(COMPANY_PROFILE + GET_PROFILE)
          }
      }
  }
</script>