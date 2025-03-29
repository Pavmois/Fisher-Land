<template>
  <router-view />
  <Animenu/>
  <Menu/>
  <Footer />
</template>

<script setup lang="ts">
import Footer from './components/Footer.vue'
import Menu from './components/Menu.vue'
import Animenu from './components/Animenu.vue'
</script>