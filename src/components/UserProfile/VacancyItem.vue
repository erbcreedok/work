<template>
    <div :class="{'accepted': vacancy.status === 3}">
        <div class="row align-items-center">
            <div class="company-profile col-md-2 col-2 d-none d-md-block">
                <div class="image-container w-100 item-avatar">
                    <img :src="vacancy.image" alt="" width="100%">
                </div>
            </div>
            <div class="col-8 col-md-7">
                <p style="opacity: .5" class="mb-1" v-if="vacancy.companyName">{{vacancy.companyName}}</p>
                <h3>{{vacancy.vacancyName}} | {{ vacancy.vacancyField }}</h3>
                <p v-html="vacancy.description"></p>
                <div style="opacity: .5">
                    <p class="mb-2" v-if="vacancy.type.length > 0">Занятость: {{vacancy.type.join(', ')}}</p>
                    <p class="mb-0">Заработная плата: {{vacancy.minSalary}} - {{vacancy.maxSalary}}</p>
                </div>
            </div>
            <div class="col-4 col-md-3 d-flex align-items-center flex-column justify-content-center" v-if="isLogged !== USER">
                <el-button class="mb-3 ml-0 w-100"
                           @click="dialogVisible = true" >Подробнее</el-button>
            </div>
            <div class="col-4 col-md-3 d-flex align-items-center flex-column justify-content-center" v-if="isLogged === USER">
                <template v-if="isConfirmed">
                    <template v-if="vacancy.status=== 1">
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
                    <template v-if="vacancy.status === 2">
                        <p style="opacity: .6;">Исходящая заявка</p>
                        <el-button class="mb-3 ml-0 w-100"
                                   type="danger"
                                   size="small"
                                   @click="cancel()">Отменить</el-button>
                    </template>
                    <template v-if="vacancy.status === 3">
                        <p style="opacity: .6;">Вакансия принята</p>
                        <el-button class="mb-3 ml-0 w-100"
                                   type="primary"
                                   size="small"
                                   @click="contactsVisible = true">Контакты</el-button>
                    </template>
                    <template v-if="vacancy.status === 4">
                        <p style="opacity: .6;">Вакансия отклонена</p>
                        <el-button class="mb-3 ml-0 w-100"
                                   type="warning"
                                   size="small"
                                   @click="discard()">Убрать</el-button>
                    </template>
                    <template v-if="vacancy.status === 0">
                        <el-button class="mb-3 ml-0 w-100"
                                   type="primary"
                                   size="small"
                                   @click="coverVisible = true" >Подать заявку</el-button>
                        <el-dialog title="Отправить заявку"
                                   :visible.sync="coverVisible"
                                   width="35%"
                                   @close="handleClose"
                                   :el-loading="formLoading">
                            <p>Введите сопроводительное письмо</p>
                            <form @submit.prevent="validateForm">
                                <wysiwyg v-model="coverLetter"
                                         class="editor"
                                         placeholder="Введите письмо сюда"
                                         :class="{danger: dirtyForm, shake: shake}"></wysiwyg>
                                <p v-if="!formValid" class="text d-inline-block" :class="{danger: dirtyForm, shake: shake}">
                                    Еще минимум {{requiredLength - this.coverLetterWordCount}} слов
                                </p>
                                <div class="d-flex justify-content-end my-3">
                                    <el-button @click="coverVisible = false">
                                        Отменить
                                    </el-button>
                                    <el-button type="primary" nativeType="submit" :disabled="!formValid">
                                        Отправить
                                    </el-button>
                                </div>
                            </form>
                        </el-dialog>
                    </template>
                </template>
                <el-button class="mb-3 ml-0 w-100"
                           size="small"
                           @click="dialogVisible = true" >Подробнее</el-button>
            </div>
            <el-dialog
                    :title="vacancy.vacancyName"
                    :visible.sync="dialogVisible"
                    width="50%">
                <p class="mb-4">Компания: {{vacancy.companyName}}</p>
                <template v-if="vacancy.demands.length > 0">
                <p>Требования:</p>
                <ul class="mb-4">
                    <li v-for="(requirement, index) in vacancy.demands" :key="index">
                        {{requirement}}
                    </li>
                </ul>
                </template>
                <div style="opacity: .5">
                    <p class="mb-2" v-if="vacancy.type.length > 0">Занятость: {{vacancy.type.join(', ')}}</p>
                    <p class="mb-0">Заработная плата: {{vacancy.minSalary}} - {{vacancy.maxSalary}}</p>
                </div>
            </el-dialog>
            <el-dialog
                    :title="'Контакты ' + vacancy.vacancyName"
                    :visible.sync="contactsVisible"
                    width="30%">
                <p>Телефон: <a href="tel: +7 777 777 77 77">+7 778 213 45 67</a></p>
                <p>Почта: <a href="mailto: info@letswork.kz">info@letswork.kz</a></p>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {USER} from '../../store/mutation-types'
    import {GET_ALL_STUDENT_VACANCIES, GET_VACANCY, VACANCIES} from "../../store/types/vacancies";
    import {AUTH, IS_LOGGED} from '../../store/types/auth';
    import {
        ACCEPT_VACANCY,
        APPLICATIONS,
        APPLY_VACANCY, CANCEL_VACANCY,
        DISCARD_VACANCY,
        REJECT_VACANCY
    } from "../../store/types/applications";
    import ElDialog from "../../../node_modules/element-ui/packages/dialog/src/component";
    import ElForm from "../../../node_modules/element-ui/packages/form/src/form";
    import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
    import {USER_PROFILE, GET_PROFILE} from "../../store/types/userProfile";

    export default {
        components: {
            ElInput,
            ElForm,
            ElDialog},
        name: 'vacancy-item',
        props: {
            vacancyId: String,
            type: String
        },
        data() {
            return {
                dialogVisible: false,
                contactsVisible: false,
                coverVisible: false,
                coverLetter: '',
                requiredLength: 15,
                dirtyForm: false,
                formLoading: false,
                shake: false,
                USER: USER
            }
        },
        computed: {
            vacancy() {
                return this.$store.getters[VACANCIES + GET_VACANCY](this.vacancyId)
            },
            isLogged() {
                return this.$store.getters[AUTH + IS_LOGGED]
            },
            coverLetterWordCount() {
                return this.coverLetter.split(' ').filter(x => x!=='' && x!=='&nbsp;' && x!==' ').length
            },
            formValid() {
                return this.coverLetterWordCount >= this.requiredLength ||
                    this.coverLetter.length === 0
            },
            profile() {
                return this.$store.getters[USER_PROFILE + GET_PROFILE]
            },
            isConfirmed() {
                return (this.profile && this.profile.confirmed)
            }

        },
        methods: {

            updateVacancy() {
                this.$store.dispatch(VACANCIES + GET_ALL_STUDENT_VACANCIES)
            },
            handleClose() {
                this.dirtyForm = false;
                this.shake = false;
            },
            validateForm() {
                if (this.formValid) {
                    this.dirtyForm = false;
                    this.shake = false;
                    this.apply()
                } else {
                    this.dirtyForm = true
                    this.shake = true
                    setTimeout(() => this.shake = false, 300)
                }
            },
            apply() {
                if (!this.formValid) return
                this.formLoading = true
                const vacancyId = this.vacancyId
                const coverLetter = this.coverLetter
                this.coverLetter = ''
                this.$store.dispatch(APPLICATIONS + APPLY_VACANCY, {vacancyId, coverLetter}).then(() => {
                    this.updateVacancy()
                    this.formLoading = false
                    this.coverVisible = false
                })
            },
            accept() {
                this.$store.dispatch(APPLICATIONS + ACCEPT_VACANCY, this.vacancyId).then(() => {
                    this.updateVacancy()
                })
            },
            cancel() {
                this.$store.dispatch(APPLICATIONS + CANCEL_VACANCY, this.vacancyId).then(() => {
                    this.updateVacancy()
                })
            },
            reject() {
                this.$store.dispatch(APPLICATIONS + REJECT_VACANCY, this.vacancyId).then(() => {
                    this.updateVacancy()
                })
            },
            discard() {
                this.$store.dispatch(APPLICATIONS + DISCARD_VACANCY, this.vacancyId).then(() => {
                    this.updateVacancy()
                })
            }
        }
    }
</script>

<style scoped="" lang="scss">
    .accepted {
        background: rgba(197, 234, 184, 0.19);
    }
    .danger.text {
        color: red;
        &.shake {
            position: relative;
            transform-origin: center center;
            animation: shake 300ms ease-in-out;
        }
    }
    .editor {
        border-radius: 8px;
        overflow: hidden;
        &.danger:not(:focus) {
            border-color: red;
        }
    }
    @keyframes shake {
        0%, 100% {
            transform: rotate(0deg);
        }
        25%, 75% {
            transform: rotate(-15deg);
        }
        50% {
            transform: rotate(15deg);
        }

    }
</style>