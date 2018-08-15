<template>
    <div class="px-0 py-5 px-md-5">
        <h2 class="mb-5">Заявки компании</h2>
        <el-tabs>
            <el-tab-pane label="Входящие вакансии" :disabled="!income.length">
                <student-vacancy-item class="col-12 mb-5 py-5"
                                      v-for="application in income"
                                      :key="application.studentId + application.vacancyId"
                                      :vacancyId="application.vacancyId"
                                      :personId="application.studentId"
                                      :status="'income'"></student-vacancy-item>
                <h4 v-if="!income.length">Нет входящих заявок</h4>
            </el-tab-pane>
            <el-tab-pane label="Исходящие вакансии" :disabled="!outcome.length">
                <student-vacancy-item class="col-12 mb-5 py-5"
                                      v-for="application in outcome"
                                      :key="application.studentId + application.vacancyId"
                                      :vacancyId="application.vacancyId"
                                      :personId="application.studentId"
                                      :status="'outcome'"></student-vacancy-item>
                <h4 v-if="!outcome.length">Нет входящих заявок</h4>
            </el-tab-pane>
            <el-tab-pane label="Принятые вакансии" :disabled="!accepted.length">
                <student-vacancy-item class="col-12 mb-5 py-5"
                                      v-for="application in accepted"
                                      :key="application.studentId + application.vacancyId"
                                      :vacancyId="application.vacancyId"
                                      :personId="application.studentId"
                                      :status="'accept'"></student-vacancy-item>
                <h4 v-if="!accepted.length">Нет входящих заявок</h4>
            </el-tab-pane>
            <el-tab-pane label="Отклоненные вакансии" :disabled="!declined.length">
                <student-vacancy-item class="col-12 mb-5 py-5"
                                      v-for="application in declined"
                                      :key="application.studentId + application.vacancyId"
                                      :vacancyId="application.vacancyId"
                                      :personId="application.studentId"
                                      :status="'reject'"></student-vacancy-item>
                <h4 v-if="!declined.length">Нет отклоненных заявок</h4>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import {
        GET_ACCEPTED_CVS,
        GET_INCOME_CVS,
        GET_OUTCOME_CVS,
        GET_OWN_VACANCIES,
        GET_REJECTED_CVS,
        VACANCIES
    } from "../store/types/vacancies";
    import {GET_ALL_STUDENTS, STUDENTS} from "../store/types/students";
    import StudentVacancyItem from "./StudentVacancyItem";

    export default {
        name: 'company-requests',
        components: {
            StudentVacancyItem},
        props: {
            type: String
        },
        data() {
            return {

            }
        },
        computed: {
            vacancies() {
                return this.$store.state.people // Загрузка списка людей из store
            },
            students() {
                return this.$store.getters(STUDENTS + GET_ALL_STUDENTS)
            },
            ...mapGetters({ // Списки отфильтрованных людей из store
                income  :   VACANCIES + GET_INCOME_CVS,
                outcome :   VACANCIES + GET_OUTCOME_CVS,
                accepted:   VACANCIES + GET_ACCEPTED_CVS,
                declined:   VACANCIES + GET_REJECTED_CVS,
            })
        },
        mounted() {
            this.$store.dispatch(STUDENTS + GET_ALL_STUDENTS)
            this.$store.dispatch(VACANCIES + GET_OWN_VACANCIES)
        }
    }
</script>

<style scoped="" lang="scss">
    h4 {
        padding: 20px 0;
        text-align: center;
    }
</style>