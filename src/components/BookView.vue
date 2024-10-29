<template>
  <div class="book-wrapper">
    <Flipbook
      class="flipbook"
      :zooms="[1, 2]"
      :clickToZoom="true"
      :wheel="zoom"
      :gloss="0.3"
      :pages="pages"
      v-slot="flipbook"
      ref="flipbook"
    >
    </Flipbook>
  </div>
</template>

<script setup>
import Flipbook from "flipbook-vue";
import img1 from "../assets/book/1.png";

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

import img18 from "../assets/book/18.png";

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
  img18,
];
</script>

<style lang="scss" scoped>
.book-wrapper {
  width: 100%;
  margin: auto;
  margin-bottom: 50px;
}
.flipbook {
  height: 98dvh;
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

@media (max-width: 800px) {
  .book-wrapper {
    width: 90%;
  }
  .flipbook {
    height: 600px;
  }
}
</style>
