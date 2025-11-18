<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="confetki">
          <div v-confetti="{ particleCount: 150, force: 0.35, stageWidth: 2100 }" />
        </div>
        <div class="modal-avatar">
          <slot name="avatar"></slot>
        </div>

        <div class="modal-body">
          <slot name="body"></slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
          </slot>
          <button
            class="modal-default-button"
            @click="$emit('close')"
          >Закрыть</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { vConfetti } from '@neoconfetti/vue';
const props = defineProps({
  show: Boolean
})
</script>


<style lang="scss" scoped>
.confetki {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 10px;
  text-align: center;
  pointer-events: none;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: auto;
  padding: 15px 30px;
  background-color: #3f4d45;
  border-radius: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  text-align: center;
  gap: 16px;
}

.modal-body {
  font-weight: 800;
}

.modal-footer {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.modal-default-button {
  margin: auto;
  width: 50%;
  border-radius: 20px;
  margin-top: 16px;
  border: none;
  transition: 0.2s linear;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    filter: brightness(0.7);
  }
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>