<template>
    <el-aside width="auto">
        <el-menu class="py-0 py-md-5" style="height: 100%" :collapse="false" default-active="1" :router="true" v-if="isLogged===USER">
            <el-menu-item index="/profile">
                <i class="fa fa-user"></i> <span slot="title">Мой профиль</span>
            </el-menu-item>
            <el-menu-item index="/profile/request">
                <i class="fa fa-bell"></i> <span slot="title">Мои заявки <el-badge v-if="incomeRequestCount" :value="incomeRequestCount" style="position: absolute; left: 35px" class="item"></el-badge></span>
            </el-menu-item>
            <el-menu-item index="/profile/settings">
                <i class="fa fa-cogs"></i> <span slot="title">Настройки</span>
            </el-menu-item>
        </el-menu>
        <el-menu class="py-0 py-md-5" style="height: 100%" :collapse="false" default-active="1" :router="true" v-if="isLogged===COMPANY">
            <el-menu-item index="/profile">
                <i class="fa fa-user"></i> <span slot="title">Профиль</span>
            </el-menu-item>
            <el-menu-item index="/profile/workers">
                <i class="fa fa-search"></i> <span slot="title">Найти работника</span>
            </el-menu-item>
            <el-menu-item index="/profile/request">
                <i class="fa fa-bell"></i> <span slot="title">Заявки компании  <el-badge v-if="incomePersonRequestCount" :value="incomePersonRequestCount" style="position: absolute; left: 35px" class="item"></el-badge></span>
            </el-menu-item>
            <el-menu-item index="/profile/settings">
                <i class="fa fa-cogs"></i> <span slot="title">Настройки</span>
            </el-menu-item>
            <el-menu-item index="/profile/premium">
                <i class="fab fa-angellist"></i> <span slot="title">Премиум</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<style scoped="" lang="scss">
    i.fa, i.fab {
        display: inline-block;
        width: 25px;
        margin: 0 5px;
        text-align: center;
    }
</style>

<script>
    import {COMPANY, USER} from "../store/mutation-types";
    export default {
        data() {
            return {
                USER: USER,
                COMPANY: COMPANY
            }
        },
        computed: {
            isLogged() {
                return this.$store.getters['auth/isLogged']
            },
            incomeRequestCount() {
                return this.$store.getters['vacancies/incomeVacancies'].length
            },
            incomePersonRequestCount() {
                return this.$store.getters['people/incomePeople'].length
            }
        }
    }
</script>