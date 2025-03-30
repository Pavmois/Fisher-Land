<template>
  <div class="info-wrapper">
    <Divider :text="'Алерты'"/>
    <Donations/>
    <Divider :text="'Сборка'"/>
    <Composables/>    
  </div>
</template>

<script setup lang="ts">
import Donations from '../components/info/Donations.vue'
import Composables from '../components/info/Composables.vue'
import Divider from '../components/Divider.vue'
</script>

<style lang="scss" scoped>
.info-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 90vh;
}
</style>