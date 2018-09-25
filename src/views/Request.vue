<template>
    <div class="p-0">
        <user-requests v-if="isLogged === USER"></user-requests> <!-- 1-ый тип - залогинился работник -->
        <company-requests v-if="isLogged === COMPANY" ></company-requests> <!-- 2-ой тип - залогинилась компания -->
    </div>
</template>

<script>
    import UserRequests from '../components/UserProfile/UserRequests.vue'
    import CompanyRequests from '../components/CompanyProfile/CompanyRequests.vue'
    import {COMPANY, USER} from "../store/mutation-types";

    export default {
        name: 'request',
        components: {
            UserRequests,
            CompanyRequests,
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

        }
    }
</script>