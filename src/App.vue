<template>
  <router-view />
  <Animenu/>
  <Footer />
  <vue3-snackbar top start dense :duration="4000"></vue3-snackbar>
</template>

<script setup lang="ts">
import Footer from './components/Footer.vue'
import Animenu from './components/Animenu.vue'
import { Vue3Snackbar } from "vue3-snackbar";
</script>