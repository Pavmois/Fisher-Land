<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <video v-if="isDesktop" autoplay muted playsinline loop id="myVideo">
      <source src="/src/assets/desktop.mp4" type="video/mp4" />
    </video>
    <video v-else autoplay muted playsinline loop preload="metadata" id="myVideo">
      <source src="/src/assets/mobile.mp4" type="video/mp4" />
    </video>
    <div class="arrow-down">
      Scroll down
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-down">
        <line x1="12" y1="0" x2="12" y2="19"></line>
        <polyline points="19 12 12 19 5 12"></polyline>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
defineProps<{ msg: string }>()
let isDesktop = ref(false);

onMounted(() => {
  const handleResize = () => {
    isDesktop.value = window.innerWidth >= 600;
  };

  handleResize();

  window.addEventListener("resize", handleResize);
});
</script>

<style lang="scss" scoped>
.hello {
  position: relative;
  margin: auto;
}

video {
  width: 100vw;
  filter: brightness(0.5);
}

h1 {
  position: absolute;
  left: 50%;
  top: 10%;
  z-index: 1;
  white-space: nowrap;
  transform: translate(-50%, 0%);
}

.arrow-down {
  position: absolute;
  display: flex;
  align-items: end;
  height: 85%;
  gap: 8px;
  left: 50%;
  transform: translateX(-50%);
  top: 0%;
  svg {
    animation: moveArrow 1s infinite alternate;
  }
  @media screen and (max-width: 600px) {
    height: 18%;
  }
}

@keyframes moveArrow {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(10px);
  }
}
</style>
