<template>
    <div class="p-0">
        <user-surveys v-if="isLogged === USER"></user-surveys>
    </div>
</template>

<script>
    import UserSurveys from '../components/UserProfile/UserSurveys.vue'
    import {COMPANY, USER} from "../store/mutation-types"
    export default {
        name: 'survey',
        components: {
            UserSurveys
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
            }
        },
        beforeMount() {
            const isLogged = this.$store.getters['auth/isLogged']
            if (isLogged !== USER) {
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped="" lang="scss">
</style>