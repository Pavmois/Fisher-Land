<template>
  <div class="footer">
    <div class="footer-wrapper">
      <div class="copyrights">DAVIDFISHER.RU<br/> © 2024 All rights reserve</div>
      <div class="links">
        <a href="https://www.twitch.tv/davldflsher" style="filter: invert(1);" target="_blank">
          <img src="/src/assets/twitch-icon.png">
        </a>
        <a href="https://www.youtube.com/c/TheSimpleHugh" target="_blank">
          <img src="/src/assets/yotube-icon.png">
        </a>
        <a href="https://boosty.to/davidfisher" target="_blank">
          <img src="/src/assets/boosty-icon2.png" style="filter: invert(1);">
        </a>
        <a href="https://vk.com/davidfisherteam" target="_blank">
          <img src="/src/assets/vk-icon.png" style="filter: invert(1);">
        </a>
        <a href="https://t.me/DavidFisherPublic" target="_blank">
          <img src="/src/assets/tg-icon.png">
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .footer {
    width: 100%;
    margin-top: 50px;
    background-color: rgba(63, 65, 65, 0.5);
    border-top: 1px solid rgb(88, 88, 88);
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    &-wrapper {
      display: flex;
      justify-content: space-around;
      padding: 20px;
      font-size: 1.5rem;
      text-align: left;
      line-height: 1.7rem;
    }
    .links {
      display: flex;
      gap: 30px;
      a {
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
    }
    @media screen and (max-width: 700px) {
      &-wrapper {
        justify-content: space-between;
      }
      .links {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(3, 1fr);
      }
    }
    @media screen and (max-width: 500px) {
      &-wrapper {
        flex-direction: column-reverse;
      }
      .links {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        a {
          img {
            width: 40px;
            height: 40px;
          }
        }
      }
      .copyrights {
        font-size: 1rem;
      }
    }
  }
</style>