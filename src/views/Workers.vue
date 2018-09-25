<template>
    <div class="p-0">
        <company-search v-if="isLogged === COMPANY"></company-search>
    </div>
</template>

<script>
    import CompanySearch from '../components/CompanyProfile/CompanySearch.vue'
    import {COMPANY, USER} from "../store/mutation-types";

    export default {
        name: 'workers',
        components: {
            CompanySearch,
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
            if (isLogged !== COMPANY) {
                this.$router.push('/')
            }
        }
    }
</script>