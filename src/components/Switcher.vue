<template>
  <div class="switcher">
    <button @click="bookOn">Книга</button>
    <button @click="bookOff">Галерея</button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

const emit = defineEmits(['showBook']);

const bookOn = () => {
  emit('showBook', true);
};
const bookOff = () => {
  emit('showBook', false);
};
</script>

<style lang="scss" scoped>
.switcher {
  margin: auto;
  margin-bottom: 15px;
  width: 300px;
  display: flex;
  justify-content: space-between;
  button {
    background: transparent;
    outline: none;
    border: 1px solid rgb(88, 88, 88);
    height: 100%;
    width: 45%;
    border-radius: 20px;
    color: white;
    padding: 4px 0;
    cursor: pointer;
    transition: all 0.35s linear;
    &:hover {
      background: rgb(88, 88, 88);
    }
  }
}
</style>
