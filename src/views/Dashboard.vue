<template>
    <div class="profile">
        <div class="container">
            <el-container>
                <nav-panel class="d-none d-md-block"></nav-panel>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </div>
    </div>
</template>

<script>
    import NavPanel from '../components/NavPanel.vue'
    import {COMPANY, USER} from "../store/mutation-types"
    import {USER_PROFILE, GET_PROFILE} from "../store/types/userProfile"
    import {COMPANY_PROFILE} from "../store/types/companyProfile"

    export default {
        name: 'dashboard',
        components: {
            NavPanel
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