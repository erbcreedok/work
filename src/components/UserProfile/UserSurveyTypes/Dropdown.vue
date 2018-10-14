<template>
    <el-select v-model="selected" @change="handleChange($event)" v-if="survey"
               placeholder="Выберите ответ"
               class="mt-3"
               v-loading="loading"
    >
        <el-option
                v-for="answer in survey.answers"
                :key="answer"
                :label="answer"
                :value="answer">
        </el-option>
    </el-select>
</template>

<script>
    import {SET_SURVEY_ANSWER, SURVEYS} from "../../../store/types/surveys";
    export default {
        name: 'dropdown-survey',
        data() {
            return {
                selected: '',
                loading: false
            }
        },
        props: {
            survey: {},
            setNumber: Number,
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