<template>
    <div class="filter-vacancy">
    <div class="d-flex mb-5">
        <el-select class="mr-3" placeholder="Возраст" v-model="age.value">
            <el-option
                    v-for="item in age.options"
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
        <el-input class="mr-3" placeholder="Стаж работы" v-model="experience.value" style="width: 200px"></el-input>
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
                        value: '4',
                        label: 'Высшее (магистр)'
                    }],
                    value: ''
                },
                experience: {
                    value: ''
                },
                search: {
                    value: ''
                },
            }
        }
    }
</script>