<template>
    <div v-loading="loading">
        <el-form ref="form" :model="form" :rules="rules" status-icon>
            <el-form-item class="mb-3" prop="vacancyField" label="Сфера деятельности">
                <el-input placeholder="IT, Маркетинг..." v-model="form.vacancyField"></el-input>
            </el-form-item>
            <el-form-item class="mb-3" prop="vacancyName" label="Название вакансии">
                <el-input placeholder="SMM Копирайтер, Риэлтор..." v-model="form.vacancyName"></el-input>
            </el-form-item>
            <el-form-item class="mb-3" prop="description" label="Описание">
                <el-input placeholder="Опишите вашу вакансию" v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item class="mb-3" prop="demands" label="Требования">
                <el-select
                        v-model="form.demands"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        placeholder="Вводите требования"
                        class="w-100"
                >
                </el-select>
            </el-form-item>
            <el-form-item class="mb-3" prop="type" label="Тип занятости">
                <el-select
                        v-model="form.type"
                        multiple
                        class="w-100"
                >
                    <el-option v-for="item in types"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <div class="row mb-5">
                <div class="col-md-6">
                    <el-form-item class="mb-3" prop="minSalary" label="Минимальная зарплата">
                        <el-input-number :min="0" v-model="form.minSalary"></el-input-number>
                    </el-form-item>
                </div>
                <div class="col-md-6">
                    <el-form-item class="mb-3" prop="maxSalary" label="Максимальная зарплата">
                        <el-input-number :min="0" v-model="form.maxSalary"></el-input-number>
                    </el-form-item>
                </div>
            </div>
            <div class="text-right">
                <el-button @click="clearForm('form')">Отмена</el-button>
                <el-button type="primary" @click="submitForm('form')">Зарегистрироваться</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    import { CREATE_VACANCY } from '../../store/mutation-types';
    import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
    import ElInputNumber from "../../../node_modules/element-ui/packages/input-number/src/input-number";
    import {VACANCIES} from "../../store/types/vacancies";

    export default {
        components: {
            ElInputNumber,
            ElFormItem},
        name: 'new-vacancy',
        data() {
            return {
                loading: false,
                types: [
                    {label: 'Полная занятость', value: 'Полная занятость'},
                    {label: 'Частичная занятость', value: 'Частичная занятость'},
                    {label: 'Проектная работа', value: 'Проектная работа'},
                    {label: 'Стажировка', value: 'Стажировка'},
                    {label: 'Практика', value: 'Практика'}
                ],
                form: {
                    vacancyField: '',
                    vacancyName: '',
                    description: '',
                    demands: [],
                    type: [],
                    minSalary: 50000,
                    maxSalary: 100000,
                },
                rules: {
                    vacancyField: [
                        { required: true, message: 'Заполните это поле', trigger: 'blur' },
                    ],
                    vacancyName: [
                        { required: true, message: 'Заполните это поле', trigger: 'blur' },
                    ],
                    description: [
                        { min: 40, message: 'Оставьте описание как минимум в 40 символов', trigger: 'blur' }
                    ],
                }
            }
        },
        computed: {
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        if (this.form.description === '') {
                            delete this.form.description
                        }
                        this.$store.dispatch(VACANCIES + CREATE_VACANCY , this.form).then(() => {
                            const h = this.$createElement;
                            this.$message({
                                message: h('p', null, [
                                    h('span', null, 'Вакансия '),
                                    h('i', { style: 'color: teal' }, `"${this.form.vacancyName}"`),
                                    h('span', null, ' успешно создана'),
                                ]),
                                type: 'success'
                            });
                            this.loading = false
                            setTimeout(() => {
                                this.$emit('success', true);
                            }, 1000)

                        })
                    } else {
                        this.$alert('Проверьте правильность всех полей', {
                            confirmButtonText: 'OK',
                        })
                            .then()
                        return false
                    }
                })
            },
            clearForm(formName) {
                this.$emit('cancel', true);
                this.$refs[formName].resetFields()
            }
        }
    }
</script>
<style scoped="">
</style>