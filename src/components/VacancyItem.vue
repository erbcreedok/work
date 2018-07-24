<template>
    <div>
        <div class="row align-items-center">
            <div class="company-profile col-md-3 col-2">
                <div class="image-container w-100">
                    <img :src="vacancy.image.src" alt="" width="100%">
                </div>
            </div>
            <div class="col-7">
                <h3>{{vacancy.name}}</h3>
                <p v-html="vacancy.description"></p>
            </div>
            <div class="col-2 d-flex align-items-center">
                <el-button>Вакансия</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'vacancy-item',
        props: {
            vacancy: Object
        },
        data() {
            return {

            }
        }
    }
</script>