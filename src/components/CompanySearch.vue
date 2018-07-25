<template>
    <div class="px-5 py-5">
        <h2 class="mb-5">Поиск работников</h2>
        <filter-people></filter-people>
        <div class="row my-5 py-5">
            <user-item class="col-12 mb-5" v-for="(person, index) in people" :key="index + '-person'" :personId="person.id" action="contacts"></user-item>
        </div>
    </div>
</template>

<script>
    import FilterPeople from './FilterPeople.vue'
    import UserItem from './PersonItem.vue'

    export default {
        name: 'company-search',
        components: {
            FilterPeople,
            UserItem
        },
        data() {
            return {
                people: this.$store.state.people
            }
        }
    }
</script>