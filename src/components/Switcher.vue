<template>
  <div class="switcher">
    <button @click="bookOn" :class="{ active: activeBtn }">Memories</button>
    <button @click="bookOff" :class="{ active: !activeBtn }">Галерея</button>
  </div>
  <div v-if="activeBtn" class="note">
    Потяни за край, будто открываешь книгу<br/>
    или щёлкни справа от картинки
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
    height: 40px;
    width: 47%;
    border-radius: 20px;
    color: white;
    font-size: 16px;
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
.note {
  margin-bottom: 8px;
}
</style>
