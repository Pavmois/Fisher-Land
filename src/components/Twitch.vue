<template>
  <div class="monitor">
    <div class="desc">
      Меня зовут David Fisher и я - стример на платформе Twitch.<br/>
      Большую часть игр прохожу в тематическом косплее.
    </div>
    <div class="vid">
      <div class="stream">
        <div class="back"></div>
        <video class="video" autoplay muted playsinline loop>
          <source src="/src/assets/1.mp4" type="video/mp4" />
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
    background-image: url('/src/assets/monitor2.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    width: 100%;
    height: 635px;
  }
  .video {
    position: absolute;
    left: 13%;
    top: 50%;
    transform: translate(0, -75%);
    width: 74%;
    height: auto;
  }
}

@media screen and (min-width: 1900px) {
  .stream {
    .video {
      left: 50%;
      transform: translate(-50%, -75%);
      width: 100%;
      height: 390px;
    }
  }
}

@media screen and (max-width: 1200px) {
  .monitor {
    flex-direction: column;
  }
  .vid {
    margin: auto;
    width: 80%;
    margin-top: 50px;
  }
}
</style>