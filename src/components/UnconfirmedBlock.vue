<template>
    <div class="unconfirmed-block text-center my-3">
        <p class="mb-5">
            <i class="fas fa-ghost" style=""></i>
        </p>
        <p class="mb-3">Ваш аккаунт не подтвержден. Для подтверждения аккаунта перейдите по ссылке в письме</p>
        <el-button size="mini" @click="resendVerification" v-loading="resending" v-if="ableToResend">Письмо не пришло</el-button>
    </div>
</template>

<script>
    import {COMPANY, RESEND_VERIFICATION, USER} from "../store/mutation-types";
    import {COMPANY_PROFILE} from "../store/types/companyProfile";
    import {USER_PROFILE} from "../store/types/userProfile";
    export default {
        name: 'unconfirmed-block',
        data() {
            return {
                resending: false,
                ableToResend: true,
            }
        },
        computed: {
            isLogged() {
                return this.$store.getters['auth/isLogged']
            },
            profileStore() {
                if (this.isLogged === COMPANY) return COMPANY_PROFILE
                if (this.isLogged === USER) return USER_PROFILE
                return false
            }
        },
        methods: {
            resendVerification() {
                this.resending = true
                this.$store.dispatch(this.profileStore + RESEND_VERIFICATION).then(() => {
                    this.resending = false
                    this.ableToResend = false
                    setTimeout(() => {
                        this.ableToResend = true
                    }, 60000)
                })
            }
        }
    }
</script>

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