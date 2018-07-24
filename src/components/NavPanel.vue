<template>
    <el-aside width="auto">
        <el-menu class="py-5" style="height: 100%" :collapse="false" default-active="1" :router="true" v-if="isLogged===1">
            <el-menu-item index="/profile">
                <i class="fa fa-user"></i> <span slot="title">Мой профиль</span>
            </el-menu-item>
            <el-menu-item index="/profile/request">
                <i class="fa fa-bell"></i> <span slot="title">Мои заявки</span>
            </el-menu-item>
            <el-menu-item index="/profile/settings">
                <i class="fa fa-cogs"></i> <span slot="title">Настройки</span>
            </el-menu-item>
        </el-menu>
        <el-menu class="py-5" style="height: 100%" :collapse="false" default-active="1" :router="true" v-if="isLogged===2">
            <el-menu-item index="/profile">
                <i class="fa fa-user"></i> <span slot="title">Профиль</span>
            </el-menu-item>
            <el-menu-item index="/profile/workers">
                <i class="fa fa-search"></i> <span slot="title">Найти работника</span>
            </el-menu-item>
            <el-menu-item index="/profile/request">
                <i class="fa fa-bell"></i> <span slot="title">Найти заявки</span>
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

<style scoped="">
    i.fa, i.fab {
        display: inline-block;
        width: 25px;
        margin: 0 5px;
        text-align: center;
    }
</style>

<script>
    export default {
        computed: {
            isLogged() {
                return this.$store.state.isLogged
            }
        }
    }
</script>