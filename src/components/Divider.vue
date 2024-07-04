<template>
  <div class="divider">
    <h2>
      {{ props.text }}
    </h2>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true
  }
});
</script>

<style lang="scss" scoped>
.divider {
  margin: auto;
  margin-bottom: 25px;
  width: 550px;
  border-bottom: 1.5px solid rgb(88, 88, 88);
  border-bottom-left-radius: 13px;
  border-bottom-right-radius: 13px;
  @media screen and (max-width: 600px) {
    width: 250px;
    border-top: none;
  }
}
</style>