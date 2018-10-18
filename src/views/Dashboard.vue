<template>
    <div class="profile">
        <div class="container">
            <el-container>
                <nav-panel class="d-none d-md-block"></nav-panel>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </div>
    </div>
</template>

<script>
    import NavPanel from '../components/NavPanel.vue'
    export default {
        name: 'dashboard',
        components: {
            NavPanel
        },
    }
</script>