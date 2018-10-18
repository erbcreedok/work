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
                                <div class="d-inline-block mr-3 profile-image" :style="{backgroundImage: `url(${profile.image})`}"></div>
                                <span>{{profile.firstName || profile.email}}</span>
                            </span>
                                <el-dropdown-menu slot="dropdown">
                                    <router-link to="/profile">
                                        <el-dropdown-item>Профиль</el-dropdown-item>
                                    </router-link>
                                    <template v-if="isConfirmed">
                                        <router-link to="/vacancies" class="d-block d-md-none">
                                            <el-dropdown-item>Все вакансии</el-dropdown-item>
                                        </router-link>
                                        <router-link to="/profile/request">
                                            <el-dropdown-item>Заявки</el-dropdown-item>
                                        </router-link>
                                        <router-link to="/profile/settings">
                                            <el-dropdown-item>Настройки</el-dropdown-item>
                                        </router-link>
                                    </template>
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
                                <div class="d-inline-block mr-3 profile-image" :style="{backgroundSize: 'contain', backgroundImage: `url(${profile.image})`}"></div>
                                <span>{{profile.name || profile.email}}</span>
                            </span>
                                <el-dropdown-menu slot="dropdown">
                                    <router-link to="/profile">
                                        <el-dropdown-item>Профиль</el-dropdown-item>
                                    </router-link>
                                    <template v-if="isConfirmed">
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
                                    </template>
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
            <div class="nav-notification" v-if="isLoaded && !isConfirmed && notificationVisible">
                <p class="mb-0">
                    Аккаунт не подтвержден. Ссылка для подтверждения отправлена на вашу почту.
                    <el-button type="default"
                               class="link"
                               @click="resendVerification" v-loading="resending"
                    >Переотправить</el-button>
                </p>
                <button class="closer" @click="notificationVisible = false">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </b-navbar>
    </header>
</template>

<script>
    import ElSubmenu from "../../node_modules/element-ui/packages/menu/src/submenu";
    import ElDropdown from "../../node_modules/element-ui/packages/dropdown/src/dropdown";
    import {AUTH_LOGOUT, COMPANY, GET_STATUS, RESEND_VERIFICATION, USER} from "../store/mutation-types";
    import {GET_PROFILE, USER_PROFILE} from "../store/types/userProfile";
    import {COMPANY_PROFILE} from "../store/types/companyProfile";
    import ElButton from "../../node_modules/element-ui/packages/button/src/button";
    export default {
        components: {
            ElButton,
            ElDropdown,
            ElSubmenu},
        name: 'Header',
        data() {
            return {
                USER: USER,
                COMPANY: COMPANY,
                visible: false,
                dialogVisible: false,
                notificationVisible: true,
                resending: false,
            }
        },
        props: [
            'isLogged'
        ],
        computed: {
            profile() {
                return this.profileStore ? this.$store.getters[this.profileStore + GET_PROFILE] : false
            },
            profileStore() {
                if (this.isLogged === COMPANY) return COMPANY_PROFILE
                if (this.isLogged === USER) return USER_PROFILE
                return false
            },
            profileStatus() {
                return this.$store.getters[this.profileStore + GET_STATUS]
            },
            isLoaded() {
                return this.profileStatus === 'success'
            },
            isConfirmed() {
                return (this.profile && this.profile.confirmed)
            }
        },
        methods: {
            logout() {
                console.log('logout')
                this.$store.dispatch('auth/' + AUTH_LOGOUT).then(() => {
                    this.$router.push('/')
                })
            },
            resendVerification() {
                this.resending = true
                this.$store.dispatch(this.profileStore + RESEND_VERIFICATION).then(() => {
                    this.resending = false
                    this.notificationVisible = false
                })
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
    .nav-notification {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        text-align: center;
        background: #d24848;
        color: #ffffff;
        padding: 5px 45px;
        box-shadow: 0 2px 15px rgba(255, 3, 3, 0.36);
        transform: scaleY(0);
        transform-origin: top;
        animation: unzip .4s 1s both;
        button.link {
            color: #9c0000;
            display: inline-block;
            padding: 0 5px;
            border: 1px solid #f1f1f1;
            border-radius: 4px;
            margin: 0 5px;
            line-height: inherit;
            &:active {
                background-color: #f0f0f0;
            }
        }
        button.closer {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 20px;
            margin: auto;
            color: white;
            height: 20px;
            width: 20px;
            background: none;
            border: none;
            cursor: pointer;
            opacity: .75;
            &:hover {
                opacity: 1;
                transition: .2s;
            }
        }
    }
    @keyframes unzip {
        from {transform: scaleY(0)}
        to {transform: scaleY(1)}
    }
</style>