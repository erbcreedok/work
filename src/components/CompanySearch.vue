<template>
    <div class="px-0 py-5 px-md-5">
        <h2 class="mb-5">Поиск работников</h2>
        <!--<filter-people></filter-people>-->
        <div class="row my-5 py-5">
            <student-item class="col-12 mb-5" v-for="(person, index) in people" :key="index + '-person'" :personId="person.id" action="contacts"></student-item>
        </div>
    </div>
</template>

<script>
    import FilterPeople from './FilterPeople.vue'
    import {GET_ALL_STUDENTS, STUDENTS} from "../store/types/students";
    import StudentItem from "./StudentItem";
    import {GET_OWN_VACANCIES, VACANCIES} from "../store/types/vacancies";
    import {COMPANY_PROFILE, GET_PROFILE} from "../store/types/companyProfile";

    export default {
        name: 'company-search',
        components: {
            StudentItem,
            FilterPeople,
        },
        data() {
            return {}
        },
        computed: {
            people(){
                return this.$store.getters[STUDENTS + GET_ALL_STUDENTS]
            }
        },
        mounted() {
            if (this.$store.state.companyProfile.status === 'clean') {
                this.$store.dispatch(COMPANY_PROFILE + GET_PROFILE)
            }
            this.$store.dispatch(STUDENTS + GET_ALL_STUDENTS)
            this.$store.dispatch(VACANCIES + GET_OWN_VACANCIES)
        }
    }
</script>