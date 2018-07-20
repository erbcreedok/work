<template>
  <div class="home">
    <section class="main-section">
      <div class="video-bg">
      <video loop="" autoplay="" class="l_b_c" data-automation="Hero_heroVideo_video">
        <source src="https://ak.picdn.net/footage/assets/directors_choice/patriotic-stock-videos.webm" type="video/webm"/>
        <source src="https://ak.picdn.net/footage/assets/directors_choice/patriotic-stock-videos.mp4" type="video/mp4"/>
      </video>
      </div>
      <div class="container">
        <div class="d-flex py-5 flex-column align-items-center justify-content-center" style="min-height: 100vh;">
          <h1 class="mb-5">Work - Таланты и деньги в одном месте!</h1>
          <div class="d-flex justify-content-center my-5">
            <el-button class="d-block mx-5" style="min-width: 200px" type="primary">Найти работу</el-button>
            <el-button class="d-block mx-5" style="min-width: 200px" type="success">Найти работника</el-button>
          </div>
          <div class="d-flex justify-content-around align-items-center logos w-100 mt-5">
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
    <section>
      <div class="container">
        <div class="d-flex flex-column align-items-center justify-content-center py-5" style="min-height: 100vh">
          <h2 class="my-5">Что делает Let's Work?</h2>
          <div class="">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/bol8uj3tdOQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </div>
          <div class="d-flex justify-content-around my-5 w-100">
            <div class="text-center" style="max-width: 200px">
              <div class="circle" style="background: #357cb5">
                <i class="el-icon-star-on"></i>
              </div>
              <p>Мы помогаем лучшим студентам найти свое место под солнцем</p>
            </div>
            <div class="text-center" style="max-width: 200px">
              <div class="circle" style="background: #ff7448">
                <i class="el-icon-circle-check-outline"></i>
              </div>
              <p>Компании нанимают тех, кто им подходит и остаются довольны</p>
            </div>
            <div class="text-center" style="max-width: 200px">
              <div class="circle" style="background: #ff2256">
                <i class="el-icon-document"></i>
              </div>
              <p>На нашем сайте вы пройдете уникальный тест профориентации</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="d-flex flex-column align-items-center justify-content-center mt-5 py-5">
        <h2 class="mb-4">Вы готовы работать?</h2>
        <div class="d-flex justify-content-center my-5">
          <el-button class="d-block mx-5" style="min-width: 200px" type="primary">Найти работу</el-button>
          <el-button class="d-block mx-5" style="min-width: 200px" type="success">Найти работника</el-button>
          <el-button class="d-block mx-5" style="min-width: 200px">Все вакансии</el-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {
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
      position: absolute;
      bottom: 0;
      left: 0;
      margin: auto;
      min-height: 50%;
      min-width: 50%;
      right: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
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
        background-image: url(https://blackstarburger.ru/local/templates/bsb/static/image/bg_dots.png);
        background-repeat: repeat;
        background-position: 50%;
        opacity: .5;
      }
    }
    .video-bg video {
      position: absolute;
      bottom: 0;
      left: 0;
      margin: auto;
      min-height: 50%;
      min-width: 50%;
      right: 0;
      top: 0;
      width: 100vw;
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
</style>
