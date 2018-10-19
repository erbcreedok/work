<template>
    <div class="settings-block text-center">
        <p class="mb-5">
            <span class="cogs">
                <i class="fas fa-cog"></i>
                <i class="fas fa-cog"></i>
                <i class="fas fa-cog"></i>
            </span>
        </p>
        <p class="mb-3">Настройки будут доступны в ближайшее время</p>
    </div>
</template>


<style scoped lang="scss">
    .settings-block {
        color: #989898;
        padding: 40px 20px;
    }
    .cogs {
        display: inline-block;
        i {
            opacity: .3;
            display: block;
        }
        i:first-child {
            font-size: 10rem;
            margin-left: -5rem;
            animation: spin 6s infinite linear;
        }
        i:nth-child(2) {
            font-size: 7rem;
            margin-top: -13rem;
            margin-left: 8.8rem;
            animation: spin-back 4.5s infinite linear;
        }
        i:nth-child(3) {
            font-size: 5rem;
            margin-top: 1rem;
            margin-left: 8.7rem;
            animation: spin-back 3s infinite linear;
        }
    }
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @keyframes spin-back {
        from {
            transform: rotate(360deg);
        }
        to {
            transform: rotate(0deg);
        }
    }
</style>