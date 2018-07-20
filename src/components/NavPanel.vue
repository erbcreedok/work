<template>
    <el-aside width="auto">
        <el-menu class="py-5" style="height: 100%" :collapse="false" default-active="1" :router="true">
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
    </el-aside>
</template>

<style scoped="">
    i.fa {
        display: inline-block;
        width: 25px;
        margin: 0 5px;
        text-align: center;
    }
</style>