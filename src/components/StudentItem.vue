<template>
    <div>
        <div class="row align-items-center py-3">
            <div class="company-profile col-md-2 col-2">
                <div class="image-container w-100">
                    <img :src="'http://institutogoldenprana.com.br/wp-content/uploads/2015/08/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg'" alt="" width="100%">
                </div>
            </div>
            <div class="col-7">
                <h3 class="mb-4">{{person.credentials.name || person.credentials.email}}</h3>
                <p v-if="person.credentials.name">{{person.credentials.email}}</p>
                <p class="mb-3" v-if="person.about" v-html="person.about"></p>
            </div>
            <div class="col-3 d-flex align-items-center flex-column justify-content-center">
                <template v-if="isLogged === COMPANY">
                    <el-button class="mb-3 ml-0 w-100"
                               type="primary"
                               size="small"
                               @click="vacancyDialogVisible = true" >Предложить вакансию</el-button>
                </template>
                <el-button class="ml-0 w-100" size="small" @click="dialogVisible = true">Контакты</el-button>
            </div>
            <el-dialog
                    title="Контакты"
                    :visible.sync="dialogVisible"
                    width="30%">
                <template v-if="person.credentials.phone || person.credentials.email">
                    <p v-if="person.credentials.phone">Телефон: <a target="_blank" :href="'tel:'  +  person.credentials.phone">{{person.credentials.phone}}</a></p>
                    <p v-if="person.credentials.email">Почта: <a target="_blank" :href="'mailto:'  +  person.credentials.email">{{person.credentials.email}}</a></p>
                </template>
                <template v-else>
                    <h4>Не имеет контактов</h4>
                </template>

            </el-dialog>
            <el-dialog
                    title="Предложить вакансию"
                    :visible.sync="vacancyDialogVisible"
                    @open="onVacancyDialogOpen"
                    width="30%">
                <div v-loading="loading">
                    <el-form :model="form" :rules="rules" ref="form">
                        <el-form-item label="Вакансия" class="mb-5 py-2">

                            <el-select
                                    style="width: 100%"
                                    v-model="form.vacancy"
                                    filterable
                                    placeholder="Выберите вакансию"
                                    :loading="loading">
                                <el-option
                                        v-for="item in vacancies"
                                        :key="item.id"
                                        :label="item.vacancyName"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="text-right mb-0">
                            <el-button type="primary" @click="onSubmit('form')">Отправить</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {COMPANY, USER} from '../store/mutation-types'
    import {GET_STUDENT, STUDENTS} from "../store/types/students";
    import {AUTH, IS_LOGGED} from "../store/types/auth";
    import ElDialog from "../../node_modules/element-ui/packages/dialog/src/component";
    import {GET_OWN_VACANCIES, VACANCIES} from "../store/types/vacancies";
    import {APPLICATIONS, APPLY_STUDENT_VACANCY} from "../store/types/applications";
    export default {
        components: {ElDialog},
        name: 'student-item',
        props: {
            personId: String,
        },
        data() {
            return {
                dialogVisible: false,
                vacancyDialogVisible: false,
                USER: USER,
                COMPANY: COMPANY,
                loading: false,
                form: {
                    vacancy: ''
                },
                rules: {
                    vacancy: [
                        { required: true, message: 'Выберите вакансию', trigger: 'change' },
                    ]
                }
            }
        },
        computed: {
            vacancies() {
                return this.$store.getters[VACANCIES + GET_OWN_VACANCIES]
            },
            person() {
                return this.$store.getters[STUDENTS + GET_STUDENT](this.personId)
            },
            isLogged() {
                return this.$store.getters[AUTH + IS_LOGGED]
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        const data = {studentId: this.personId, vacancyId: this.form.vacancy}
                        this.$store.dispatch(APPLICATIONS + APPLY_STUDENT_VACANCY, data).then(() => {
                            const h = this.$createElement;
                            const vacancyName = this.vacancies.find(v => v.id === this.form.vacancy).vacancyName || this.form.vacancy
                            this.$message({
                                message: h('p', null, [
                                    h('span', null, 'Вакансия '),
                                    h('i', { style: 'color: teal' }, `"${vacancyName}"`),
                                    h('span', null, ' успешно отправлена'),
                                ]),
                                type: 'success'
                            });
                            this.loading = false
                            this.vacancyDialogVisible = false
                        }).catch(err =>{
                            console.log(err);
                            const h = this.$createElement;
                            const vacancyName = this.vacancies.find(v => v.id === this.form.vacancy).vacancyName || this.form.vacancy
                            this.$message({
                                message: h('p', null, [
                                    h('span', null, 'Вакансия '),
                                    h('i', { style: 'color: teal' }, `"${vacancyName}"`),
                                    h('span', null, ' уже была предложена данному пользователю'),
                                ]),
                                type: 'warning'
                            });
                            setTimeout(()=>{
                                this.loading = false
                                this.vacancyDialogVisible = false
                            }, 1000)
                        })
                    } else {
                        this.$alert('Проверьте правильность всех полей', {confirmButtonText: 'OK',})
                        return false
                    }
                })
            },
            onVacancyDialogOpen() {
                if(this.$store.state.vacancies.status === 'clear') {
                    this.loading = true
                    this.$store.dispatch(VACANCIES + GET_OWN_VACANCIES).then(() => {
                        this.loading = false
                    })
                }
            }
        }
    }
</script>