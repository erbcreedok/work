<template>
    <el-checkbox-group v-model.lazy="selected" @change="handleChange($event)" v-if="survey">
        <el-checkbox v-for="(answer, j) in survey.answers"
                     :key="j"
                     :label="answer"
        ></el-checkbox>
    </el-checkbox-group>
</template>

<script>
    export default {
        name: 'multiple-choice',
        data() {
            return {
                selected: []
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