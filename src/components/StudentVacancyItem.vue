<template>
    <div>
        <div class="row align-items-center py-3">
            <div class="company-profile col-md-2 col-2">
                <div class="image-container w-100 item-avatar">
                    <img :src="person.image" alt="" width="100%">
                </div>
            </div>
            <div class="col-7">
                <h3 class="mb-4">
                    <template v-if="person.firstName || person.lastName ">{{(person.firstName || '') + ' ' + (person.lastName || '')}}</template>
                    <template v-if="!person.firstName && !person.lastName ">{{person.credentials.email}}</template>
                </h3>
                <p v-if="person.firstName || person.lastName">{{person.credentials.email}}</p>
                <p style="opacity: .6;" class="mb-1">пробуется на вакансию: </p>
                <h4>{{vacancy.vacancyName}}</h4>
            </div>
            <div class="col-3 d-flex align-items-center flex-column justify-content-center">
                <template v-if="isLogged === COMPANY">
                    <template v-if="status=== 'income'">
                        <p style="opacity: .6;">Входящая заявка</p>
                        <el-button-group class="w-100 mb-3" size="small">
                            <el-tooltip class="item" effect="dark" content="Принять" placement="left">
                                <el-button type="success" class="w-50" icon="el-icon-check" size="small" @click="accept()"></el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="Отклонить" placement="right">
                                <el-button type="danger" class="w-50" icon="el-icon-delete" size="small" @click="reject()"></el-button>
                            </el-tooltip>
                        </el-button-group>
                    </template>
                    <template v-if="status === 'outcome'">
                        <p style="opacity: .6;">Исходящая заявка</p>
                        <el-button class="mb-3 ml-0 w-100"
                                   type="danger"
                                   size="small"
                                   @click="cancel()">Отменить</el-button>
                    </template>
                    <template v-if="status === 'accept'">
                        <p style="opacity: .6;">Вакансия принята</p>
                        <el-button class="mb-3 ml-0 w-100"
                                   type="primary"
                                   size="small"
                                   @click="dialogVisible = true">Контакты</el-button>
                    </template>
                    <template v-if="status === 'reject'">
                        <p style="opacity: .6;">Вакансия отклонена</p>
                        <el-button class="mb-3 ml-0 w-100"
                                   type="warning"
                                   size="small"
                                   @click="discard()">Убрать</el-button>
                    </template>
                </template>
                <el-button v-if="status !== 'accept'" class="ml-0 w-100" size="small" @click="dialogVisible = true">Информация</el-button>
            </div>
            <el-dialog
                    title="Контакты"
                    :visible.sync="dialogVisible"
                    width="30%">
                <template v-if="person.phone || person.credentials.email || person.description">
                    <p v-if="person.phone">Телефон: <a target="_blank" :href="'tel:'  +  person.phone">{{person.phone}}</a></p>
                    <p v-if="person.credentials.email">Почта: <a target="_blank" :href="'mailto:'  +  person.credentials.email">{{person.credentials.email}}</a></p>
                    <p class="mb-3" v-if="person.description" v-html="person.description"></p>
                </template>
                <template v-else>
                    <h4>Не имеет информации</h4>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {COMPANY, USER} from '../store/mutation-types'
    import {GET_STUDENT, STUDENTS} from "../store/types/students";
    import {AUTH, IS_LOGGED} from "../store/types/auth";
    import {GET_VACANCY, VACANCIES} from "../store/types/vacancies";
    import {
        ACCEPT_STUDENT_VACANCY,
        APPLICATIONS, APPLY_STUDENT_VACANCY, CANCEL_STUDENT_VACANCY,
        DISCARD_STUDENT_VACANCY,
        REJECT_STUDENT_VACANCY
    } from "../store/types/applications";
    export default {
        name: 'student-vacancy-item',
        props: {
            personId: String,
            vacancyId: String,
            status: String
        },
        data() {
            return {
                dialogVisible: false,
                USER: USER,
                COMPANY: COMPANY
            }
        },
        computed: {
            person() {
                return this.$store.getters[STUDENTS + GET_STUDENT](this.personId)
            },
            vacancy() {
                return this.$store.getters[VACANCIES + GET_VACANCY](this.vacancyId)
            },
            isLogged() {
                return this.$store.getters[AUTH + IS_LOGGED]
            }
        },
        methods: {
            apply() {
                this.$store.dispatch(APPLICATIONS + APPLY_STUDENT_VACANCY, {vacancyId: this.vacancyId, studentId: this.personId}).then(() => {
                    this.$store.dispatch(VACANCIES + GET_VACANCY, this.vacancyId)
                })
            },
            accept() {
                this.$store.dispatch(APPLICATIONS + ACCEPT_STUDENT_VACANCY, {vacancyId: this.vacancyId, studentId: this.personId}).then(() => {
                    this.$store.dispatch(VACANCIES + GET_VACANCY, this.vacancyId)
                })
            },
            cancel() {
                this.$store.dispatch(APPLICATIONS + CANCEL_STUDENT_VACANCY, {vacancyId: this.vacancyId, studentId: this.personId}).then(() => {
                    this.$store.dispatch(VACANCIES + GET_VACANCY, this.vacancyId)
                })
            },
            reject() {
                this.$store.dispatch(APPLICATIONS + REJECT_STUDENT_VACANCY, {vacancyId: this.vacancyId, studentId: this.personId}).then(() => {
                    this.$store.dispatch(VACANCIES + GET_VACANCY, this.vacancyId)
                })
            },
            discard() {
                this.$store.dispatch(APPLICATIONS + DISCARD_STUDENT_VACANCY, {vacancyId: this.vacancyId, studentId: this.personId}).then(() => {
                    this.$store.dispatch(VACANCIES + GET_VACANCY, this.vacancyId)
                })
            },
        },
        mounted() {
            if (!this.person) {
                this.$store.dispatch(STUDENTS + GET_STUDENT, this.personId)
            }
            if (!this.vacancy) {
                this.$store.dispatch(VACANCIES + GET_VACANCY, this.vacancyId)
            }
        }
    }
</script>