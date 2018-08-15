<template>
    <div class="px-0 py-5 px-md-5">
        <div class="d-flex profile-info align-items-center mb-5">
            <div class="mr-5">
                <div class="image-container">
                    <div class="profile-image" :style="{backgroundImage: `url(${company.image})`}"></div>
                </div>
            </div>
            <div>
                <div class="d-flex align-items-center mb-3">
                    <h2 class="mr-3">{{company.name}}</h2>
                </div>
                <div class="mb-3">
                    <p>Brand</p>
                </div>
            </div>
        </div>
        <div class="py-5 my-5">
            <div class="d-flex mb-5 align-items-center">
                <h3 class="mr-5">Наши вакансии</h3>
                <el-button size="mini" type="success" round icon="el-icon-circle-plus" @click="dialogFormVisible = true"> Новая вакансия</el-button>
            </div>
            <div class="col-12">
                <div class="row my-5 py-4 align-items-center vacancy-item" style="border-top: 1px solid #efefef" v-for="vacancy in vacancies" :key="vacancy.id">
                    <div class="col-9">
                        <p class="mb-1 small" style="color: #999"> {{ vacancy.vacancyField }}</p>
                        <h3 class="mb-4">{{vacancy.vacancyName}}</h3>
                        <p v-if="vacancy.description">
                            {{ vacancy.description }}
                        </p>
                        <template v-if="vacancy.demands.length > 0">
                            <p>Требования:</p>
                            <ul class="mb-3">
                                <li v-for="(requirement, index) in vacancy.demands" :key="index">
                                    {{requirement}}
                                </li>
                            </ul>
                        </template>
                        <div style="opacity: .5">
                            <p v-if="vacancy.type.length > 0" class="mb-2">Занятость: {{ vacancy.type.join(', ') }}</p>
                            <p class="mb-0">Заработная плата: {{vacancy.minSalary}} - {{vacancy.maxSalary}}</p>
                        </div>
                    </div>
                    <el-tooltip class="item" effect="dark" content="Переместить в архив" placement="left">
                        <el-button type="danger" icon="el-icon-delete" circle></el-button>
                    </el-tooltip>
                </div>
            </div>
        </div>
        <el-dialog title="Новая вакансия" :visible.sync="dialogFormVisible" v-if="dialogFormVisible">
            <new-vacancy @success="dialogFormVisible = false; loadVacancies()" @cancel="dialogFormVisible = false"></new-vacancy>
        </el-dialog>
    </div>
</template>

<script>
    import NewVacancy from './Forms/NewVacancy.vue'
    import {COMPANY_PROFILE, GET_PROFILE} from '../store/types/companyProfile';
    import {GET_OWN_VACANCIES, VACANCIES} from "../store/types/vacancies";
    export default {
        name: 'company-profile',
        data() {
            return {
                dialogFormVisible: false
            }
        },
        components: {
            NewVacancy
        },
        computed: {
            vacancies() {
                return this.$store.getters[VACANCIES + GET_OWN_VACANCIES]// Загрузка списка вакансии из store
            },
            company() {
                return this.$store.getters[COMPANY_PROFILE + 'getProfile']
            }

        },
        methods: {
            loadVacancies() {
                this.$store.dispatch(VACANCIES + GET_OWN_VACANCIES)
            }
        },
        mounted() {
            if (this.$store.state.companyProfile.status === '') {
                this.$store.dispatch(COMPANY_PROFILE + GET_PROFILE)
            }
            this.loadVacancies()
        }
    }
</script>

<style scoped="" lang="scss">
    .profile-image {
        width: 120px;
        height: 120px;
        background-size: contain;
        background-position: center;
        background-repeat: none;
        border-radius: 10px;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.18);
    }
    .user-rating {
        i {
            color: #e09e1b;
        }
    }
    .profile-info {
        a {
            color: #6f7175;
            font-size: 16px;
            transition: .3s;
            line-height: 26px;
            &:hover {
                text-decoration: none;
                color: #39517a;
            }
            i {
                font-size: 20px;
                display: inline-block;
                width: 25px;
                margin: 0 5px;
                text-align: center;
            }
        }
    }
    .box {
        padding: 10px 20px;
        background: white;
        border-radius: 3px;
        box-shadow: 0 3px 15px rgba(0,0,0,.12);
        .small {
            font-size: 0.5em;
            opacity: .5;
        }
    }
    .vacancy-item {
        position: relative;
        button {
            position: absolute;
            top: 20px;
            right: 20px;
            opacity: 0;
            transition: .3s;
        }
        &:hover button {
            opacity: 1;
        }
    }
</style>