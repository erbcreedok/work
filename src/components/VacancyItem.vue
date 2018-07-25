<template>
    <div>
        <div class="row align-items-center">
            <div class="company-profile col-md-2 col-2">
                <div class="image-container w-100">
                    <img :src="vacancy.image.src" alt="" width="100%">
                </div>
            </div>
            <div class="col-7">
                <h3>{{vacancy.name}} | {{ vacancy.company }}</h3>
                <p v-html="vacancy.description"></p>
                <div style="opacity: .5">
                    <p class="mb-2">Занятость: {{vacancy.employment}}</p>
                    <p class="mb-0">Заработная плата: {{vacancy.salary}}</p>
                </div>
            </div>
            <div class="col-3 d-flex align-items-center flex-column justify-content-center" v-if="isLogged !== 1">
                <el-button class="mb-3 ml-0 w-100"
                           @click="dialogVisible = true" >Подробнее</el-button>
            </div>
            <div class="col-3 d-flex align-items-center flex-column justify-content-center" v-if="isLogged === 1">
                <el-button class="mb-3 ml-0 w-100"
                           type="success"
                           size="small"
                           @click="setStatus('accept')"
                           v-if="vacancy.status=== 'income'" >Принять</el-button>
                <el-button class="mb-3 ml-0 w-100"
                           type="danger"
                           size="small"
                           @click="setStatus('decline')"
                           v-if="vacancy.status=== 'income'" >Отклонить</el-button>
                <el-button class="mb-3 ml-0 w-100"
                           type="danger"
                           @click="setStatus('')"
                           v-if="vacancy.status === 'outcome'" >Отменить</el-button>
                <el-button class="mb-3 ml-0 w-100"
                           type="primary"
                           size="small"
                           @click="contactsVisible = true"
                           v-if="vacancy.status === 'accept'" >Контакты</el-button>
                <el-button class="mb-3 ml-0 w-100"
                           type="warning"
                           size="small"
                           @click="setStatus('')"
                           v-if="vacancy.status === 'decline'" >Убрать</el-button>
                <el-button class="mb-3 ml-0 w-100"
                           type="primary"
                           size="small"
                           @click="setStatus('outcome')"
                           v-if="vacancy.status === ''" >Подать заявку</el-button>
                <el-button class="mb-3 ml-0 w-100"
                           size="small"
                           @click="dialogVisible = true" >Подробнее</el-button>
            </div>
            <el-dialog
                    :title="vacancy.name"
                    :visible.sync="dialogVisible"
                    width="50%"
            >
                <p class="mb-4">Компания: {{vacancy.company}}</p>
                <p>Требования:</p>
                <ul class="mb-4">
                    <li v-for="(requirement, index) in vacancy.requirements" :key="index">
                        {{requirement}}
                    </li>
                </ul>
                <div style="opacity: .5">
                    <p class="mb-2">Занятость: {{vacancy.employment}}</p>
                    <p class="mb-0">Заработная плата: {{vacancy.salary}}</p>
                </div>
            </el-dialog>
            <el-dialog
                    :title="'Контакты ' + vacancy.name"
                    :visible.sync="contactsVisible"
                    width="30%"
            >
                <p>Телефон: <a href="tel: +7 777 777 77 77">+7 778 213 45 67</a></p>
                <p>Почта: <a href="mailto: info@letswork.kz">info@letswork.kz</a></p>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'vacancy-item',
        props: {
            vacancyId: Number,
            type: String
        },
        data() {
            return {
                dialogVisible: false,
                contactsVisible: false,
            }
        },
        computed: {
            vacancy(){
                return this.$store.getters.getVacancyById(this.vacancyId)
            },
            isLogged() {
                return this.$store.state.isLogged
            }
        },
        methods: {
            setStatus(val) {
                this.$store.commit('setVacancyStatus', { id: this.vacancy.id, val: val } )
            }
        }
    }
</script>