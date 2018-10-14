<template>
    <div class="belbin-survey-set-questions" v-loading="loading">
        <div class="belbin-survey" :class="{'is-error': isError, 'is-valid': isValid}" v-for="(question, i) in questions" :key="i">
            <p class="" v-html="question"></p>
            <div class="belbin-rounds d-flex align-items-center">
                <div class="belbin-round"
                     v-for="(answer, j) in [0,1,2,3,4,5,6,7,8,9,10]"
                     :key="j"
                     v-html="answer"
                     :class="{'selected': answers[i] === answer}"
                     @click="handleSelect(i, answer)"
                >
                </div>
            </div>
        </div>
        <div class="my-3 d-flex justify-content-between align-items-center">
            <div class="">
                <h3 v-if="!isValid && !isError" style="opacity: .6">Осталось потратить {{maxScore - total}} баллов</h3>
                <h3 v-if="!isValid && isError" class="text-danger" style="opacity: .9">У вас {{total - maxScore}} лишних баллов</h3>
                <h3 v-if="isValid"><i class="fas fa-thumbs-up text-success d-inline-block mx-3"></i>  <span style="opacity: .6">Отлично!</span></h3>
            </div>
            <el-button :type="!isValid ? '' : 'success'"
                       :disabled="!isValid"
                       @click="handleSuccess()"
            >Подтвердить</el-button>
        </div>
        {{hi ? '' : ''}}
    </div>
</template>

<script>
    import {SET_SURVEY_ANSWER, SURVEYS} from "../../../../store/types/surveys";
    export default {
        name: 'belbin-survey-set',
        data() {
            return {
                answers: [],
                hi: false,
                maxScore: 10,
                loading: false
            }
        },
        computed: {
            total() {
                this.hi
                return this.answers.length ? this.answers.reduce((a,b) => a+b) : 0
            },
            isError() {
                this.hi
                return this.maxScore < this.total
            },
            isValid() {
                this.hi
                return this.maxScore === this.total
            }

        },
        props: [
            'questions',
            'setNumber',
            'questionNumber'
        ],
        methods: {
            handleSelect(index, value) {
                this.hi = !this.hi;
                this.answers[index] = value
            },
            handleSuccess() {
                if (this.isValid) {
                    const answers = this.answers.map(x => x+'')
                    const setNumber = this.setNumber
                    const questionNumber = this.questionNumber
                    this.loading = true
                    this.$store.dispatch(SURVEYS + SET_SURVEY_ANSWER, {setNumber, questionNumber, answers})
                        .then(() => {
                            this.loading = false
                            this.$emit('success', true)
                        })
                        .catch(() => {
                            this.loading = false
                        })
                }
            }
        },
        mounted() {
            this.answers = this.questions.map(() => 0)
        }
    }
</script>

<style lang="scss" scoped>
    .belbin-survey {
        margin-bottom: 20px;
        padding: 0 10px 20px;
        border-bottom: 1px solid #f5f5f5;
        p {
            color: #505a5a;
        }
        &.is-error .belbin-round.selected {
            background-color: #be353b;
        }
        &.is-valid .belbin-round.selected {
            background-color: #79b554;
        }
    }
    .belbin-rounds {
        margin-left: -4px;
        margin-right: -4px;
    }
    .belbin-round {
        height: 30px;
        width: 30px;
        text-align: center;
        line-height: 30px;
        border-radius: 50%;
        background-color: #758889;
        display: inline-block;
        margin: 3px 4px;
        color: white;
        font-weight: bold;
        cursor: pointer;
        opacity: .8;
        transition: .3s;
        &:hover {
            opacity: 1;
            transition: 0s;
        }
        &.selected {
            height: 36px;
            width: 36px;
            line-height: 35px;
            opacity: 1;
            margin: 0 1px;
            transition: .3s;
            background-color: #549bb7;
        }
    }
</style>