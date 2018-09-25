<template>
    <div class="filter-vacancy">
    <div class="d-flex mb-5">
        <el-select class="mr-3" placeholder="Навыки" v-model="skills.value">
            <el-option
                    v-for="item in skills.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-select class="mr-3" placeholder="Образование" v-model="education.value">
            <el-option
                    v-for="item in education.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-select class="mr-3" placeholder="Город" v-model="city.value">
            <el-option
                    v-for="item in city.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
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
        name: 'filter-people',
        data() {
            return {
                age: {
                    options: [{
                        value: '1',
                        label: '16-18'
                    }, {
                        value: '2',
                        label: '18-22'
                    }, {
                        value: '3',
                        label: '22-27'
                    }, {
                        value: '4',
                        label: '27 и старше'
                    }],
                    value: ''
                },
                education: {
                    options: [{
                        value: '1',
                        label: 'Среднее'
                    }, {
                        value: '2',
                        label: 'Средне-Специализированное'
                    }, {
                        value: '3',
                        label: 'Неоконченное Высшее (бакалавр)'
                    }, {
                        value: '4',
                        label: 'Высшее (бакалавр)'
                    }, {
                        value: '5',
                        label: 'Высшее (магистр)'
                    }],
                    value: ''
                },
                skills: {
                    options: [{
                        value: '1',
                        label: 'Пользователь ПК'
                    }, {
                        value: '2',
                        label: 'Работа в команде'
                    }, {
                        value: '3',
                        label: 'Организаторские навыки'
                    }, {
                        value: '4',
                        label: 'Грамотная речь'
                    }, {
                        value: '5',
                        label: 'Управление персоналом'
                    }, {
                        value: '6',
                        label: 'Водительские права категории B'
                    }, {
                        value: '7',
                        label: 'Знания в юриспруденции'
                    }],
                    value: ''
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
                search: {
                    value: ''
                },
            }
        }
    }
</script>