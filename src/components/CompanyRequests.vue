<template>
    <div class="px-0 py-5 px-md-5">
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
    import { mapGetters } from 'vuex'

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
                return this.$store.state.people // Загрузка списка людей из store
            },
            ...mapGetters({ // Списки отфильтрованных людей из store
                income  :   'people/incomePeople',
                outcome :   'people/outcomePeople',
                accepted:   'people/acceptedPeople',
                declined:   'people/declinedPeople',
            })
        }
    }
</script>

<style scoped="" lang="scss">
    h4 {
        padding: 20px 0;
        text-align: center;
    }
</style>