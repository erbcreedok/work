<template>
    <div class="filter-vacancy">
        <div class="d-flex mb-5 align-items-center">
            <div class="a-ui mr-3">
                <el-input placeholder="Сфера деятельности" v-model="filters.vacancyField"></el-input>
            </div>
            <div class="a-ui one-line-tags">
                <el-select class="mr-3" style="width: 240px" placeholder="Занятость" v-model="filters.type" multiple collapse-tags>
                    <el-option
                            v-for="item in employment.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="a-ui">
                <el-tooltip content="Минимальная зарплата" placement="bottom">
                    <el-input-number class="mr-3" placeholder="Минимальная зарплата" :min="0" :max="filters.maxSalary - 1" :step="1000" v-model="filters.minSalary"></el-input-number>
                </el-tooltip>
            </div>
            <div class="a-ui">
                <el-tooltip content="Максимальная зарплата" placement="bottom">
                    <el-input-number class="mr-3" placeholder="Максимальная зарплата" :min="filters.minSalary" :step="1000" v-model="filters.maxSalary"></el-input-number>
                </el-tooltip>
            </div>
            <div class="">
                <el-button @click="onFilter()" size="default">Фильтр</el-button>
            </div>
        </div>
        <!--<div class="d-flex">-->
            <!--<el-input placeholder="Поиск" v-model="search.value">-->
                <!--<i slot="prefix" class="el-input__icon el-icon-search"></i>-->
                <!--<template slot="append">-->
                    <!--<el-button type="primary">Поиск</el-button>-->
                <!--</template>-->
            <!--</el-input>-->
        <!--</div>-->
    </div>
</template>

<script>
    export default {
        name: 'filter-vacancy',
        data() {
            return {
                filters: {
                    vacancyField: '',
                    type: [],
                    minSalary: 0,
                    maxSalary: 300000
                },
                vacancyFields: {
                    value:''
                },
                city: {
                    options: [{
                        value: 'Астана',
                        label: 'Астана'
                    }, {
                        value: 'Алматы',
                        label: 'Алматы'
                    }, {
                        value: 'Актобе',
                        label: 'Актобе'
                    }, {
                        value: 'Актау',
                        label: 'Актау'
                    }, {
                        value: 'Атырау',
                        label: 'Атырау'
                    }, {
                        value: 'Караганды',
                        label: 'Караганды'
                    }, {
                        value: 'Шымкент',
                        label: 'Шымкент'
                    }],
                    value: ''
                },
                employment: {
                    options: [
                        {label: 'Полная занятость', value: 'Полная занятость'},
                        {label: 'Частичная занятость', value: 'Частичная занятость'},
                        {label: 'Проектная работа', value: 'Проектная работа'},
                        {label: 'Стажировка', value: 'Стажировка'},
                        {label: 'Практика', value: 'Практика'}
                    ],
                    values: []
                },
                search: {
                    value: ''
                },
            }
        },
        methods: {
            onFilter() {
                const filters = {
                    minSalary: this.filters.minSalary,
                    maxSalary: this.filters.maxSalary,
                }
                if (this.filters.vacancyField !== '') {
                    filters.vacancyField = this.filters.vacancyField
                }
                if (this.filters.type.length > 0) {
                    filters.type = this.filters.type
                }
                this.$emit('filter', filters)
            }
        }
    }
</script>