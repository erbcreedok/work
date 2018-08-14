<template>
    <el-dialog
            v-if="!isLogged"
            :visible.sync="dialogVisible"
            width="30%"
            @closed="this.destroy"
    >
        <div style="padding: 10px 30px">
            <div class="text-center">
                <h3>Вход от лица компании</h3>
                <p>
                    Нет аккаунта? <router-link to="/register-company">Зарегиструйтесь</router-link>
                </p>
            </div>
            <el-form ref="form" :model="form" status-icon>
                <el-form-item class="mb-3" prop="email">
                    <el-input class="mb-3" placeholder="Email или Телефон" v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item class="mb-3" prop="password">
                    <el-input class="mb-3" placeholder="Пароль" type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-button type="primary" class="w-100" @click="submitForm('form')">Войти</el-button>
            </el-form>
            <p class="my-3 text-center">или</p>
            <div class="text-center text-nowrap">
                <el-button class="mx-3 mb-3 px-0" style="width: 56px"><i style="font-size: 2rem" class="fab fa-facebook-square"></i></el-button>
                <el-button class="mx-3 mb-3 px-0" style="width: 56px"><i style="font-size: 2rem" class="fab fa-google-plus-square"></i></el-button>
                <el-button class="mx-3 mb-3 px-0" style="width: 56px"><i style="font-size: 2rem" class="fab fa-vk"></i></el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
    import {COMPANY_LOGIN} from "../../store/mutation-types";
    export default {
        name: 'login-modal',
        data() {
            return {
                dialogVisible: true,
                form: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        const data = {
                            email: this.form.email,
                            password: this.form.password,
                        }
                        this.$store.dispatch('auth/' + COMPANY_LOGIN, data).then(() => {
                            this.loading = false
                            setTimeout(() => {
                                this.$router.push('/profile')
                            }, 500)
                        })
                    } else {
                        this.$alert('Проверьте правильность всех полей', {
                            confirmButtonText: 'OK',
                        })
                            .then()
                        return false
                    }
                })
            },
            destroy() {
                this.$router.push('/')
            }
        },
        computed: {
            isLogged() {
                return this.$store.getters['auth/isLogged']
            }
        },
        mounted() {
            this.dialogVisible = true;
        },
        beforeDestroy() {
            this.dialogVisible = false
        }
    }
</script>

<style scoped="">
</style>