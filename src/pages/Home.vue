<template>
  <HomeVideo :msg="'DAVID FISHER'" />
  <Divider :text="'Обо мне'"/>
  <Twitch/>
  <Shorts/>
  <Boosty/>
  <Divider :text="'Образы'"/>
  <Switcher @showBook="show"/>
  <BookView v-if="isBook"/>
  <Gallery v-else/>
  <Divider :text="'F.A.Q.'"/>
  <Accordeon/>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Divider from '../components/Divider.vue'
import HomeVideo from '../components/HomeVideo.vue'
import Twitch from '../components/Twitch.vue'
import Shorts from '../components/Shorts.vue'
import Boosty from '../components/Boosty.vue'
import Accordeon from '../components/Accordeon.vue'
// @ts-ignore
import BookView from '../components/BookView.vue'
import Gallery from '../components/Gallery.vue'
import Switcher from '../components/Switcher.vue'

const isBook = ref(false);
const show = (data: boolean) => {
  isBook.value = data;
}
</script>