<template>
    <div class="px-5 py-5">
        <div class="d-flex profile-info align-items-center mb-5">
            <div class="mr-5">
                <div class="image-container">
                    <div class="profile-image" :style="{backgroundImage: `url(${'https://www.afisha.uz/ui/catalog/2006/09/0090972.jpg'})`}"></div>
                </div>
            </div>
            <div>
                <div class="d-flex align-items-center mb-3">
                    <h2 class="mr-3">ZARA Clothing</h2>
                </div>
                <div class="mb-3">
                    <p>Brand</p>
                </div>
            </div>
        </div>
        <div class="py-5 my-5">
            <h3 class="mb-5">Наши вакансии</h3>
            <div class="col-12">
                <div class="row my-5 py-4 align-items-center" v-for="vacancy in vacancies" :key="vacancy.id">
                    <div class="col-9">
                        <h3>{{vacancy.name}}</h3>
                        <p>Требования:</p>
                        <ul>
                            <li v-for="(requirement, index) in vacancy.requirements" :key="index">
                                {{requirement}}
                            </li>
                        </ul>
                        <div style="opacity: .5">
                            <p class="mb-2">Занятость: {{vacancy.employment}}</p>
                            <p class="mb-0">Заработная плата: {{vacancy.salary}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'company-profile',
        components: {
        },
        computed: {
            vacancies() {
                return this.$store.state.vacancies // Загрузка списка вакансии из store
            }
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
</style>