<template>
    <header>
        <b-navbar toggleable="md" fixed="top">
            <div class="container h-100">
                <div class="navbar-brand"><router-link to="/">Love<span class="alternate-color">2</span>Work</router-link></div>
                <b-navbar-toggle v-if="!isLogged" target="nav_collapse"></b-navbar-toggle>
                <div v-if="isLogged === USER">
                    <ul class="flex-nowrap navbar-nav ml-auto align-items-center">
                        <li class="nav-item mx-5 d-none d-md-block">
                            <router-link to="/vacancies">Все вакансии</router-link>
                        </li>
                        <li class="nav-item">
                            <el-dropdown class="" trigger="click">
                            <span class="el-dropdown-link d-flex align-items-center" style="outline: none;">
                                <div class="d-inline-block mr-3 profile-image" :style="{backgroundImage: `url(${user.image})`}"></div>
                                <span>{{user.firstName || user.email}}</span>
                            </span>
                                <el-dropdown-menu slot="dropdown">
                                    <router-link to="/profile">
                                        <el-dropdown-item>Профиль</el-dropdown-item>
                                    </router-link>
                                    <router-link to="/vacancies" class="d-block d-md-none">
                                        <el-dropdown-item>Все вакансии</el-dropdown-item>
                                    </router-link>
                                    <router-link to="/profile/request">
                                        <el-dropdown-item>Заявки</el-dropdown-item>
                                    </router-link>
                                    <router-link to="/profile/settings">
                                        <el-dropdown-item>Настройки</el-dropdown-item>
                                    </router-link>
                                    <div @click="logout">
                                        <el-dropdown-item>Выход</el-dropdown-item>
                                    </div>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </li>
                    </ul>
                </div>
                <div v-if="isLogged === COMPANY">
                    <ul class="flex-nowrap navbar-nav ml-auto align-items-center">
                        <li class="nav-item mx-5 d-none d-md-block">
                            <router-link to="/vacancies">Все вакансии</router-link>
                        </li>
                        <li class="nav-item">
                            <el-dropdown class="" trigger="click">
                            <span class="el-dropdown-link d-flex align-items-center" style="outline: none; cursor: pointer">
                                <div class="d-inline-block mr-3 profile-image" :style="{backgroundSize: 'contain', backgroundImage: `url(${company.image})`}"></div>
                                <span>{{company.name || company.email}}</span>
                            </span>
                                <el-dropdown-menu slot="dropdown">
                                    <router-link to="/profile">
                                        <el-dropdown-item>Профиль</el-dropdown-item>
                                    </router-link>
                                    <router-link to="/vacancies" class="d-block d-md-none">
                                        <el-dropdown-item>Все вакансии</el-dropdown-item>
                                    </router-link>
                                    <router-link to="/profile/workers">
                                        <el-dropdown-item>Найти работника</el-dropdown-item>
                                    </router-link>
                                    <router-link to="/profile/request">
                                        <el-dropdown-item>Заявки</el-dropdown-item>
                                    </router-link>
                                    <router-link to="/profile/settings">
                                        <el-dropdown-item>Настройки</el-dropdown-item>
                                    </router-link>
                                    <router-link to="/profile/premium">
                                        <el-dropdown-item>Премиум</el-dropdown-item>
                                    </router-link>
                                    <div @click="logout">
                                        <el-dropdown-item>Выход</el-dropdown-item>
                                    </div>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </li>
                    </ul>
                </div>
            </div>
            <b-collapse is-nav id="nav_collapse" class="w-100 mx-md-0" style="margin-left: -10px; margin-right: -10px" v-if="!isLogged">
                <ul class="navbar-nav ml-auto align-items-center">
                    <li class="nav-item my-3 my-md-0 mx-4">
                        <router-link to="/login">Найти работу</router-link>
                    </li>
                    <li class="nav-item my-3 my-md-0 mx-4">
                        <router-link to="/login-company">Найти работника</router-link>
                    </li>
                    <li class="nav-item my-3 my-md-0 mx-4">
                        <router-link to="/vacancies">Вакансии</router-link>
                    </li>
                </ul>
                <router-link to="/login" class="text-center d-block my-3 my-md-0">
                    <el-button class="ml-0 ml-md-4">Войти</el-button>
                </router-link>
            </b-collapse>
        </b-navbar>
    </header>
</template>

<script>
    import ElSubmenu from "../../node_modules/element-ui/packages/menu/src/submenu";
    import ElDropdown from "../../node_modules/element-ui/packages/dropdown/src/dropdown";
    import {AUTH_LOGOUT, COMPANY, USER} from "../store/mutation-types";
    import {GET_PROFILE, USER_PROFILE} from "../store/types/userProfile";
    import {COMPANY_PROFILE} from "../store/types/companyProfile";
    export default {
        components: {
            ElDropdown,
            ElSubmenu},
        name: 'Header',
        data() {
            return {
                USER: USER,
                COMPANY: COMPANY,
                visible: false,
                dialogVisible: false,
            }
        },
        computed: {
            user() {
              return this.$store.getters[USER_PROFILE + 'getProfile']
            },
            company() {
                return this.$store.getters[COMPANY_PROFILE + 'getProfile']
            },
            isLogged() {
                return this.$store.getters['auth/isLogged']
            }
        },
        methods: {
            logout() {
                console.log('logout')
                this.$store.dispatch('auth/' + AUTH_LOGOUT).then(() => {
                    this.$router.push('/')
                })
            }
        },
        mounted() {
            if (this.$store.state.userProfile.status === 'clean' && this.isLogged === USER) {
                this.$store.dispatch(USER_PROFILE + GET_PROFILE)
            }
            if (this.$store.state.companyProfile.status === 'clean' && this.isLogged === COMPANY) {
                this.$store.dispatch(COMPANY_PROFILE + GET_PROFILE)
            }
        },
        updated() {
            if (this.$store.state.userProfile.status === 'clean' && this.isLogged === USER) {
                this.$store.dispatch(USER_PROFILE + GET_PROFILE)
            }
            if (this.$store.state.companyProfile.status === 'clean' && this.isLogged === COMPANY) {
                this.$store.dispatch(COMPANY_PROFILE + GET_PROFILE)
            }
        }
    }
</script>

<style scoped lang="scss">
    header {
        height: 65px;
        position: relative;
        z-index: 2000;
    }
    nav {
        height: 65px;
        background: white;
        box-shadow: 0 0 10px rgba(0,0,0,.1);
    }
    a, a:hover {
        color: inherit;
        text-decoration: none;
    }
    .navbar-brand {
        font-size: 2rem;
        padding-left: 10px;
        .alternate-color {
            color: #409eff;
        }
    }
    .profile-image {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
        box-shadow: 0 3px 10px rgba(0,0,0,.1);
    }
    .navbar-collapse {
        background: white;
    }
</style>