<template>
    <div class="px-0 py-5 px-md-5">
        <h2 class="mb-5">Тестовый сэт #{{$route.params.set}}</h2>
        <el-form label-position="top" v-if="surveys && surveys.length">
            <el-form-item v-for="(survey, index) in surveys"
                          :key="index"
                          :label="survey.questionText"
                          class="py-3 mb-5"
                          :rules="{required: true, message: 'Ответье на этот вопросы', trigger: 'blur'}"
            >
                <template v-if="survey.questionType === 'singlechoice'">
                    <el-radio-group v-model="formValues[survey.id][0]">
                        <el-radio v-for="(answer, index) in survey.answers"
                                  :key="index"
                                  :label="answer"
                        >{{answer}}</el-radio>
                    </el-radio-group>
                </template>
                <template v-if="survey.questionType === 'multichoice'">
                    <el-checkbox-group v-model="formValues[survey.id]">
                        <el-checkbox v-for="(answer, index) in survey.answers"
                                     :key="index"
                                     :label="answer"
                        ></el-checkbox>
                    </el-checkbox-group>
                </template>
                <template v-if="survey.questionType === 'dropdown'">
                    <el-select placeholder="Выберите ответ"
                               v-model="formValues[survey.id][0]"
                               class="mt-3">
                        <el-option
                                v-for="answer in survey.answers"
                                :key="answer"
                                :label="answer"
                                :value="answer">
                        </el-option>
                    </el-select>
                </template>
                <template v-if="survey.questionType === 'openended'">
                    <el-input placeholder="Введите ваш ответ"
                              class="mt-3"
                              v-model="formValues[survey.id][0]"
                    ></el-input>
                </template>
            </el-form-item>
        </el-form>
        <h3 style="opacity: .6" v-if="!surveys || !surveys.length">
            В этом сэте не нашлось ни одного вопроса, пока...
        </h3>
    </div>
</template>

<script>
    import {GET_SET_QUESTIONS, GET_SET_SURVEYS, SURVEYS} from "../../store/types/surveys"
    export default {
        data() {
            return {
                formValues: {},
                str: '',
                arr: [],
            }
        },
        computed: {
            surveys() {
                const surveys = this.$store.getters[SURVEYS + GET_SET_SURVEYS](this.$route.params.set-0)
                this.generateFormValues(surveys)
                return surveys
            }
        },
        methods: {
            generateFormValues(surveys) {
                console.log('вот так часто меняются данные')
                surveys.forEach((survey) => {
                    this.formValues[survey.id] = survey.questionType === 'multichoice' ? [] : ['']
                })
            }
        },
        watch: {
            $route (to, from){
                if (to.params.set && to.params.set !== from.params.set) {
                    this.$store.dispatch(SURVEYS + GET_SET_QUESTIONS, to.params.set)
                }
            }
        },
        mounted() {
            window.scrollTo(0, 0);
            if (this.$route.params.set) {
                this.$store.dispatch(SURVEYS + GET_SET_QUESTIONS, this.$route.params.set).then(
                    () => {this.generateFormValues(this.surveys)}
                )
            }
        }
    }
</script>

<style lang="scss" scoped="">
    /deep/ {
        .el-form-item__label {
            font-size: 1.6rem;
            font-weight: bold;
            padding-bottom: 0;
            line-height: unset;
        }
        .el-radio__label, .el-checkbox__label{
            font-weight: 300;
        }
        .el-radio, .el-checkbox, .el-radio+el-radio, .el-checkbox+.el-checkbox {
            margin: 0 30px .5rem 0;
        }
    }
</style>