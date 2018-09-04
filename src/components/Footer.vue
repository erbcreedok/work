<template>
    <footer>
        <div class="container">
            <div class="d-flex justify-content-between py-5">
                <div class="" style="max-width: 300px">
                    <h3>
                        Love2Work
                    </h3>
                    <p style="font-size: 10px" class="my-4">
                        Love2Work - это платформа, которая объединяет компании и талантливую молодежь, которая находится в поиске работы, стажировки, чтобы получить тот самый опыт, который им потребуется
                    </p>
                    <p style="font-size: 10px" class="my-4">
                        Almaty 2018 © Все права защищены
                    </p>
                </div>
                <div class="socials" style="max-width: 300px">
                    <a href="tel: +77083330201"> +7 708 333-02-01</a>
                    <a href="mailto: alibek.adilbekov@gmail.com">alibek.adilbekov@gmail.com</a>
                    <a href="http://facebook.com">Facebook</a>
                    <a href="http://instagram.com">Instagram</a>
                    <a href="http://vk.com">VK</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: 'Footer'
    }
</script>

<style scoped lang="scss">
    footer {
        background: #2a3036;
        color: white;
    }
    .socials {
        a {
            display: block;
            margin: 10px 0;
            font-size: 12px;
            color: white;
        }
    }
</style>