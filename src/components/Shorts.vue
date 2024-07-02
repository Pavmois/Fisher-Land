<template>
  <div class="mobile">
    <div class="description">
      Записи всех стримов я выкладываю на свой канал Youtube, <br/>
      там же можно найти подборку Shorts с лучшими <br/> моментами стримов
    </div>

    <div class="video-block">
      <div class="stream-mobile">
        <div class="back-border"></div>
        <video class="video-mobile" autoplay muted playsinline loop>
          <source src="/src/assets/shorts2.mp4" type="video/mp4" />
        </video>
      </div>
    </div>



  </div>
</template>

<style lang="scss" scoped>
h1 {
  margin-bottom: 50px;
}
.mobile {
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
.video-block {
  position: relative;
  display: grid;
  place-items: center;
  width: 50%;
}
.stream-mobile {
  position: relative;
  overflow: hidden;
  .back-border {
    background-image: url('/src/assets/mobile.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 590px;
    width: 275px;
    z-index: 2;
  }
  .video-mobile {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 260px;
  }

}

@media screen and (max-width: 1300px) {
  .stream-mobile {
    .back-border {
      height: 475px;
      width: 225px;
    }
    .video-mobile {
      width: 210px;
    }
  }
}


@media screen and (max-width: 1200px) {
  .mobile {
    flex-direction: column;
  }
  .video-block {
    margin: auto;
    width: auto;
    margin-top: 50px;
  }
}
</style>