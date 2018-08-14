<template>
    <div class="px-0 py-5 px-md-5">
        <div class="d-flex profile-info align-items-start mb-5">
            <div class="mr-3 mr-md-5">
                <div class="image-container">
                    <div class="profile-image" :style="{backgroundImage: `url(${user.image})`}"></div>
                </div>
            </div>
            <div>
                <div class="d-flex align-items-center mb-3">
                    <template v-if="!editing">
                        <h2 class="mr-3" v-if="user.name">{{user.name}}</h2>
                        <h2 class="mr-3" v-if="!user.name">Имя не указано</h2>
                    </template>
                    <template v-if="editing">
                        <el-input v-model="user.name" placeholder="Введите ваше имя"></el-input>
                    </template>
                    <el-rate
                            v-if="!editing"
                            class="text-nowrap"
                            v-model="user.rate"
                            disabled>
                    </el-rate>
                </div>
                <div class="mb-3 icon-text">
                    <template v-if="user.phone && !editing">
                        <a :href="`tel: ${user.phone}`">
                            <i class="fa fa-mobile-alt mr-2"></i> {{user.phone}}
                        </a>
                    </template>
                    <template v-if="!user.phone && !editing">
                        <i class="fa fa-mobile-alt mr-2"></i> Телефон не указан
                    </template>
                    <template v-if="editing">
                        <el-input prefix-icon="fa fa-mobile-alt" v-model="user.phone" v-mask="'+7(7##)###-##-##'" placeholder="Ваш номер телефона"></el-input>
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
        </div>
        <div class="py-5">
            <h3>Обо мне</h3>
            <template v-if="!editing">
                <p v-if="user.description">
                    {{user.description}}
                </p>
                <p v-if="!user.description" style="cursor: pointer;">
                    Введите данные о себе
                </p>
            </template>
            <template v-if="editing">
                <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="Введите данные о себе"
                        v-model="user.description">
                </el-input>
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
                editing: false,
                handleAvatarSuccess(res, file) {
                    this.user.image = URL.createObjectURL(file.raw);
                },
                beforeAvatarUpload(file) {
                    const isJPG = file.type === 'image/jpeg';
                    const isLt2M = file.size / 1024 / 1024 < 2;

                    if (!isJPG) {
                        this.$message.error('Изображение должно быть в JPG!');
                    }
                    if (!isLt2M) {
                        this.$message.error('Изображение не должно превышать 2MB!');
                    }
                    return isJPG && isLt2M;
                }
            }
        },
        computed: {
            user() {
                return this.$store.getters[USER_PROFILE + 'getProfile']
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