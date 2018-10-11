<template>
    <el-select v-model="selected" @change="handleChange($event)" v-if="survey"
               placeholder="Выберите ответ"
               class="mt-3">
        <el-option
                v-for="answer in survey.answers"
                :key="answer"
                :label="answer"
                :value="answer">
        </el-option>
    </el-select>
</template>

<script>
    export default {
        name: 'dropdown-survey',
        data() {
            return {
                selected: ''
            }
        },
        props: {
            survey: {}
        },
        methods: {
            handleChange(value) {
                console.log(value)
            }
        },
        mounted() {
            if (this.survey && this.survey.selectedAnswer) {
                this.selected = this.survey.selectedAnswer
            }
        }
    }
</script>