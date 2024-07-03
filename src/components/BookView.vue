<template>
  <div class="book-wrapper">
    <Divider>
      <h2>Образы</h2>
    </Divider>
    <p class="desc">
      Листайте книжку используя кнопки
      <br />
      или переворачивая страницы вручную!
    </p>
    <Flipbook
      class="flipbook"
      :zooms="[1]"
      :pages="pages"
      v-slot="flipbook"
      ref="flipbook"
    >
    </Flipbook>
  </div>
</template>

<script setup>
import Divider from './Divider.vue'
import Flipbook from "flipbook-vue";
import img1 from "../assets/book/1.jpg";
import img2 from "../assets/book/2.jpg";
import img3 from "../assets/book/3.jpg";
import img4 from "../assets/book/4.jpg";
import img5 from "../assets/book/5.jpg";
import img6 from "../assets/book/6.jpg";
import img7 from "../assets/book/7.jpg";
import img8 from "../assets/book/8.jpg";
import img9 from "../assets/book/9.jpg";
import img10 from "../assets/book/10.jpg";
import img11 from "../assets/book/11.jpg";
import img12 from "../assets/book/12.jpg";
import img13 from "../assets/book/13.jpg";
import img14 from "../assets/book/14.jpg";
import img15 from "../assets/book/15.jpg";
import img16 from "../assets/book/16.jpg";
import img17 from "../assets/book/17.jpg";
import img18 from "../assets/book/18.jpg";

// Массив изображений для модуля Flipbook
const pages = [
  null,
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
];
</script>

<style lang="scss" scoped>
.book-wrapper {
  width: 100%;
  margin: auto;
  margin-bottom: 50px;
}
.desc {
  font-size: 24px;
  color: white;
}
.flipbook {
  height: 700px;
  position: relative;
  z-index: 1;
  margin: 0px auto;
  display: flex;
  flex-direction: column-reverse;
  .btn {
    width: 20px;
    height: 20px;
    background-color: aquamarine;
    border-radius: 50%;
  }
  .viewport {
    width: 100%;
    height: 100%;
    margin: auto;
    border: 1px solid aliceblue;
  }
  .flipbook .bounding-box {
    box-shadow: 0 0 20px #000;
  }
}
@media (max-width: 600px) {
  .desc {
    font-size: 18px;
  }
  .flipbook {
    .viewport {
      height: calc(85vh - 150px);
      padding: 0;
    }
  }
}
</style>
