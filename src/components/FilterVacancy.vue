<template>
    <div class="filter-vacancy">
    <div class="d-flex mb-5">
        <el-select class="mr-3" placeholder="Город" v-model="city.value">
            <el-option
                    v-for="item in city.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-select class="mr-3" placeholder="Занятость" v-model="employment.value">
            <el-option
                    v-for="item in employment.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-input class="mr-3" placeholder="Минимальная зарплата" v-model="salary.value" style="width: 200px"></el-input>
        <el-button >Фильтр</el-button>
    </div>
    <div class="d-flex">
        <el-input placeholder="Поиск" v-model="search.value">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
            <template slot="append">
                <el-button type="primary">Поиск</el-button>
            </template>
        </el-input>
    </div>
    </div>
</template>

<script>
    export default {
        name: 'filter-vacancy',
        data() {
            return {
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
                    options: [{
                        value: 'Полная занятость',
                        label: 'Полная занятость'
                    }, {
                        value: 'Частичная занятость',
                        label: 'Частичная занятость'
                    }, {
                        value: 'Проектная работа',
                        label: 'Проектная работа'
                    }, {
                        value: 'Стажировка',
                        label: 'Стажировка'
                    }, {
                        value: 'Практика',
                        label: 'Практика'
                    }, {
                        value: 'Фриланс',
                        label: 'Фриланс'
                    }, {
                        value: 'Волонтерство',
                        label: 'Волонтерство'
                    }],
                    value: ''
                },
                salary: {
                    value: ''
                },
                search: {
                    value: ''
                },
            }
        }
    }
</script>