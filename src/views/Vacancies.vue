<template>
    <div class="vacancies container my-5 py-5">
        <h2 class="text-center mb-4">Все вакансии</h2>
        <filter-vacancy></filter-vacancy>
        <div class="row my-5">
            <vacancy-item class="col-12 mb-5 py-5" v-for="vacancy in vacancies" :key="vacancy.id" :vacancyId="vacancy.id" type="information">
            </vacancy-item>
        </div>
    </div>
</template>

<script>
    import VacancyItem from '../components/VacancyItem.vue'
    import FilterVacancy from '../components/FilterVacancy.vue'

    export default {
        components: { VacancyItem, FilterVacancy },
        name: 'vacancies',
        data() {
            return {
                vacancies: this.$store.state.vacancies
            }
        }
    }
</script>