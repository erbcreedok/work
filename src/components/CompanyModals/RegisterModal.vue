<template>
    <el-dialog
            v-if="!isLogged"
            :visible.sync="dialogVisible"
            width="30%"
            @closed="this.destroy"
    >
        <div style="padding: 10px 30px" v-loading="loading">
            <div class="text-center">
                <h3>Регистрация новой компании</h3>
                <p>
                    Уже есть аккаунт? <router-link to="/login-company">Войти</router-link>
                </p>
            </div>
            <el-form ref="form" :model="form" :rules="rules" status-icon>
                <el-form-item class="mb-3" prop="name">
                    <el-input placeholder="Название компании" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item class="mb-3" prop="email">
                    <el-input placeholder="Почта" v-model="form.email"></el-input>
                </el-form-item>
                <!--<el-form-item class="mb-3" prop="phone">-->
                    <!--<el-input placeholder="Телефон" v-mask="'+7(7##)###-##-##'" v-model="form.phone"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item class="mb-3" prop="password">
                    <el-input placeholder="Пароль" v-model="form.password" type="password"></el-input>
                </el-form-item>
                <el-form-item class="mb-3" prop="passwordC">
                    <el-input placeholder="Подтвержение пароля" v-model="form.passwordC" type="password"></el-input>
                </el-form-item>
                <el-button type="primary" class="w-100" @click="submitForm('form')">Зарегистрироваться</el-button>
            </el-form>
            <!--<p class="my-3 text-center">или</p>-->
            <!--<div class="text-center text-nowrap">-->
                <!--<el-button class="mx-3 mb-3 px-0" style="width: 56px"><i style="font-size: 2rem" class="fab fa-facebook-square"></i></el-button>-->
                <!--<el-button class="mx-3 mb-3 px-0" style="width: 56px"><i style="font-size: 2rem" class="fab fa-google-plus-square"></i></el-button>-->
                <!--<el-button class="mx-3 mb-3 px-0" style="width: 56px"><i style="font-size: 2rem" class="fab fa-vk"></i></el-button>-->
            <!--</div>-->
        </div>
    </el-dialog>
</template>

<script>
    import { mask } from 'vue-the-mask'
    import {COMPANY_CREATE} from "../../store/mutation-types";

    export default {
        name: 'login-modal',
        directives: { mask },
        data() {
            const validatePass = (rule, value, callback) => {
                const regex = [
                    {
                        regex: /^(?=.*[a-z]).{8,}$/gm,
                        message: 'Введите хотя бы один символ нижнего регистра'
                    },
                    {
                        regex:  /^(?=.*\d).{8,}$/gm,
                        message: 'Введите хотя бы одну цифру'
                    }
                ]
                let passed = true
                regex.forEach(v => {
                    if (passed && value.search(v.regex)) {
                        passed = false
                        callback(new Error(v.message))
                    }
                })
                if (passed) {
                    if (this.form.passwordC !== '') {
                        this.$refs.form.validateField('passwordC')
                    }
                    callback()
                }
            }
            const confirmPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Введите пароль еще раз'))
                } else if (value !== this.form.password) {
                    callback(new Error('Ваши пароли не совпадают'))
                } else {
                    callback()
                }
            }
            return {
                dialogVisible: true,
                loading: false,
                form: {
                    name: '',
                    email: '',
                    phone: '',
                    password: '',
                    passwordC: '',
                },
                rules: {
                    name: [
                        { required: true, message: 'Заполните это поле', trigger: 'blur' },
                        { min: 3, message: 'Имя должно состоять минимум из 3-х симоволов', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: 'Заполните это поле', trigger: 'blur' },
                        { type: 'email', message: 'Введите правильный формат почты', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: 'Заполните это поле', trigger: 'blur' },
                        { min: 16, message: 'Введите правильный формат телефона', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Заполните это поле', trigger: 'blur' },
                        { min: 8, message: 'Минимум 8 символов', trigger: 'blur' },
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    passwordC: [
                        { required: true, message: 'Заполните это поле', trigger: 'blur' },
                        { validator: confirmPass, trigger: 'blur' }
                    ]
                }
            }
        },
        computed: {
            isLogged() {
                return this.$store.getters['auth/isLogged']
            }
        },
        methods: {
            destroy() {
                this.$router.push('/')
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        const data = {
                            name: this.form.name,
                            email: this.form.email,
                            password: this.form.password,
                        }
                        this.$store.dispatch('auth/' + COMPANY_CREATE, data).then(() => {
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
<style scoped="">
</style>