<template>
    <el-dialog
            v-if="!isLogged"
            :visible.sync="dialogVisible"
            width="30%"
            @closed="this.destroy"
    >
        <div style="padding: 10px 30px">
            <div class="text-center">
                <h3>Регистрация</h3>
                <p>
                    Уже есть аккаунт? <router-link to="/login-company">Войти</router-link>
                </p>
            </div>
            <el-form ref="form" :model="form" label-width="120px">
                <el-input class="mb-3" placeholder="Имя" v-model="name"></el-input>
                <el-input class="mb-3" placeholder="Почта" v-model="email"></el-input>
                <el-input class="mb-3" placeholder="Телефон" v-model="phone"></el-input>
                <el-input class="mb-3" placeholder="Пароль" v-model="password" type="password"></el-input>
                <router-link to="/profile">
                    <el-button type="primary" class="w-100" @click="login()">Зарегистрироваться</el-button>
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
</template>

<script>
    export default {
        name: 'login-modal',
        data() {
            return {
                dialogVisible: true,
                password: '',
                name: '',
                email: '',
                phone: '',
                form: {}
            }
        },
        computed: {
            isLogged() {
                return this.$store.state.isLogged
            }
        },
        methods: {
            login() {
                this.$store.commit('loginCompany')
                this.$router.push('/profile')
            },
            destroy() {
                this.$router.push('/')
            }
        },
        mounted() {
            this.dialogVisible = true
        },
        beforeDestroy() {
            this.dialogVisible = false
        }
    }
</script>