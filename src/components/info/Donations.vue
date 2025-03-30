<template>
  <p>
    Больше никакой лотереи!
    Ниже представлен полный набор <span>звуковых оповещений</span> на разные <span>суммы доната</span>.
  </p>
  <div class="donations">
    <div class="donates-wrapper">
      <div
        class="donate"
        v-for="donate in donates"
        :key="donate.id"
        @click.prevent="togglePlay(donate)"
      >
        <div class="donate-text">{{ donate.name }}</div>
        <div class="donate-play" v-html="donate.isPlaying ? '&#10073;&#10073;' : '&#9658;'"></div>
      </div> 
    </div>
  </div>
  <p><span>Нажми</span> чтобы услышать!</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import thirty from '../../assets/alerts/30.mp3'
import fifty from '../../assets/alerts/50.mp3'
import fiftyone from '../../assets/alerts/51.mp3'
import sixtynine from '../../assets/alerts/69.mp3'
import hundred from '../../assets/alerts/100.mp3'
import fallout from '../../assets/alerts/111.mp3'
import oldDavid from '../../assets/alerts/444.mp3'
import zombiYarn from '../../assets/alerts/500.mp3'
import varant from '../../assets/alerts/501.mp3'
import morrowind from '../../assets/alerts/666.mp3'
import turtle from '../../assets/alerts/777.mp3'
import thousand from '../../assets/alerts/1000.mp3'
import thousandone from '../../assets/alerts/1001.mp3'
import itstime from '../../assets/alerts/1002-1999.mp3'
import happy from '../../assets/alerts/2000-4999.mp3'
import heart from '../../assets/alerts/5000-9999.mp3'
import rickmorty from '../../assets/alerts/10000.mp3'
import randomKhadgit from '../../assets/alerts/randomKhadgit.mp3'
import randomMore from '../../assets/alerts/randomMore.mp3'
import goodJob from '../../assets/alerts/goodJob.mp3'

type Donate = {
  id: string,
  name: string,
  file: string,
  audio: HTMLAudioElement,
  isPlaying: boolean
}

const donates = ref([
  {
    id: '30',
    name: '30',
    file: thirty,
    audio: new Audio(thirty),
    isPlaying: false
  },
  {
    id: '50',
    name: '50',
    file: fifty,
    audio: new Audio(fifty),
    isPlaying: false
  },
  {
    id: '51',
    name: '51',
    file: fiftyone,
    audio: new Audio(fiftyone),
    isPlaying: false
  },
  {
    id: '69',
    name: '69',
    file: sixtynine,
    audio: new Audio(sixtynine),
    isPlaying: false
  },
  {
    id: '100',
    name: '100',
    file: hundred,
    audio: new Audio(hundred),
    isPlaying: false
  },
  {
    id: '111',
    name: '111',
    file: fallout,
    audio: new Audio(fallout),
    isPlaying: false
  },
  {
    id: '444',
    name: '444',
    file: oldDavid,
    audio: new Audio(oldDavid),
    isPlaying: false
  },
  {
    id: '500',
    name: '500',
    file: zombiYarn,
    audio: new Audio(zombiYarn),
    isPlaying: false
  },
  {
    id: '501',
    name: '501',
    file: varant,
    audio: new Audio(varant),
    isPlaying: false
  },
  {
    id: '666',
    name: '666',
    file: morrowind,
    audio: new Audio(morrowind),
    isPlaying: false
  },
  {
    id: '777',
    name: '777',
    file: turtle,
    audio: new Audio(turtle),
    isPlaying: false
  },
  {
    id: '1000',
    name: '1000',
    file: thousand,
    audio: new Audio(thousand),
    isPlaying: false
  },
  {
    id: '1001',
    name: '1001',
    file: thousandone,
    audio: new Audio(thousandone),
    isPlaying: false
  },
  {
    id: '1002-1999',
    name: '1002-1999',
    file: itstime,
    audio: new Audio(itstime),
    isPlaying: false
  },
  {
    id: '2000-4999',
    name: '2000-4999',
    file: happy,
    audio: new Audio(happy),
    isPlaying: false
  },
  {
    id: '5000-9999',
    name: '5000-9999',
    file: heart,
    audio: new Audio(heart),
    isPlaying: false
  },
  {
      id:'10000',
      name:'10 000',
      file:rickmorty,
      audio:new Audio(rickmorty),
      isPlaying:false
  },
  {
      id:'randomKhadgit',
      name:'?',
      file:randomKhadgit,
      audio:new Audio(randomKhadgit),
      isPlaying:false
  },
  {
      id:'randomMore',
      name:'??',
      file:randomMore,
      audio:new Audio(randomMore),
      isPlaying:false
  },
  {
    id:'goodJob',
    name:'???',
    file:goodJob,
    audio:new Audio(goodJob),
    isPlaying:false
  }
])

function togglePlay(donate: Donate) {
  if (donate.isPlaying) {
    donate.audio.pause();
    donate.isPlaying = false;
  } else {
    stopAll();
    donate.audio.play();
    donate.isPlaying = true;
  }
}

function stopAll() {
  donates.value.forEach(d => {
    d.audio.pause();
    d.audio.currentTime = 0;
    d.isPlaying = false;
  });
}

</script>

<style lang="scss" scoped>
p {
  padding: 0 5px;
  span {
    color: rgb(241, 181, 14);
  }
}

.donations {
  max-width: 865px;
  margin: 0 auto;
}

.donates-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;  
  gap: 8px;
  .donate {
    display: flex;
    width: 120px;
    justify-content: space-between;
    padding: 8px 10px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 20px;
    transition: all 0.15s linear;
    -webkit-tap-highlight-color: transparent;
    border: 1px solid transparent;
    cursor: pointer;
    .donate-play {
      font-size: 21px;
      line-height: 20px;
    }
    &:hover {
      background: slategray;
      transform: scale(1.05);
      border: 1px solid aliceblue;
    }
  }
  @media screen and (max-width: 700px) {
    max-width: 100%;
    justify-content: center;
    .donate {
      width: 140px;
    }
  }
  @media screen and (max-width: 545px) {
    .donate {
      width: 120px;
    }
  }
  @media screen and (max-width: 480px) {
    justify-content: space-evenly;
    .donate {
      width: 140px;
    }
  }
  @media screen and (max-width:380px) {
    .donate {
      width: 110px;
    }
  }
}
</style>