<template>
  <div class="menu">
    <div class="menu-wrapper">
      <button @click="showIcons = !showIcons" class="round-button">Menu</button>
      <transition name="fade">
        <div v-if="showIcons" class="icon-container" @click="showIcons = !showIcons">
          <router-link to="/" class="icon">
            <img src="/src/assets/home.png" alt="Home" />
          </router-link>
          <router-link to="/wheel" class="icon wheel">
            <img src="/src/assets/wheel.png" alt="Wheel" />
          </router-link>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showIcons = ref(false);
</script>

<style lang="scss" scoped>
.menu {
  position: sticky;
  display: flex;
  justify-content: end;
  right: 12px;
  bottom: 12px;
  z-index: 999;
}
.menu-wrapper {
  position: relative;
  margin-right: 25px;
}

.round-button {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-color: #ffffff;
  color: black;
  border: none;
  cursor: pointer;
}

.icon-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: -20%;
  left: 50%;
  transform: translate(-50%, -100%);
  display: flex;
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
}

/* Анимация для плавного появления и исчезновения */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active в <2.1.8 */ {
  opacity: 0;
}

/* Добавим задержку для появления иконок */
.fade-enter {
  opacity: 0;
  transition: opacity 0.3s ease;
}
.fade-enter-to {
  opacity: 1;
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