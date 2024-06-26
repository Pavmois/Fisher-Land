<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="overlay"></div>
    <video v-if="isDesktop" autoplay muted playsinline loop id="myVideo">
      <source src="/src/assets/desktop.mp4" type="video/mp4" />
    </video>
    <video v-else autoplay muted playsinline loop preload="metadata" id="myVideo">
      <source src="/src/assets/mobile.mp4" type="video/mp4" />
    </video>
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

  handleResize(); // Set initial value

  window.addEventListener("resize", handleResize);
});
</script>

<style lang="scss" scoped>
.hello {
  position: relative;
  margin: auto;
  background: rgb(43, 45, 56);
  border-bottom: 3px solid rgb(0, 252, 126);
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Чем меньше последнее число, тем меньше затемнение */
}

video {
  width: 100vw;
}

h1 {
  position: absolute;
  left: 50%;
  top: 10%;
  transform: translate(-50%, -50%);
  z-index: 1;
  cursor: pointer;
}
</style>
