<template>
  <div class="gallery-wrapper">
    <swiper
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="'auto'"
      
      :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="(page, index) in pages" :key="index">
        <img :src="page" alt="Image description"/>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { EffectCoverflow, Pagination } from 'swiper/modules';

  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/effect-coverflow';
  import 'swiper/css/pagination';

  // Картинки галереи

  import img1 from "../assets/cosplay/1.jpg";
  import img2 from "../assets/cosplay/2.jpg";
  import img3 from "../assets/cosplay/3.jpg";
  import img4 from "../assets/cosplay/4.jpg";
  import img5 from "../assets/cosplay/5.jpg";
  import img6 from "../assets/cosplay/6.jpg";
  import img7 from "../assets/cosplay/7.jpg";
  import img8 from "../assets/cosplay/8.jpg";
  import img9 from "../assets/cosplay/9.jpg";
  import img10 from "../assets/cosplay/10.jpg";
  import img11 from "../assets/cosplay/11.jpg";
  import img12 from "../assets/cosplay/12.jpg";
  import img13 from "../assets/cosplay/13.jpg";
  import img14 from "../assets/cosplay/14.jpg";
  import img15 from "../assets/cosplay/15.jpg";

  const modules = [EffectCoverflow, Pagination];

// Массив изображений для модуля Flipbook
  const pages = [
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
  ];
</script>

<style lang="scss" scoped>
  .gallery-wrapper {
    position: relative;
    margin: auto;

    .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 400px;
      height: 400px;
      padding: 10px 0;
      @media screen and (max-width: 600px) {
        width: 300px;
        height: 300px;
      }
    }
    .swiper-slide img {
      display: block;
      width: 100%;
      user-select: none;
      border: 2px solid rgb(88, 88, 88);
      border-radius: 10%;
    }
  }
</style>
