<template>
  <div class="composables">
    <div class="composable"
      v-for="(item, index) in composition"
      :key="index"
    >
    <img :src="item.img" alt="img" class="item-img" />
    <span class="name">{{ item.name }}</span>
      <span class="model">{{ item.model }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import processor from "../../assets/info/processor.png";
import motherboard from '../../assets/info/motherboard.png'
import memory from '../../assets/info/memory-slot.png'
import microphone from '../../assets/info/microphone.png'
import soundCard from '../../assets/info/sound-card.png'
import webcam from '../../assets/info/webcam.png'
import videoCard from '../../assets/info/video-card.png'

const composition = [
  {
    name: 'Процессор',
    model: 'AMD Ryzen 9 5900X',
    img: processor
  },
  {
    name: 'Материнка',
    model: 'X570 PRO AORUS',
    img: motherboard
  },
  {
    name: 'Видюха',
    model: 'NVIDIA GEFORCE RTX 4080 SUPER PALIT GAMINGPRO',
    img: videoCard
  },
  {
    name: 'ОЗУ',
    model: 'AMD Radeon R9 Gamer Series DDR4 32GB',
    img: memory
  },
  {
    name: 'Микрофон',
    model: 'Rode NT1-a',
    img: microphone
  },
  {
    name: 'Звуковуха',
    model: 'GoXLR',
    img: soundCard
  },
  {
    name: 'Вебка',
    model: 'Logitech c920 pro stream',
    img: webcam
  },
]
</script>

<style lang="scss" scoped>
.composables {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  max-width: 800px;
  margin: 25px auto;
  padding: 0 20px;
  .composable {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    img {
      width: 100px;
      filter: invert(1);
    }
    .model {
      width: 250px;
      font-size: 14px;
    }
    .name {
      color: rgb(241, 181, 14);
    }
  }
  @media screen and (max-width: 800px) {
    justify-content: space-evenly;
    // justify-content: space-between;
    .composable {
      img {
        width: 80px;
      }
    .model {
      width: 150px;
      font-size: 12px;
    }
    }
  }
  @media screen and (max-width: 360px) {
    .composable {
      img {
        width: 80px;
      }
    .model {
      width: 100px;
      font-size: 12px;
    }
    }
  }
}
</style>