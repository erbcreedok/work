<template>
    <div class="px-5 py-5">
        <h2 class="mb-5">Заявки компании</h2>
        <el-tabs>
            <el-tab-pane label="Входящие вакансии" :disabled="!income.length">
                <person-item class="col-12 mb-5 py-5" v-for="person in income" :key="person.id" :personId="person.id"></person-item>
                <h4 v-if="!income.length">Нет входящих заявок</h4>
            </el-tab-pane>
            <el-tab-pane label="Исходящие вакансии" :disabled="!outcome.length">
                <person-item class="col-12 mb-5 py-5" v-for="person in outcome" :key="person.id" :personId="person.id"></person-item>
                <h4 v-if="!outcome.length">Нет входящих заявок</h4>
            </el-tab-pane>
            <el-tab-pane label="Принятые вакансии" :disabled="!accepted.length">
                <person-item class="col-12 mb-5 py-5" v-for="person in accepted" :key="person.id" :personId="person.id"></person-item>
                <h4 v-if="!accepted.length">Нет входящих заявок</h4>
            </el-tab-pane>
            <el-tab-pane label="Отклоненные вакансии" :disabled="!declined.length">
                <person-item class="col-12 mb-5 py-5" v-for="person in declined" :key="person.id" :personId="person.id"></person-item>
                <h4 v-if="!declined.length">Нет отклоненных заявок</h4>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import PersonItem from './PersonItem.vue'

    export default {
        name: 'company-requests',
        components: {PersonItem},
        props: {
            type: String
        },
        data() {
            return {

            }
        },
        computed: {
            vacancies() {
                return this.$store.state.people
            },
            income() {
                return this.$store.getters.incomePeople
            },
            outcome() {
                return this.$store.getters.outcomePeople
            },
            accepted() {
                return this.$store.getters.acceptedPeople
            },
            declined() {
                return this.$store.getters.declinedPeople
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