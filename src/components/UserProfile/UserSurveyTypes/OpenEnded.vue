<template>
    <el-input placeholder="Введите ваш ответ"
              class="mt-3"
              v-model="selected"
              @change="handleChange($event)"
              @blur="handleChange($event.target.value)"
              v-if="survey"
              v-loading="loading"
    ></el-input>
</template>

<script>
    import {SET_SURVEY_ANSWER, SURVEYS} from "../../../store/types/surveys";
    export default {
        name: 'open-ended',
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
                if (!value || value === '') return
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