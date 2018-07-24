<template>
    <el-dialog
            v-if="!isLogged"
            :visible.sync="dialogVisible"
            width="30%">
        <div style="padding: 10px 30px">
            <div class="text-center">
                <h3>Вход</h3>
                <p>
                    Нет аккаунта? <a href="#">Зарегиструйтесь</a>
                </p>
            </div>
            <el-form ref="form" :model="form" label-width="120px">
                <el-input class="mb-3" placeholder="Email или Телефон" v-model="email"></el-input>
                <el-input class="mb-3" placeholder="Пароль" type="password" v-model="password"></el-input>
                <router-link to="/profile">
                    <el-button type="primary" class="w-100" @click="login()">Войти</el-button>
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
                email: '',
                password: '',
                form: {}
            }
        },
        methods: {
            login() {
                this.$store.commit('loginCompany')
                this.$router.push('/profile')
            }
        },
        computed: {
            isLogged() {
                return this.$store.state.isLogged
            }
        },
        mounted() {
            this.dialogVisible = true;
        },
        beforeDestroy() {
            this.dialogVisible = false;
        }
    }
</script>