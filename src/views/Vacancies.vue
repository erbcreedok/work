<template>
    <div class="vacancies container my-5 py-5">
        <h2 class="text-center mb-4">Все вакансии</h2>
        <filter-vacancy></filter-vacancy>
        <div class="row my-5">
            <vacancy-item class="col-12 mb-5 py-5" v-for="(request, index) in vacancies" :key="index" :vacancy="request">
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
                vacancies: [
                    {
                        name: 'ZARA',
                        description: 'За́ра — ведущая торговая сеть группы компаний Inditex, принадлежит испанскому магнату Амансио Ортеге, который также является владельцем таких брендов как Massimo Dutti, Pull and Bear, Oysho, Zara Home, Uterqüe, Stradivarius, Lefties и Bershka.',
                        image: {src: 'https://www.afisha.uz/ui/catalog/2006/09/0090972.jpg'}
                    },
                    {
                        name: 'Chocolife',
                        description: 'Chocolife.me – это крупнейший сервис коллективных покупок в Казахстане, занимающий лидирующую позицию на рынке электронной коммерции',
                        image: {src: 'https://lh3.googleusercontent.com/0H4TtEK9jlKGGPIfeJS199Siqq1i7COPEOFEDgvarZBvWcDStV4XuV4tfDIhzl3VLgA'}
                    },
                    {
                        name: 'RahmetApp',
                        description: 'Chocolife.me – это крупнейший сервис коллективных покупок в Казахстане, занимающий лидирующую позицию на рынке электронной коммерции',
                        image: {src: 'https://is3-ssl.mzstatic.com/image/thumb/Purple115/v4/f9/e0/72/f9e07219-d121-63c8-41e4-6f50a96eb515/AppIcon-1x_U007emarketing-85-220-0-9.png/246x0w.jpg'}
                    },
                    {
                        name: 'Automato',
                        description: 'Привет, это Automato.<br/>Мы занимаемся автоматизацией, созданием  чат-ботов и сложных SaaS продуктов.',
                        image: {src: 'https://miro.medium.com/fit/c/240/240/0*CbyZvfqlbjX6Ap64.'}
                    }
                ]
            }
        }
    }
</script>