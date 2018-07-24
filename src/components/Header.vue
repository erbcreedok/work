<template>
    <header>
        <b-navbar toggleable="md" fixed="top">
            <div class="container h-100">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <router-link to="/">Let's Work</router-link>

            <b-collapse is-nav id="nav_collapse" v-if="!isLogged()">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item mx-4" @click="loginClient()">
                        <router-link to="/profile">Найти работу</router-link>
                    </li>
                    <li class="nav-item mx-4" @click="loginCompany()">
                        <router-link to="/profile">Найти работника</router-link>
                    </li>
                    <li class="nav-item mx-4">
                        <router-link to="/vacancies">Вакансии</router-link>
                    </li>
                </ul>
                <router-link to="/login">
                    <el-button class="ml-4">Войти</el-button>
                </router-link>
            </b-collapse>
            <b-collapse is-nav id="nav_collapse" v-if="isLogged() === 1">
                <ul class="navbar-nav ml-auto align-items-center">
                    <li class="nav-item mx-5">
                        <router-link to="/vacancies">Все вакансии</router-link>
                    </li>
                    <li class="nav-item">
                        <el-dropdown class="" trigger="click">
                            <span class="el-dropdown-link d-flex align-items-center" style="outline: none;">
                                <div class="d-inline-block mr-3 profile-image" :style="{backgroundImage: `url(${'https://static.intercomassets.com/avatars/1309094/square_128/lk-1498832667.jpg?1498832667'})`}"></div>
                                <span>Куаныш</span>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <router-link to="/profile">
                                    <el-dropdown-item>
                                        Профиль
                                    </el-dropdown-item>
                                </router-link>
                                <router-link to="/profile/request">
                                    <el-dropdown-item>
                                        Заявки
                                    </el-dropdown-item>
                                </router-link>
                                <router-link to="/profile/settings">
                                    <el-dropdown-item>
                                        Настройки
                                    </el-dropdown-item>
                                </router-link>
                                <div @click="logout">
                                    <el-dropdown-item>
                                        Выход
                                    </el-dropdown-item>
                                </div>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </li>
                </ul>
            </b-collapse>
            <b-collapse is-nav id="nav_collapse" v-if="isLogged() === 2">
                    <ul class="navbar-nav ml-auto align-items-center">
                        <li class="nav-item mx-5">
                            <router-link to="/vacancies">Все вакансии</router-link>
                        </li>
                        <li class="nav-item">
                            <el-dropdown class="" trigger="click">
                            <span class="el-dropdown-link d-flex align-items-center" style="outline: none; cursor: pointer">
                                <div class="d-inline-block mr-3 profile-image" :style="{backgroundSize: 'contain', backgroundImage: `url(${'https://www.afisha.uz/ui/catalog/2006/09/0090972.jpg'})`}"></div>
                                <span>Zara</span>
                            </span>
                                <el-dropdown-menu slot="dropdown">
                                    <router-link to="/profile">
                                        <el-dropdown-item>
                                            Профиль
                                        </el-dropdown-item>
                                    </router-link>
                                    <router-link to="/profile/request">
                                        <el-dropdown-item>
                                            Заявки
                                        </el-dropdown-item>
                                    </router-link>
                                    <router-link to="/profile/settings">
                                        <el-dropdown-item>
                                            Настройки
                                        </el-dropdown-item>
                                    </router-link>
                                    <div @click="logout">
                                        <el-dropdown-item>
                                            Выход
                                        </el-dropdown-item>
                                    </div>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </li>
                    </ul>
        </b-collapse>
            </div>
        </b-navbar>
    </header>
</template>

<script>
    import ElSubmenu from "../../node_modules/element-ui/packages/menu/src/submenu";
    import ElDropdown from "../../node_modules/element-ui/packages/dropdown/src/dropdown";
    export default {
        components: {
            ElDropdown,
            ElSubmenu},
        name: 'Header',
        data() {
            return {
                visible: false,
                dialogVisible: false,
            }
        },
        methods: {
            isLogged() {
                return this.$store.state.isLogged
            },
            loginCompany() {
                this.$store.commit('loginCompany')
                this.$router.push('/profile')
            },
            logout() {
                console.log('logout')
                this.$store.commit('logout')
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped lang="scss">
    header {
        height: 65px;
        position: relative;
        z-index: 2010;
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
    .profile-image {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
        box-shadow: 0 3px 10px rgba(0,0,0,.1);
    }
</style>