<template>
    <div>
        <div class="row align-items-center py-3">
            <div class="company-profile col-md-2 col-2">
                <div class="image-container w-100">
                    <img :src="person.image.src" alt="" width="100%">
                </div>
            </div>
            <div class="col-7">
                <h3 class="mb-4">{{person.name}}</h3>
                <p class="mb-3" v-html="person.speciality"></p>
                <p class="mb-3" v-html="'Вакансия: ' + person.vacancy"></p>
            </div>
            <div class="col-3 d-flex align-items-center" v-if="isLogged !== 2">
                <el-button v-if="action === 'contacts'" type="primary" @click="dialogVisible = true">Контакты</el-button>
            </div>
            <div class="col-3 d-flex align-items-center flex-column justify-content-center" v-if="isLogged === 2">
                <el-button-group
                        v-if="person.status === 'income'"
                        class="w-100 mb-3"
                >
                    <el-tooltip class="item" effect="dark" content="Принять" placement="left">
                        <el-button type="success" class="w-50" icon="el-icon-check" size="small" @click="setStatus('accept')"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="Отказать" placement="right">
                        <el-button type="danger" class="w-50" icon="el-icon-delete" size="small" @click="setStatus('decline')"></el-button>
                    </el-tooltip>
                </el-button-group>
                <el-button class="mb-3 ml-0 w-100"
                           type="danger"
                           size="small"
                           @click="setStatus('')"
                           v-if="person.status === 'outcome'" >Отменить</el-button>
                <el-button class="mb-3 ml-0 w-100"
                           type="warning"
                           size="small"
                           @click="setStatus('income')"
                           v-if="person.status === 'accept'" >Отменить</el-button>
                <el-button class="mb-3 ml-0 w-100"
                           type="warning"
                           size="small"
                           @click="setStatus('')"
                           v-if="person.status === 'decline'" >Убрать</el-button>
                <el-button class="mb-3 ml-0 w-100"
                           type="primary"
                           size="small"
                           @click="setStatus('outcome')"
                           v-if="person.status === ''" >Подать заявку</el-button>
                <el-button class="mb-3 ml-0 w-100"
                           size="small"
                           @click="dialogVisible = true" >Контакты</el-button>
            </div>
            <el-dialog
                    title="Контакты"
                    :visible.sync="dialogVisible"
                    width="30%"
                >
                <p>Телефон: <a :href="'tel:'  +  person.phone">{{person.phone}}</a></p>
                <p>Почта: <a :href="'mailto:'  +  person.mail">{{person.mail}}</a></p>

            </el-dialog>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'person-item',
        props: {
            personId: Number,
        },
        data() {
            return {
                dialogVisible: false,
            }
        },
        computed: {
            person() {
                return this.$store.getters.getPersonById(this.personId)
            },
            isLogged() {
                return this.$store.state.isLogged
            }
        },
        methods: {
            setStatus(val) {
                this.$store.commit('setPersonStatus', { id: this.person.id, val: val } )
            }
        }
    }
</script>