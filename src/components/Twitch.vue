<template>
  <div class="pc">
    <div class="description">
        Меня зовут David Fisher и я - стример на платформе Twitch.<br/>
        Большую часть игр прохожу в тематическом косплее,<br/>
        изготовленном собственоручно. На данный момент <br/> число косплеев
        превышет 60!
    </div>
    <div class="video-block">
      <div class="stream">
        <div class="back-border"></div>
        <video class="video" autoplay muted playsinline loop>
          <source src="/src/assets/Oblivion.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pc {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.video-block {
  position: relative;
  width: 50%;
}
.stream {
  display: grid;
  place-items: center;
  position: relative;
  .back-border {
    background-image: url('/src/assets/monitor.png');
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
  .pc {
    flex-direction: column;
  }
  .video-block {
    margin: auto;
    width: 80%;
    margin-top: 50px;
  }
}

@media screen and (max-width: 1000px) {
  .stream {
    .back-border {
      height: 565px;
    }
  }
}

@media screen and (max-width: 900px) {
  .stream {
    .back-border {
      height: 475px;
    }
  }
}
@media screen and (max-width: 800px) {
  .video-block {
    width: 90%;
  }
  .stream {
    .back-border {
      height: 475px;
    }
  }
}
@media screen and (max-width: 600px) {
  .video-block {
    width: 100%;
  }
  .stream {
    .back-border {
      height: 365px;
    }
  }
}
@media screen and (max-width: 500px) {
  .video-block {
    margin-top: 20px;
  }
  .stream {
    .back-border {
      height: 315px;
    }
  }
}
@media screen and (max-width: 425px) {
  .stream {
    .back-border {
      height: 265px;
    }
  }
}
</style>