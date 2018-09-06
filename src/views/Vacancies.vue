<template>
    <div class="vacancies container my-5 py-5">
        <h2 class="text-center mb-4">Все вакансии</h2>
        <filter-vacancy @filter="onFilter($event)"></filter-vacancy>
        <div class="row my-5" v-if="vacancies.length > 0" v-loading="isLoading !== 'success'">
            <vacancy-item class="col-12 mb-5 py-5" v-for="vacancy in vacancies" :key="vacancy.id" :vacancyId="vacancy.id" type="information"></vacancy-item>
        </div>
        <div class="py-5 text-center" v-if="vacancies.length < 1" v-loading="isLoading !== 'success'">
            <h3>Вакансии не найдены</h3>
        </div>
    </div>
</template>

<script>
    import VacancyItem from '../components/VacancyItem.vue'
    import FilterVacancy from '../components/FilterVacancy.vue'
    import {
        GET_ALL_VACANCIES,
        GET_FILTERED_VACANCIES,
        GET_LOAD_VACANCIES,
        GET_LOADING_STATUS,
        VACANCIES
    } from "../store/types/vacancies";

    export default {
        components: { VacancyItem, FilterVacancy },
        name: 'vacancies',
        data() {
            return {}
        },
        computed: {
            vacancies() {
                return this.$store.getters[VACANCIES + GET_LOAD_VACANCIES]
            },
            isLoading() {
                return this.$store.getters[VACANCIES + GET_LOADING_STATUS]
            }
        },
        methods: {
            onFilter(filters) {
                this.$store.dispatch(VACANCIES + GET_FILTERED_VACANCIES, filters)
            }
        },
        mounted() {
            this.$store.dispatch(VACANCIES + GET_ALL_VACANCIES)
        },
    }
</script>

<style scoped="">
    .vacancies {
        min-height: 100vh;
        min-height: calc(100vh - 335px);
    }
</style>