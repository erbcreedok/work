<template>
    <el-checkbox-group v-model.lazy="selected"
                       @change="handleChange($event)"
                       v-if="survey"
                       v-loading="loading"
    >
        <el-checkbox v-for="(answer, j) in survey.answers"
                     :key="j"
                     :label="answer"
        ></el-checkbox>
    </el-checkbox-group>
</template>

<script>
    import {SET_SURVEY_ANSWER, SURVEYS} from "../../../store/types/surveys";
    export default {
        name: 'multiple-choice',
        data() {
            return {
                selected: [],
                loading: false
            }
        },
        props: {
            survey: {},
            setNumber: Number
        },
        methods: {
            handleChange(value) {
                this.loading = true
                const setNumber = this.setNumber
                const questionNumber = this.survey.questionNumber
                this.$store.dispatch(SURVEYS + SET_SURVEY_ANSWER, {setNumber, questionNumber, answers: value})
                    .then(() => {
                        this.loading = false
                    })
                    .catch(() => {
                        this.loading = false
                    })
            }
        },
        mounted() {
            if (this.survey && this.survey.selectedAnswer) {
                this.selected = this.survey.selectedAnswer
            }
        }
    }
</script>