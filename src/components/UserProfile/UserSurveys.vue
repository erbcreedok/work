<template>
    <div class="px-0 py-5 px-md-5">
        <h2 class="mb-5" v-if="surveys==={} && isLoading" style="opacity: .7">Загружаем вопросы</h2>
        <h2 class="mb-2"
            style="border-left: 3px #56a8ff solid;padding-left: 10px;"
            v-if="surveys">{{surveys.setName}}</h2>
        <el-form label-position="top"
                 v-if="surveys && surveys.questions && surveys.questions.length"
                 :hide-required-asterisk="true"
        >
            <template v-for="(survey, i) in surveys.questions"
            >
                <el-form-item :label="survey.questionText"
                              class="my-5"
                              :key="i"
                              v-if="simpleQuestionTypes.includes(survey.questionType)"
                              :rules="{required: true, message: 'Ответьте на эти вопросы', trigger: 'blur'}"
                >
                    <template v-if="survey.questionType === 'singlechoice'">
                        <single-choice :survey="survey"
                                       :setNumber="surveys.setNumber"
                        ></single-choice>
                    </template>
                    <template v-if="survey.questionType === 'multichoice'">
                        <multiple-choice :survey="survey"
                                         :setNumber="surveys.setNumber"
                        ></multiple-choice>
                    </template>
                    <template v-if="survey.questionType === 'dropdown'">
                        <dropdown-survey :survey="survey"
                                         :setNumber="surveys.setNumber"
                        ></dropdown-survey>
                    </template>
                    <template v-if="survey.questionType === 'openended'">
                        <open-ended :survey="survey"
                                    :setNumber="surveys.setNumber"
                        ></open-ended>
                    </template>
                </el-form-item>
            </template>
            <belbin-survey :surveys="surveys.questions"
                           :setNumber="surveys.setNumber"
                           v-if="surveys.questions[0] && surveys.questions[0].questionType === 'belbin'"
            ></belbin-survey>
        </el-form>
        <h3 style="opacity: .6" v-if="surveys && surveys.questions && surveys.questions.length === 0">
            В этом сэте не нашлось ни одного вопроса, пока...
        </h3>
    </div>
</template>

<script>
    import {GET_SET_QUESTIONS, GET_SET_SURVEY, GET_SURVEYS_STATUS, SURVEYS} from "../../store/types/surveys"
    import SingleChoice from './UserSurveyTypes/SingleChoice'
    import MultipleChoice from "./UserSurveyTypes/MultipleChoice";
    import DropdownSurvey from "./UserSurveyTypes/Dropdown";
    import OpenEnded from "./UserSurveyTypes/OpenEnded";
    import ElInputNumber from "../../../node_modules/element-ui/packages/input-number/src/input-number";
    import BelbinSurvey from "./UserSurveyTypes/Belbin/Belbin";
    export default {
        data() {
            return {
                simpleQuestionTypes: ['singlechoice', 'multichoice', 'dropdown', 'openended']
            }
        },
        components: {
            BelbinSurvey,
            ElInputNumber,
            OpenEnded,
            DropdownSurvey,
            MultipleChoice,
            SingleChoice
        },
        computed: {
            surveys() {
                return this.$store.getters[SURVEYS + GET_SET_SURVEY]
            },
            isLoading() {
                return this.$store.getters[SURVEYS + GET_SURVEYS_STATUS] === 'loading'
            }
        },
        methods: {
            getSurvey(set) {
                this.$store.dispatch(SURVEYS + GET_SET_QUESTIONS, set)
            }
        },
        watch: {
            $route (to, from){
                if (to.params.set && to.params.set !== from.params.set) {
                    this.getSurvey(to.params.set)
                }
            }
        },
        mounted() {
            window.scrollTo(0, 0);
            if (this.$route.params.set) {
                this.getSurvey(this.$route.params.set)
            }
        }
    }
</script>

<style lang="scss" scoped="">
    .el-form-item {
        padding: 10px 15px;
        border: 1px solid #0000000d;
        border-radius: 5px;
        max-width: 650px;
        box-shadow: 0 12px 16px 5px rgba(63, 89, 115, 0.16);
        position: relative;
        background: white;
    }
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