<template>
    <div class="unconfirmed-block text-center py-5">
        <p class="my-3">
            <i class="fas fa-ghost" style=""></i><br/>
            <em style="opacity: .4; font-size: 8rem">404</em>
        </p>
        <p class="mb-3">Упс... Данной страницы не существует</p>
        <router-link to="/">
            Вернуться назад
        </router-link>
    </div>
</template>

<style lang="scss" scoped>
    .unconfirmed-block {
        color: #989898;
        background-color: #f5f5f5;
        border-radius: 10px;
        padding: 40px 20px;
    }
    i {
        font-size: 10rem;
        opacity: .3;
        animation: animate-opacity 6s ease-in-out infinite;
    }
    @keyframes animate-opacity {
        0%, 35%, 70%, 100% {
            opacity: .3;
        }
        15%, 18%, 85%, 88% {
            opacity: .1;
        }
        55% {
            opacity: .2;
        }
        16.5%, 86.5% {
            opacity: .08;
        }
    }
</style>