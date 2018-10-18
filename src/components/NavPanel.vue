<template>
    <el-aside width="auto">
        <el-menu class="py-0 py-md-5" style="height: 100%" :collapse="false" :default-active="activeRoute" :router="true" v-if="isLogged===USER">
            <el-menu-item index="/profile">
                <i class="fa fa-user"></i> <span slot="title">Мой профиль</span>
            </el-menu-item>
            <el-menu-item index="/profile/request" :disabled="!isConfirmed">
                <i class="fa fa-bell"></i> <span slot="title">Мои заявки <el-badge v-if="incomeRequestCount" :value="incomeRequestCount" style="position: absolute; left: 15px" class="item"></el-badge></span>
            </el-menu-item>
            <el-menu-item index="/profile/settings" :disabled="!isConfirmed">
                <i class="fa fa-cogs"></i> <span slot="title">Настройки</span>
            </el-menu-item>
        </el-menu>
        <el-menu class="py-0 py-md-5" style="height: 100%" :default-active="activeRoute" :collapse="false" :router="true" v-if="isLogged===COMPANY">
            <el-menu-item index="/profile">
                <i class="fa fa-user"></i> <span slot="title">Профиль</span>
            </el-menu-item>
            <el-menu-item index="/profile/workers" :disabled="!isConfirmed">
                <i class="fa fa-search"></i> <span slot="title">Найти работника</span>
            </el-menu-item>
            <el-menu-item index="/profile/request" :disabled="!isConfirmed">
                <i class="fa fa-bell"></i> <span slot="title">Заявки компании  <el-badge v-if="incomePersonRequestCount" :value="incomePersonRequestCount" style="position: absolute; left: 15px" class="item"></el-badge></span>
            </el-menu-item>
            <el-menu-item index="/profile/settings" :disabled="!isConfirmed">
                <i class="fa fa-cogs"></i> <span slot="title">Настройки</span>
            </el-menu-item>
            <el-menu-item index="/profile/premium" :disabled="!isConfirmed">
                <i class="fab fa-angellist"></i> <span slot="title">Премиум</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<style scoped="" lang="scss">
    i.fa, i.fab {
        display: inline-block;
        width: 25px;
        margin: 0 5px;
        text-align: center;
    }
    .el-menu-item {
        padding: 0 40px 0 0 !important;
    }
</style>

<script>
    import {COMPANY, USER} from "../store/mutation-types";
    import {
        GET_ALL_STUDENT_VACANCIES,
        GET_INCOME_VACANCIES,
        VACANCIES
    } from "../store/types/vacancies";
    import {APPLICATIONS, GET_APPLICATIONS, GET_INCOME_APPLICATIONS} from "../store/types/applications";
    import {USER_PROFILE} from "../store/types/userProfile";
    import {COMPANY_PROFILE, GET_PROFILE} from "../store/types/companyProfile";
    export default {
        data() {
            return {
                USER: USER,
                COMPANY: COMPANY,
                activeRoute: '',
            }
        },
        computed: {
            profile() {
                return this.profileStore ? this.$store.getters[this.profileStore + GET_PROFILE] : false
            },
            profileStore() {
                if (this.isLogged === COMPANY) return COMPANY_PROFILE
                if (this.isLogged === USER) return USER_PROFILE
                return false
            },
            isLogged() {
                return this.$store.getters['auth/isLogged']
            },
            incomeRequestCount() {
                return this.$store.getters[VACANCIES + GET_INCOME_VACANCIES].length || null
            },
            incomePersonRequestCount() {
                return this.$store.getters[APPLICATIONS + GET_INCOME_APPLICATIONS].length || null
            },
            isConfirmed() {
                return (this.profile && this.profile.confirmed)
            }
        },
        mounted() {
            this.activeRoute = this.$route.fullPath
            if (this.isLogged === USER) {
                this.$store.dispatch(VACANCIES + GET_ALL_STUDENT_VACANCIES)
            } else if (this.isLogged === COMPANY) {
                this.$store.dispatch(APPLICATIONS + GET_APPLICATIONS)
            }
        },
        watch:{
            $route (to){
                this.activeRoute = to.fullPath
            }
        }

    }
</script>