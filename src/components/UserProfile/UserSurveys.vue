<template>
    <div class="px-0 py-5 px-md-5">
        <h2 class="mb-5" v-if="!surveys">Загружаем вопросы</h2>
        <h2 class="mb-5" v-if="surveys && surveys.length > 0">{{surveys[0].setName}}</h2>
        <el-form label-position="top"
                 v-if="surveys && surveys.length"
                 :hide-required-asterisk="true"
        >
            <el-form-item v-for="(survey, i) in surveys"
                          :key="i"
                          :label="survey.questionText"
                          class="py-3 mb-5"
                          :rules="{required: true, message: 'Ответьте на эти вопросы', trigger: 'blur'}"
            >
                <template v-if="survey.questionType === 'singlechoice'">
                    <single-choice :survey="survey"></single-choice>
                </template>
                <template v-if="survey.questionType === 'multichoice'">
                    <multiple-choice :survey="survey"></multiple-choice>
                </template>
                <template v-if="survey.questionType === 'dropdown'">
                    <dropdown-survey :survey="survey"></dropdown-survey>
                </template>
                <template v-if="survey.questionType === 'openended'">
                    <open-ended :survey="survey"></open-ended>
                </template>
            </el-form-item>
        </el-form>
        <h3 style="opacity: .6" v-if="surveys && surveys.length === 0">
            В этом сэте не нашлось ни одного вопроса, пока...
        </h3>
    </div>
</template>

<script>
    import {GET_SET_QUESTIONS, GET_SET_SURVEYS, SURVEYS} from "../../store/types/surveys"
    import SingleChoice from './UserSurveyTypes/SingleChoice'
    import MultipleChoice from "./UserSurveyTypes/MultipleChoice";
    import DropdownSurvey from "./UserSurveyTypes/Dropdown";
    import OpenEnded from "./UserSurveyTypes/OpenEnded";
    export default {
        data() {
            return {
            }
        },
        components: {
            OpenEnded,
            DropdownSurvey,
            MultipleChoice,
            SingleChoice
        },
        computed: {
            surveys() {
                const surveys = this.$store.getters[SURVEYS + GET_SET_SURVEYS](this.$route.params.set - 0)
                return surveys
            }
        },
        methods: {
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
                this.$store.dispatch(SURVEYS + GET_SET_QUESTIONS, this.$route.params.set)
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