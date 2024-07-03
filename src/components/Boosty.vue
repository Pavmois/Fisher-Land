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
    background-image: url('/src/assets/tablet.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    width: 100%;
    height: 475px;
    filter: invert(1);
  }
  .video {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    width: 90%;
    height: auto;
  }
}

@media screen and (min-width: 1900px) {
  .stream {
    .video {
      left: 50%;
      transform: translate(-49.6%, -50%);
      width: 100%;
      height: 400px;
    }
  }
}

@media screen and (max-width: 1200px) {
  .boosty {
    flex-direction: column;
  }
  .video-block {
    margin: auto;
    width: 70%;
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