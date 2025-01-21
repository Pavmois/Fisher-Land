<template>
  <div class="boosty">
    <div class="description">
      В первый день каждого месяца я провожу ивент Boosty Day!<br/>
      Любой подписчик Boosty может предложить игру, на стриме<br/>
      крутим колесо удачи со списком всех игр и в 5 выпавших<br/>
      я играю по часу, а если понравится, то прохожу полностью
    </div>
    <div class="video-block">
      <div class="stream">
        <div class="back-border"></div>
        <video class="video" autoplay muted playsinline loop>
          <source src="/src/assets/BoostyDay.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  margin-bottom: 50px;
}
.boosty {
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 50px 0;
}
.video-block {
  position: relative;
  width: 40%;
}
.stream {
  display: grid;
  place-items: center;
  position: relative;
  .back-border {
    background-image: url('/src/assets/monik.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    width: 560px;
    height: 475px;
  }
  .video {
    position: absolute;
    top: 48%;
    transform: translate(0, -76%);
    width: 500px;
    height: auto;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
}

@media screen and (max-width: 1500px) {
  .boosty {
    flex-direction: column;
  }
  .video-block {
    margin: auto;
    width: 70%;
    margin-top: 50px;
  }
}


@media screen and (max-width: 900px) {
  .video-block {
    width: 100%;
  }
}
@media screen and (max-width: 600px) {
  .stream {
    .video {
      width: 380px;
    }
    .back-border {
      width: 90%;
      height: 365px;
    }
  }
}
@media screen and (max-width: 500px) {
  .video-block {
    margin-top: 20px;
  }
  .stream {
    .video {
      width: 330px;
    }
    .back-border {
      height: 315px;
    }
  }
}
@media screen and (max-width: 425px) {
  .stream {
    .video {
      width: 280px;
    }
    .back-border {
      height: 265px;
    }
  }
}
</style>