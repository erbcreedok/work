<template>
    <div class="px-0 py-5 px-md-5">
        <div class="d-flex profile-info mb-5" v-if="!edit">
            <div class="mr-5">
                <div class="image-container">
                    <div class="profile-image" :style="{backgroundImage: `url(${company.image})`}"></div>
                </div>
            </div>
            <div class="mr-5">
                <div class="d-flex align-items-center mb-3">
                    <h2 class="mr-3">{{company.name}}</h2>
                </div>
                <div class="mb-3">
                    <p>Brand</p>
                    <p v-if="company.email">{{company.email}}</p>
                    <p v-if="company.phone">{{company.phone}}</p>
                </div>
            </div>
            <div>
                <el-button size="mini" icon="el-icon-edit" round @click="startEdit">изменить</el-button>
            </div>
        </div>
        <div class="d-flex profile-info mb-5" v-if="edit" v-loading="loading">
            <div class="mr-5">
                <div class="image-container">
                    <el-tooltip class="item" effect="dark" content="Изменить изображение" placement="top-start">
                        <el-upload
                                class="avatar-uploader"
                                action="http://letswork.tk:3000/company/private/image-avatar"
                                name="avatar"
                                :headers="{'Authorization': token}"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="company.image" :src="company.image" class="avatar">
                            <i class="el-icon-plus avatar-uploader-icon" v-else></i>
                        </el-upload>
                    </el-tooltip>
                </div>
            </div>
            <div class="mr-5">
                <div class="d-flex align-items-center mb-4">
                    <el-input v-model="company.name" size="medium"></el-input>
                </div>
                <div class="mb-3">
                    <el-input size="mini" class="mb-3" v-model="company.email" placeholder="Почта" disabled=""></el-input>
                    <el-input size="mini" class="mb-3"  v-model="company.phone" placeholder="Номер телефона" v-mask="'+7(7##)### ####'"></el-input>
                </div>
            </div>
            <div>
                <el-button size="mini" icon="el-icon-check" type="success" round @click="saveData">Сохранить</el-button>
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
                        <p v-if="vacancy.description" v-html="vacancy.description"></p>
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
    import {COMPANY_PROFILE, GET_PROFILE} from '../store/types/companyProfile'
    import {GET_OWN_VACANCIES, VACANCIES} from "../store/types/vacancies"
    import { mask } from 'vue-the-mask'
    import {AUTH, GET_TOKEN} from "../store/types/auth";
    import api from "../store/api/main";

    export default {
        name: 'company-profile',
        data() {
            return {
                dialogFormVisible: false,
                edit: false,
                loading: false
            }
        },
        components: {
            NewVacancy
        },
        directives: {mask},
        computed: {
            vacancies() {
                return this.$store.getters[VACANCIES + GET_OWN_VACANCIES]// Загрузка списка вакансии из store
            },
            company() {
                return this.$store.getters[COMPANY_PROFILE + 'getProfile']
            },
            token() {
                return this.$store.getters[AUTH + GET_TOKEN]
            }

        },
        methods: {
            loadVacancies() {
                this.$store.dispatch(VACANCIES + GET_OWN_VACANCIES)
            },
            handleAvatarSuccess(res, file) {
                this.company.image = URL.createObjectURL(file.raw);
                this.loading = false
            },
            beforeAvatarUpload(file) {
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isPNG) {
                    this.$message.error('Аватар должен быть в формате PNG!')
                }
                if (!isLt2M) {
                    this.$message.error('Размер файла не должен превышать 2MB!')
                }
                this.loading = isPNG && isLt2M
                return this.loading
            },
            startEdit() {
                this.edit = true
            },
            async saveData() {
                this.loading = true
                await api.post('company/private/name',{name: this.company.name})
                await api.post('company/private/phone',{phone: this.company.phone})
                this.loading = false
                this.edit = false
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