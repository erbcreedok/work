<template>
    <el-input placeholder="Введите ваш ответ"
              class="mt-3"
              v-model="selected" @change="handleChange($event)" v-if="survey"
    ></el-input>
</template>

<script>
    export default {
        name: 'open-ended',
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