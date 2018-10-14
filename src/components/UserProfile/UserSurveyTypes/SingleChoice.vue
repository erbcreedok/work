<template>
    <el-radio-group v-model="selected"
                    @change="handleChange($event)"
                    v-if="survey"
                    v-loading="loading"
    >
        <el-radio v-for="(answer, j) in survey.answers"
                  :key="j"
                  :label="answer"
        >{{answer}}</el-radio>
    </el-radio-group>
</template>

<script>
    import {SET_SURVEY_ANSWER, SURVEYS} from "../../../store/types/surveys";
    export default {
        name: 'single-choice',
        data() {
            return {
                selected: '',
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
                this.$store.dispatch(SURVEYS + SET_SURVEY_ANSWER, {setNumber, questionNumber, answers: [value]})
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