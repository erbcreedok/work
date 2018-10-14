<template>
    <div class="belbin">
        <p>Ответьте на все вопросы так, что бы в сумме баллы были равны 10-и</p>
        <div class="d-flex position-relative">
            <div class="belbin-survey-questions"
                 v-for="(survey, i) in surveys.slice(0, activePage + 2)"
                 :key="i"
                 :class="{'active': activePage === i, 'next': activePage+1 === i, 'inactive': activePage > i }"
            >
                <h3 class="my-4 d-flex justify-content-center align-items-center">
                    <i class="fas fa-caret-left page-change"
                       @click="changeActivePage(i - 1)"
                       v-if="activePage > 0"
                    ></i>
                    <span class="d-block mx-3">Тест {{activePage + 1}} из {{surveys.length}}</span>
                    <i class="fas fa-caret-right page-change"
                       @click="changeActivePage(i + 1)"
                       v-if="activePage < surveys.length - 1"
                    ></i>
                </h3>
                <belbin-survey-set :questions="survey.questionText.split('.').filter(q => q!=='' && q!==' ')"
                                   :questionNumber="survey.questionNumber"
                                   :setNumber="setNumber"
                                   @success="handleSuccess(i)"
                ></belbin-survey-set>
                <div class="changer-overlay"
                     style="cursor: pointer"
                     v-if="activePage !== i"
                     @click="changeActivePage(i)"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
    import BelbinSurveySet from "./BelbinSet";
    export default {
        components: {BelbinSurveySet},
        name: 'belbin-survey',
        data() {
            return {
                activePage: 0
            }
        },
        props: [
            'surveys',
            'setNumber'
        ],
        methods: {
            changeActivePage(val) {
                this.activePage = val
            },
            handleSuccess(page) {
                this.$scrollTo('.el-main', 600, {offset: -100})
                setTimeout(() => {
                    if (page < this.surveys.length - 1) {
                        this.changeActivePage(page + 1)
                    }
                }, 600)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .belbin-survey-questions {
        padding: 5px 15px;
        border: 1px solid #0000000d;
        border-radius: 5px;
        max-width: 650px;
        box-shadow: 0 12px 16px 5px rgba(63, 89, 115, 0.16);
        margin: 0;
        position: relative;
        background: white;
        transition: .3s;
        transform-origin: top;
        z-index: 99;
    }
    .belbin-survey-questions.active {
        z-index: 100;
        transform: translateX(0) translateY(0) scale(1);
        display: block;
    }
    .belbin-survey-questions.inactive {
        position: absolute;
        transform: translateX(-99px) translateY(10px) scale(.9);
        opacity: 0;
        /*pointer-events: none;*/
    }
    .belbin-survey-questions.next {
        position: absolute;
        display: block;
        transform: translateX(99px) translateY(10px) scale(.9);
    }
    .page-change{
        opacity: .8;
        transition: .2s;
        cursor: pointer;
        font-size: 20px;
        &:hover {
            color: #5785de;
            opacity: 1;
        }
    }
    .changer-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>