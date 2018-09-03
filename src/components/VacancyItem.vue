<template>
    <div :class="{'accepted': vacancy.status === 'user accepted' || vacancy.status === 'company accepted'}">
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
                <template v-if="vacancy.status=== 'company pending'">
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
                <template v-if="vacancy.status === 'user pending'">
                    <p style="opacity: .6;">Исходящая заявка</p>
                    <el-button class="mb-3 ml-0 w-100"
                               type="danger"
                               size="small"
                               @click="discard()">Отменить</el-button>
                </template>
                <template v-if="vacancy.status === 'user accepted' || vacancy.status === 'company accepted'">
                    <p style="opacity: .6;">Вакансия принята</p>
                    <el-button class="mb-3 ml-0 w-100"
                               type="primary"
                               size="small"
                               @click="contactsVisible = true">Контакты</el-button>
                </template>
                <template v-if="vacancy.status === 'user reject' || vacancy.status === 'company reject'">
                    <p style="opacity: .6;">Вакансия отклонена</p>
                    <el-button class="mb-3 ml-0 w-100"
                               type="warning"
                               size="small"
                               @click="discard()">Убрать</el-button>
                </template>
                <template v-if="vacancy.status === ''">
                    <el-button class="mb-3 ml-0 w-100"
                               type="primary"
                               size="small"
                               @click="apply()" >Подать заявку</el-button>
                </template>
                <el-button class="mb-3 ml-0 w-100"
                           size="small"
                           @click="dialogVisible = true" >Подробнее</el-button>
            </div>
            <el-dialog
                    :title="vacancy.vacancyName"
                    :visible.sync="dialogVisible"
                    width="50%"
            >
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
                    width="30%"
            >
                <p>Телефон: <a href="tel: +7 777 777 77 77">+7 778 213 45 67</a></p>
                <p>Почта: <a href="mailto: info@letswork.kz">info@letswork.kz</a></p>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {SET_VACANCY_STATUS, USER} from '../store/mutation-types'
    import {GET_VACANCY, VACANCIES} from "../store/types/vacancies";
    import {AUTH, IS_LOGGED} from '../store/types/auth';
    import {
        ACCEPT_VACANCY,
        APPLICATIONS,
        APPLY_VACANCY,
        DISCARD_VACANCY,
        REJECT_VACANCY
    } from "../store/types/applications";

    export default {
        name: 'vacancy-item',
        props: {
            vacancyId: String,
            type: String
        },
        data() {
            return {
                dialogVisible: false,
                contactsVisible: false,
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

        },
        methods: {
            apply() {
                this.$store.dispatch(APPLICATIONS + APPLY_VACANCY, this.vacancyId).then(() => {
                    this.$store.dispatch(VACANCIES + GET_VACANCY, this.vacancyId)
                })
            },
            accept() {
                this.$store.dispatch(APPLICATIONS + ACCEPT_VACANCY, this.vacancyId).then(() => {
                    this.$store.dispatch(VACANCIES + GET_VACANCY, this.vacancyId)
                })
            },
            reject() {
                this.$store.dispatch(APPLICATIONS + REJECT_VACANCY, this.vacancyId).then(() => {
                    this.$store.dispatch(VACANCIES + GET_VACANCY, this.vacancyId)
                })
            },
            discard() {
                this.$store.dispatch(APPLICATIONS + DISCARD_VACANCY, this.vacancyId).then(() => {
                    this.$store.dispatch(VACANCIES + GET_VACANCY, this.vacancyId)
                })
            },
            setStatus(val) {
                this.$store.commit('vacancies/' + SET_VACANCY_STATUS, { id: this.vacancy.id, val: val } )
            }
        }
    }
</script>

<style scoped="" lang="scss">
    .accepted {
        background: rgba(197, 234, 184, 0.19);
    }
</style>