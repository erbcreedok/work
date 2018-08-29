<template>
    <div class="px-0 py-5 px-md-5">
        <div class="d-flex profile-info mb-5" v-if="!edit">
            <div class="mr-3 mr-md-5">
                <div class="image-container">
                    <div class="profile-image" :style="{backgroundImage: `url(${user.image})`}"></div>
                </div>
            </div>
            <div>
                <div class="d-flex align-items-center mb-3">
                    <h2 class="mr-3" v-if="user.name">{{user.name}}</h2>
                    <h2 class="mr-3" v-if="!user.name">Имя не указано</h2>
                    <el-rate
                            class="text-nowrap"
                            v-model="user.rate"
                            disabled>
                    </el-rate>
                </div>
                <div class="mb-3 icon-text">
                    <template v-if="user.phone">
                        <a :href="`tel: ${user.phone}`">
                            <i class="fa fa-mobile-alt mr-2"></i> {{user.phone}}
                        </a>
                    </template>
                    <template v-if="!user.phone">
                        <i class="fa fa-mobile-alt mr-2"></i> Телефон не указан
                    </template>
                </div>
                <div class="icon-text">
                    <a :href="`tel: ${user.email}`">
                        <i class="far fa-envelope mr-2"></i> {{user.email}}
                    </a>
                </div>
                <div class="icon-text" v-if="!user.email">
                    <i class="far fa-envelope"></i> Почта не указана
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
                                action="http://letswork.tk:3000/student/private/image-avatar"
                                name="avatar"
                                :headers="{'Authorization': token}"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="user.image" :src="user.image" class="avatar">
                            <i class="el-icon-plus avatar-uploader-icon" v-else></i>
                        </el-upload>
                    </el-tooltip>
                </div>
            </div>
            <div class="mr-5">
                <div class="d-flex align-items-center mb-4">
                    <el-input v-model="user.name" size="medium"></el-input>
                </div>
                <div class="mb-3">
                    <el-input size="mini" class="mb-3" v-model="user.email" placeholder="Почта" disabled=""></el-input>
                    <el-input size="mini" class="mb-3"  v-model="user.phone" placeholder="Номер телефона" v-mask="'+7(7##)### ####'"></el-input>
                </div>
            </div>
            <div>
                <el-button size="mini" icon="el-icon-check" type="success" round @click="saveData">Сохранить</el-button>
            </div>
        </div>
        <div class="py-5" v-loading="loading">
            <h3>Обо мне</h3>
            <template v-if="!edit">
                <p v-if="user.description" v-html="user.description"/>
                <p v-if="!user.description" style="cursor: pointer;">
                    Введите данные о себе
                </p>
            </template>
            <template v-if="edit">
                <wysiwyg v-model="user.description" placeholder="Опишите вашу вакансию"/>
            </template>
        </div>
        <div class="py-5 my-5">
            <h3 class="my-4">Тесты</h3>
            <div class="row flex-column cups" style="height: 400px">
                <div class="col-3 my-4" v-for="(item, index) in [{name: 'Амбиции', percent: 100}, {name: 'Образование', percent: 90},  {name: 'Навыки', percent: 50},  {name: 'Аналитика', percent: 0},  {name: 'Творчество', percent: 30},  {name: 'Критичиское мышление', percent: 30}]" :key="index">
                    <div class="d-flex align-items-end">
                        <coffee-cup class="mr-3" :percents="item.percent"></coffee-cup>
                        <p class="">{{index+1}}. {{item.name}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="py-5 my-5">
            <h3 class="mb-4">Сколько стоит час твоей работы?</h3>
            <div class="box d-inline-block">
                <p style="font-size: 3rem" class="mb-0 d-flex align-items-center"><span class="mr-3">2000</span> <span class="small">₸/час</span></p>
            </div>
        </div>
    </div>
</template>

<script>
    import CoffeeCup from './CoffeeCup.vue'
    import {GET_PROFILE, USER_PROFILE} from "../store/types/userProfile"
    import { mask } from 'vue-the-mask'
    import {AUTH, GET_TOKEN} from "../store/types/auth";
    import api from "../store/api/main";
    import ElInput from "../../node_modules/element-ui/packages/input/src/input";

    export default {
        name: 'user-profile',
        directives: { mask },
        components: {
            ElInput,
            CoffeeCup
        },
        data() {
            return {
                loading: false,
                edit: false
            }
        },
        computed: {
            user() {
                return this.$store.getters[USER_PROFILE + 'getProfile']
            },
            token() {
                return this.$store.getters[AUTH + GET_TOKEN]
            }
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.user.image = URL.createObjectURL(file.raw);
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
                await api.post('student/private/firstName', {firstName: this.user.name})
                await api.post('student/private/phone', {phone: this.user.phone})
                await api.post('student/private/description', {description: this.user.description})
                this.loading = false
                this.edit = false
            }
        },
        mounted() {
            if (this.$store.state.userProfile.status === '') {
                this.$store.dispatch(USER_PROFILE + GET_PROFILE)
            }
        }
    }
</script>

<style scoped="" lang="scss">
    .profile-image {
        width: 120px;
        height: 120px;
        background-size: cover;
        border-radius: 50%;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.18);
    }
    @media (max-width: 768px) {
        .profile-image {
            width: 70px;
            height: 70px;
        }
    }
    .user-rating {
        i {
            color: #e09e1b;
        }
    }
    .profile-info {
        .icon-text {
            color: #6f7175;
            font-size: 16px;
            transition: .3s;
            line-height: 26px;
            i {
                font-size: 20px;
                display: inline-block;
                width: 25px;
                margin: 0 5px;
                text-align: center;
            }
        }
        a {
            color: inherit;
        }
        a:hover {
            text-decoration: none;
            color: #39517a;
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
    .avatar-uploader {
        border-radius: 6px;
        cursor: pointer;
        border: 1px dashed #d9d9d9;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 118px;
        height: 118px;
        display: block;
    }
</style>