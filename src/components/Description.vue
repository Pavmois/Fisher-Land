<template>
  <div class="monitor">
    <h1>Всем привет, это мой сайт</h1>

    <div class="vid">

    </div>

    <div class="stream">
      <div class="back"></div>
      <video class="video" autoplay muted playsinline loop>
        <source src="/src/assets/1.mp4" type="video/mp4" />
      </video>
    </div>

    <!-- <div class="stream-mobile">
      <div class="back2"></div>
      <video class="video-mobile" autoplay muted playsinline loop>
        <source src="/src/assets/mobile.mp4" type="video/mp4" />
      </video>
    </div> -->


  </div>
</template>

<style lang="scss" scoped>
h1 {
  margin-bottom: 50px;
}
.monitor {
  position: relative;
  margin-top: 50px;
}
.stream {
  display: grid;
  border: 1px solid red;
  place-items: center;
  .back {
    background-image: url('/src/assets/monitor.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    width: 100%;
    height: 700px;
  }
  .video {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -70%);
    height: 390px;
  }
}
.stream-mobile {
  position: relative;
  display: grid;
  place-items: center;
  height: 600px;
  overflow: hidden;
  .back2 {
    background-image: url('/src/assets/mobile.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    width: 320px;
    z-index: 2;
  }
  .video-mobile {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 290px;
  }

}
@media screen and (min-width: 900px) {
  .stream-mobile {
    display: none;
  }
}
@media screen and (max-width: 900px) {
  .stream {
    display: none;
  }
}
</style>