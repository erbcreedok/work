<template>
  <div class="home">
    <section class="main-section">
      <div class="video-bg" :style="{backgroundImage: `url(${ imageBGSrc })`}">
        <progressive-img
                :src="imageBGHD"
                :placeholder="imageBGThumb"
        ></progressive-img>
      </div>
      <div class="container">
        <div class="d-flex flex-column align-items-center justify-content-center" style="min-height: 100vh;  padding: 120px 0">
          <h1 class="mb-5" style="font-size: 3em">Love2Work - Таланты и деньги в одном месте!</h1>
          <div class="d-flex justify-content-center my-5 flex-wrap">
            <router-link tag="div" to="/login"><el-button class="d-block mx-5 my-md-0 my-4" style="min-width: 200px; font-size: 1.4em" type="primary">Найти работу</el-button></router-link>
            <router-link tag="div" to="/login-company"><el-button class="d-block mx-5 my-md-0 my-4" style="min-width: 200px; font-size: 1.4em" type="success">Найти работника</el-button></router-link>
          </div>
          <div class="d-flex justify-content-around align-items-center logos w-100 mt-5 flex-wrap">
            <div>
              <img src="https://static.mailchimp.com/web/brand-assets/logo-script-light.svg" alt=""/>
            </div>
            <div>
              <img src="https://www.mysmartgroup.co.uk/wp-content/uploads/2017/12/1-2-dell-logo-3d-white-png.png" alt=""/>
            </div>
            <div>
              <img src="https://inspiredbusinessmedia.co.uk/wp-content/uploads/2016/03/logo-virgin.png" alt=""/>
            </div>
            <div>
              <img src="https://skillsforchange.org/wp-content/uploads/2017/12/Ontario-logo-Rev-trans.png" alt=""/>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-white">
      <div class="container">
        <div class="d-flex flex-column align-items-center justify-content-center py-5" style="min-height: 100vh">
          <h2 class="my-5">Что делает Love2Work</h2>
          <div class="my-5 py-5">
            <iframe width="560px" style="max-width: 100%" height="315" src="https://www.youtube.com/embed/bol8uj3tdOQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </div>
          <div class="d-flex justify-content-around my-5 w-100 flex-wrap">
            <div class="text-center mb-5 mb-md-0" style="max-width: 200px">
              <div style="height: 80px; line-height:80px; vertical-align: bottom">
                <img src="https://image.flaticon.com/icons/svg/616/616489.svg" alt="" height="60px" class="mb-4"/>
              </div>
              <p style="font-size: 1.6rem">Мы помогаем лучшим студентам найти свое место под солнцем</p>
            </div>
            <div class="text-center mb-5 mb-md-0" style="max-width: 200px">
              <div style="height: 80px; line-height:80px; vertical-align: bottom">
                <img src="https://image.flaticon.com/icons/svg/838/838615.svg" alt="" height="70px" class="mb-4"/>
              </div>
              <p style="font-size: 1.6rem">Компании нанимают тех, кто им подходит и остаются довольны</p>
            </div>
            <div class="text-center mb-5 mb-md-0" style="max-width: 200px">
              <div style="height: 80px; line-height:80px; vertical-align: bottom">
                <img src="https://image.flaticon.com/icons/svg/744/744422.svg" alt="" height="60px" class="mb-4">
              </div>
              <p style="font-size: 1.6rem">На нашем сайте вы пройдете уникальный тест профориентации</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-white" style="overflow: auto; position: relative">
      <!--<div class="ocean">-->
        <!--<div class="wave"></div>-->
        <!--<div class="wave"></div>-->
      <!--</div>-->
      <div class="d-flex flex-column align-items-center justify-content-center mt-5 py-5" style="position: relative">
        <h2 class="mb-4">Вы готовы работать?</h2>
        <div class="d-flex justify-content-center my-5 flex-wrap">
          <router-link tag="div" to="/login"><el-button class="d-block mx-5 mb-4 mb-md-0" style="min-width: 200px" type="primary">Найти работу</el-button></router-link>
          <router-link tag="div" to="/vacancies"><el-button class="d-block mx-5 mb-4 mb-md-0" style="min-width: 200px" type="danger">Все вакансии</el-button></router-link>
          <router-link tag="div" to="/login-company"><el-button class="d-block mx-5 mb-4 mb-md-0" style="min-width: 200px" type="success">Найти работника</el-button></router-link>
        </div>
      </div>
    </section>
    <router-view></router-view>
  </div>
</template>

<script>
import imageBGThumb from '../assets/images/bg@.5x.jpg'
import imageBGSrc from '../assets/images/bg@1x.jpg'
import imageBGHD from '../assets/images/bg@2x.jpg'
import Vue from 'vue'
import VueProgressiveImage from 'vue-progressive-image'

Vue.use(VueProgressiveImage)

export default {
  name: 'home',
  data() {
      return {
          imageBGThumb: imageBGThumb,
          imageBGSrc: imageBGSrc,
          imageBGHD: imageBGHD,
      }
  },
  methods: {
      isLogged() {
          return this.$store.getters['auth/isLogged']
      },
  },
  components: {
  },
  beforeMount() {
      // Временный обход security роутинга, для зарегестрированных пользователей
      if (this.$store.getters['auth/isLogged']) {
          this.$router.push('/profile')
      }
  }
}
</script>

<style scoped lang="scss">
  .main-section {
    position: relative;
    overflow: hidden;
    margin-top: -65px;
    .logos {
      filter: saturate(0);
      opacity: .8;
      div {
        margin: 0 20px;
      }
      img {
        max-width: 200px;
        max-height: 80px;
      }
    }
    .video-bg {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      min-width: 100vw;
      min-height: 100vh;
      background-size: cover;
      z-index:-1;
      &:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        background: rgba(0,0,0,.5);
        z-index: 2;
      }
      &:after {
        z-index: 3;
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        background-repeat: repeat;
        background-position: 50%;
        opacity: .5;
      }
    }
    .video-bg video {
      position: absolute;
      bottom: 0;
      left: 0;
      min-height: 100vh;
      min-width: 100vw;
      right: 0;
      top: 0;
    }
    .container {
      position: relative;
      z-index: 4;
      color: white;
    }
    h1 {
      font-weight: bold;
    }
  }
  .circle {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    box-shadow: 0 5px 10px rgba(0,0,0,.1);
    margin: 10px auto 20px;
    color: white;
    line-height: 60px;
    text-align: center;
    font-size: 30px;
  }
  .ocean {
    height: 5%;
    width:100%;
    position:absolute;
    bottom:0;
    left:0;
    background: #015871;
  }

  .wave {
    background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/85486/wave.svg) repeat-x;
    position: absolute;
    top: -198px;
    width: 6400px;
    height: 198px;
    animation: wave 7s cubic-bezier( 0.36, 0.45, 0.63, 0.53) infinite;
    transform: translate3d(0, 0, 0);
  }

  .wave:nth-of-type(2) {
    top: -175px;
    animation: wave 7s cubic-bezier( 0.36, 0.45, 0.63, 0.53) -.125s infinite, swell 7s ease -1.25s infinite;
    opacity: 1;
  }

  @keyframes wave {
    0% {
      margin-left: 0;
    }
    100% {
      margin-left: -1600px;
    }
  }

  @keyframes swell {
    0%, 100% {
      transform: translate3d(0,-25px,0);
    }
    50% {
      transform: translate3d(0,5px,0);
    }
  }

  h2 {
    font-size: 3rem;
  }
</style>
