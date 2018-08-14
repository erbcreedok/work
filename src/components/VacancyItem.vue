<template>
    <div>
        <div class="row align-items-center">
            <div class="company-profile col-md-2 col-2 d-none d-md-block">
                <div class="image-container w-100">
                    <!--<img :src="vacancy.image.src" alt="" width="100%">-->
                </div>
            </div>
            <div class="col-8 col-md-7">
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
                <el-button class="mb-3 ml-0 w-100"
                           type="success"
                           size="small"
                           @click="setStatus('accept')"
                           v-if="vacancy.status=== 'income'" >Принять</el-button>
                <el-button class="mb-3 ml-0 w-100"
                           type="danger"
                           size="small"
                           @click="setStatus('decline')"
                           v-if="vacancy.status=== 'income'" >Отклонить</el-button>
                <el-button class="mb-3 ml-0 w-100"
                           type="danger"
                           @click="setStatus('')"
                           v-if="vacancy.status === 'outcome'" >Отменить</el-button>
                <el-button class="mb-3 ml-0 w-100"
                           type="primary"
                           size="small"
                           @click="contactsVisible = true"
                           v-if="vacancy.status === 'accept'" >Контакты</el-button>
                <el-button class="mb-3 ml-0 w-100"
                           type="warning"
                           size="small"
                           @click="setStatus('')"
                           v-if="vacancy.status === 'decline'" >Убрать</el-button>
                <el-button class="mb-3 ml-0 w-100"
                           type="primary"
                           size="small"
                           @click="setStatus('outcome')"
                           v-if="vacancy.status === ''" >Подать заявку</el-button>
                <el-button class="mb-3 ml-0 w-100"
                           size="small"
                           @click="dialogVisible = true" >Подробнее</el-button>
            </div>
            <el-dialog
                    :title="vacancy.vacancyName"
                    :visible.sync="dialogVisible"
                    width="50%"
            >
                <p class="mb-4">Компания: {{vacancy.companyId}}</p>
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
            setStatus(val) {
                this.$store.commit('vacancies/' + SET_VACANCY_STATUS, { id: this.vacancy.id, val: val } )
            }
        }
    }
</script>