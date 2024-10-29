<template>
  <router-view />
  <Menu/>
  <Footer />
</template>

<script setup lang="ts">
import Footer from './components/Footer.vue'
import Menu from './components/Menu.vue'
</script>