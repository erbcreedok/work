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
    import {COMPANY_PROFILE, GET_PROFILE} from "../store/types/companyProfile";
    import {GET_COMPANY_APPLICATIONS} from "../store/mutation-types";
    import {
        APPLICATIONS,
        GET_ACCEPTED_APPLICATIONS,
        GET_APPLICATIONS, GET_INCOME_APPLICATIONS, GET_OUTCOME_APPLICATIONS,
        GET_REJECTED_APPLICATIONS
    } from "../store/types/applications";

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
            ...mapGetters({ // Списки отфильтрованных людей из store
                income  :   APPLICATIONS + GET_INCOME_APPLICATIONS,
                outcome :   APPLICATIONS + GET_OUTCOME_APPLICATIONS,
                accepted:   APPLICATIONS + GET_ACCEPTED_APPLICATIONS,
                declined:   APPLICATIONS + GET_REJECTED_APPLICATIONS,
            })
        },
        mounted() {
            if (this.$store.state.companyProfile.status === 'clean') {
                this.$store.dispatch(COMPANY_PROFILE + GET_PROFILE)
            }
            this.$store.dispatch(APPLICATIONS + GET_APPLICATIONS)
        }
    }
</script>

<style scoped="" lang="scss">
    h4 {
        padding: 20px 0;
        text-align: center;
    }
</style>