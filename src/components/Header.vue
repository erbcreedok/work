<template>
    <header>
        <b-navbar toggleable="md" fixed="top">
            <div class="container">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <router-link to="/">Let's Work</router-link>

            <b-collapse is-nav id="nav_collapse">

                <b-navbar-nav class="ml-auto align-items-center">
                    <router-link class="nav-link mx-3" to="/about">Найти работу</router-link>
                    <router-link class="nav-link mx-3" to="/about">Найти работника</router-link>
                    <router-link class="nav-link mx-3" to="/about">Все вакансии</router-link>
                    <el-button class="ml-4" @click="dialogVisible = true" round>Войти</el-button>
                </b-navbar-nav>

            </b-collapse>
            </div>
        </b-navbar>
        <el-dialog
                :visible.sync="dialogVisible"
                width="30%">
            <div style="padding: 10px 30px">
                <div class="text-center">
                    <h3>Регистрация</h3>
                    <p>
                        Уже есть аккаунт? <a href="#">Войти</a>
                    </p>
                </div>
                <el-form ref="form" :model="form" label-width="120px">
                    <el-input class="mb-3" placeholder="Имя" v-model="input"></el-input>
                    <el-input class="mb-3" placeholder="Почта" v-model="input"></el-input>
                    <el-input class="mb-3" placeholder="Телефон" v-model="input"></el-input>
                    <el-input class="mb-3" placeholder="Пароль" v-model="input"></el-input>
                    <router-link to="/profile">
                        <el-button type="primary" class="w-100" @click="dialogVisible=false">Зарегистрироваться</el-button>
                    </router-link>
                    <p class="my-3 text-center">или</p>
                    <div>
                        <el-button class="w-100 mb-3">Facebook</el-button>
                    </div>
                    <div>
                        <el-button class="w-100 my-3">Google</el-button>
                    </div>
                    <div>
                        <el-button class="w-100 my-3">Vkontakte</el-button>
                    </div>
                </el-form>
            </div>
        </el-dialog>
    </header>
</template>

<script>
    export default {
        name: 'Header',
        data() {
            return {
                visible: false,
                dialogVisible: false
            }
        },
        methods: {
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
</style>