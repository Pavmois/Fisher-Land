<template>
  <HomeVideo msg="DAVID FISHER" />
  <Divider text="Обо мне"/>
  <Twitch/>
  <Shorts/>
  <Boosty/>
  <Divider text="Образы"/>
  <Gallery/>
  <BookView/>
  <Divider text="F.A.Q."/>
  <Accordeon/>
  <Footer/>
</template>

<script setup lang="ts">
import Divider from './components/Divider.vue'
import HomeVideo from './components/HomeVideo.vue'
import Twitch from './components/Twitch.vue'
import Shorts from './components/Shorts.vue'
import Footer from './components/Footer.vue'
import Boosty from './components/Boosty.vue'
import Accordeon from './components/Accordeon.vue'
import BookView from './components/BookView.vue'
import Gallery from './components/Gallery.vue'
</script>