<template>
    <div class="px-5 py-5">
        <div class="d-flex profile-info align-items-center mb-5">
            <div class="mr-5">
                <div class="image-container">
                    <div class="profile-image" style="background-image: url(https://static.intercomassets.com/avatars/1309094/square_128/lk-1498832667.jpg?1498832667)"></div>
                </div>
            </div>
            <div>
                <div class="d-flex align-items-center mb-3">
                    <h2 class="mr-3">Куаныш Муратов</h2>
                    <div class="user-rating">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                    </div>
                </div>
                <div class="mb-3">
                    <a href="tel: +77788877878">
                        <i class="fa fa-mobile-alt mr-2"></i> +7 (778) 887 7878
                    </a>
                </div>
                <div class="">
                    <a href="mailto: kuanysh.muratov@gmail.com">
                        <i class="far fa-envelope"></i> kuanysh.muratov@gmail.com
                    </a>
                </div>
            </div>
        </div>
        <div class="py-5">
            <h3>Мои данные</h3>
            <p>
                Студент 3-го курса химиобиолгической специальности в КазНУ
            </p>
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

    export default {
        name: 'user-profile',
        components: {
            CoffeeCup
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
</style>