<template>
  <div class="monitor">
    <div class="desc">
      Меня зовут Давид Фишер и я - стример
    </div>

    <div class="vid">
      <div class="stream">
        <div class="back"></div>
        <video class="video" autoplay muted playsinline loop>
          <source src="/src/assets/1.mp4" type="video/mp4" />
        </video>
      </div>
      <div class="stream-mobile">
        <div class="back2"></div>
        <video class="video-mobile" autoplay muted playsinline loop>
          <source src="/src/assets/shorts.mp4" type="video/mp4" />
        </video>
      </div>
    </div>



  </div>
</template>

<style lang="scss" scoped>
h1 {
  margin-bottom: 50px;
}
.desc {
  margin: auto;
  font-size: 2rem;
}
.monitor {
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}
.vid {
  position: relative;
  width: 50%;
}
.stream {
  display: grid;
  place-items: center;
  position: relative;
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
    left: 13%;
    top: 50%;
    transform: translate(0, -70%);
    width: 74%;
    height: auto;
  }
}
.stream-mobile {
  position: relative;
  display: grid;
  place-items: center;
  height: 600px;
  width: 320px;
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
@media screen and (min-width: 1900px) {
  .stream {
    .video {
      left: 50%;
      transform: translate(-50%, -70%);
      width: 100%;
      height: 390px;
    }
  }
}
@media screen and (min-width: 1200px) {
  .stream-mobile {
    display: none;
  }
}

@media screen and (max-width: 1200px) {
  .monitor {
    flex-direction: column;
  }
  .stream {
    display: none;
  }
  .vid {
    margin: auto;
    width: auto;
  }
}
</style>