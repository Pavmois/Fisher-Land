<template>
  <div class="main-menu" :class="{ open: isOpen }">
    <button class="menu-btn" @click="toggleMenu">{{ buttonText }}</button>
    <div class="menu-list">
      <div v-if="showIcons" class="icon-container"  @click="changeState">
        <router-link
          v-for="(icon, index) in currentIcons"
          :key="index"
          :to="icon.to"
          class="icon"
          :class="icon.class"
          :title="icon.alt"
        >
          <img :src="icon.src" :alt="icon.alt" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const isOpen = ref(false);
const buttonText = ref('Menu');
const showIcons = ref(false);

const toggleMenu = () => {
  updateCurrentIcons();
  changeState();
};

const changeState = () => {
  isOpen.value = !isOpen.value;
  showIcons.value = !showIcons.value;
  buttonText.value = isOpen.value ? 'Close' : 'Menu';
}

const icons = [
  { to: '/', src: '/src/assets/home.svg', alt: 'Главная', class: '' },
  { to: '/wheel', src: '/src/assets/wheel.png', alt: 'Колесо Бусти', class: 'wheel' },
  { to: '/info', src: '/src/assets/info.svg', alt: 'Информация', class: '' }
];

const currentIcons = ref(icons.filter(icon => icon.to !== window.location.pathname));

const updateCurrentIcons = () => {
  currentIcons.value = icons.filter(icon => icon.to !== window.location.pathname);
};

watch(() => window.location.pathname, updateCurrentIcons);
</script>

<style lang="scss" scoped>
.main-menu {
  position: fixed;
  display: flex;
  justify-content: end;
  right: 0px;
  top: 0;
  z-index: 999;
  transition: 0.1s all linear;
  color: white;
  border-bottom-left-radius: 20px;
  transform: translateX(80px);
  animation: slideClose 0.4s forwards;

  &.open {
    animation: slideOpen 0.4s forwards;
  }

  .menu-btn {
    position: relative;
    width: 80px;
    height: 40px;
    outline: none;
    border: none;
    border-bottom-left-radius: 20px;
    background: rgba(255, 255, 255, 0.4);
    -webkit-backdrop-filter: blur(7px);
    backdrop-filter: blur(7px);
    -webkit-tap-highlight-color: transparent;
    color: white;
    font-weight: 800;
    font-size: 18px;
    transition: 0.2s all linear;
    cursor: pointer;
    &:hover {
      background: rgba(255, 255, 255, 0.5);
      color: rgb(0, 0, 0);
    }
  }

  .menu-list {
    display: flex;
    padding: 10px 0;
    width: 80px;
    border-bottom-left-radius: 20px;
    background: rgba(255, 255, 255, 0.7);
    -webkit-backdrop-filter: blur(7px);
    backdrop-filter: blur(7px);
  }
}

.icon-container {
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: 10px;
}

.icon {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.2s linear;
}

.wheel {
  &:hover{
    animation: rotate 2s linear infinite;
  }
}

.icon img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: white;
}

@keyframes slideOpen {
  0% {
    transform: translateX(80px);
  }
  50% {
    transform: translateX(120px);
  }
  100% {
    transform: translateX(0px);
  }
}

@keyframes slideClose {
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(120px);
  }
  100% {
    transform: translateX(80px);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1440deg);
  }
}
</style>