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
                return this.$store.getters['vacancies/incomeVacancies']
            },
            outcome() {
                return this.$store.getters['vacancies/outcomeVacancies']
            },
            accepted() {
                return this.$store.getters['vacancies/acceptedVacancies']
            },
            declined() {
                return this.$store.getters['vacancies/declinedVacancies']
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