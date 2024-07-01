<template>
  <div class="monitor">
    <div class="desc">
      Так же есть нарезки стримов в Youtube Shorts.
    </div>

    <div class="vid">
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
  flex-direction: row-reverse;
  justify-content: space-between;
}
.vid {
  position: relative;
  display: grid;
  place-items: center;
  width: 50%;
}
.stream-mobile {
  position: relative;
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


@media screen and (max-width: 1200px) {
  .monitor {
    flex-direction: column;
  }
  .vid {
    margin: auto;
    width: auto;
    margin-top: 50px;
  }
}
</style>