<template>
  <div class="switcher">
    <button @click="bookOn" :class="{ active: activeBtn }">Книга</button>
    <button @click="bookOff" :class="{ active: !activeBtn }">Галерея</button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, onMounted, ref  } from 'vue';

onMounted(() => {
  bookOn();
});

const emit = defineEmits(['showBook']);
const activeBtn = ref(true);

const bookOn = () => {
  emit('showBook', true);
  activeBtn.value = true;
};
const bookOff = () => {
  emit('showBook', false);
  activeBtn.value = false;
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
  .active {
    background: rgb(88, 88, 88);
  }
}
</style>
