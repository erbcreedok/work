<template>
    <el-radio-group v-model="selected" @change="handleChange($event)" v-if="survey">
        <el-radio v-for="(answer, j) in survey.answers"
                  :key="j"
                  :label="answer"
        >{{answer}}</el-radio>
    </el-radio-group>
</template>

<script>
    export default {
        name: 'single-choice',
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