<template>
    <div class="px-0 py-5 px-md-5">
        <h2 class="mb-5">Мои заявки</h2>
        <el-tabs>
            <el-tab-pane label="Входящие вакансии" :disabled="!income.length">
                <vacancy-item class="col-12 mb-5 py-5" v-for="vacancy in income" :key="vacancy.id" :vacancyId="vacancy.id"></vacancy-item>
                <h4 v-if="!income.length">Нет входящих заявок</h4>
            </el-tab-pane>
            <el-tab-pane label="Исходящие вакансии" :disabled="!outcome.length">
                <vacancy-item class="col-12 mb-5 py-5" v-for="vacancy in outcome" :key="vacancy.id" :vacancyId="vacancy.id"></vacancy-item>
                <h4 v-if="!outcome.length">Нет входящих заявок</h4>
            </el-tab-pane>
            <el-tab-pane label="Принятые вакансии" :disabled="!accepted.length">
                <vacancy-item class="col-12 mb-5 py-5" v-for="vacancy in accepted" :key="vacancy.id" :vacancyId="vacancy.id"></vacancy-item>
                <h4 v-if="!accepted.length">Нет входящих заявок</h4>
            </el-tab-pane>
            <el-tab-pane label="Отклоненные вакансии" :disabled="!declined.length">
                <vacancy-item class="col-12 mb-5 py-5" v-for="vacancy in declined" :key="vacancy.id" :vacancyId="vacancy.id"></vacancy-item>
                <h4 v-if="!declined.length">Нет отклоненных заявок</h4>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import VacancyItem from './VacancyItem.vue'
    import {
        GET_ACCEPTED_VACANCIES, GET_ALL_STUDENT_VACANCIES,
        GET_INCOME_VACANCIES,
        GET_OUTCOME_VACANCIES, GET_OWN_VACANCIES, GET_REJECTED_VACANCIES,
        VACANCIES
    } from "../store/types/vacancies";

    export default {
        name: 'user-requests',
        components: {VacancyItem},
        props: {
            type: String
        },
        data() {
            return {

            }
        },
        computed: {
            vacancies() {
                return this.$store.state.vacancies
            },
            income() {
                return this.$store.getters[VACANCIES + GET_INCOME_VACANCIES]
            },
            outcome() {
                return this.$store.getters[VACANCIES + GET_OUTCOME_VACANCIES]
            },
            accepted() {
                return this.$store.getters[VACANCIES + GET_ACCEPTED_VACANCIES]
            },
            declined() {
                return this.$store.getters[VACANCIES + GET_REJECTED_VACANCIES]
            }
        },
        mounted() {
            if (this.$store.state.vacancies.status === 'clear') {
                this.$store.dispatch(VACANCIES + GET_ALL_STUDENT_VACANCIES)
            }
        }
    }
</script>

<style scoped="" lang="scss">
    h4 {
        padding: 20px 0;
        text-align: center;
    }
</style>