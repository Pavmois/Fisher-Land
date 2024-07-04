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
      <swiper-slide v-for="index in 14" :key="index">
        <img :src="`/src/assets/cosplay/${index}.jpg`"/>
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

  const modules = [EffectCoverflow, Pagination];
</script>

<style lang="scss" scoped>
  .gallery-wrapper {
    position: relative;
    margin: auto;
    .mySwiper {
      height: 100%;
    }
    .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 400px;
      height: 400px;
      @media screen and (max-width: 600px) {
        width: 300px;
        height: 300px;
      }
    }
    .swiper-slide img {
      display: block;
      width: 100%;
      user-select: none;
    }
  }
</style>
