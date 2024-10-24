<template>
  <div class="wheel-wrapper">
    <button @click="getCurrentSector()">Что сверху?</button>
    <button @click="spinWheel()">Вращать колесо</button>
    <svg viewBox="-1 -1 2 2" :style="{ transform: `rotate(${rotationAngle}rad)`, transition: 'transform 4s ease-out' }">
      <g v-for="(sector, index) in sectors" :key="sector.id">
        <path :d="getSectorPath(sector.id)" :fill="`hsl(${(index / sectors.length) * 360}, 55%, 40%)`" />
        <image 
          :href="sector.avatar"
          :alt="sector.author"
          :x="getImageX(sector.id)" 
          :y="getImageY(sector.id)" 
          width="10%" 
          height="10%" 
          transform="translate(-0.1, -0.1)"
        />
        <text 
          :x="getTextX(sector.id)" 
          :y="getTextY(sector.id)" 
          text-anchor="middle" 
          alignment-baseline="middle" 
          fill="white"
          font-size="0.04"
          :transform="`rotate(${getRotationAngle(index + 0.5)}, ${getTextX(index)}, ${getTextY(index)})`"
        >
        {{ index }} {{ truncateText(sector.suggestion) }} {{ sector.id }}
        </text>
      </g>
    </svg>
    <div class="david-look">WINNER!</div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps({
  sectors: {
    type: Array,
    required: true
  },
  winningSectorId: {
    type: Number,
    required: true
  }
});

const rotationAngle = ref(0); // Добавляем реактивную переменную для угла вращения

// Функция для обрезки текста с добавлением многоточия
const truncateText = (text) => {
  const maxLength = 15; // Максимальная длина текста
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...'; // Обрезаем текст и добавляем многоточие
  }
  return text; // Возвращаем оригинальный текст, если он меньше или равен максимальной длине
};

const spinWheel = (duration = 3000) => {
  const totalSectors = props.sectors.length;
  const angle = (2 * Math.PI) / totalSectors;
  const winningSectorIndex = props.sectors.findIndex(sector => sector.id === props.winningSectorId);
  
  // Рассчитываем угол для остановки на выигрышном секторе
  const winningAngle = winningSectorIndex * angle;

  // Генерируем случайный угол вращения
  const randomRotation = Math.random() * 2 * Math.PI; // Случайный угол вращения
  const additionalRotations = 5 * 2 * Math.PI; // Дополнительные полные обороты

  // Устанавливаем новый угол вращения
  rotationAngle.value += randomRotation + additionalRotations + winningAngle; 

  // Останавливаем вращение через заданное время
  setTimeout(() => {
    getCurrentSector();
  }, 3000);
};

const getCurrentSector = () => {
  const totalSectors = props.sectors.length;
  const angle = (2 * Math.PI) / totalSectors;

  // Находим угол, который соответствует верхней части колеса
  const normalizedAngle = (rotationAngle.value % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
  
  // Рассчитываем индекс сектора, который находится наверху
  const sectorIndex = Math.floor((normalizedAngle) / angle);
  
  // Находим индекс выигрышного сектора
  const winningSectorIndex = props.sectors.findIndex(sector => sector.id === props.winningSectorId);
  
  // Рассчитываем угол для докручивания к выигрышному сектору
  const winningAngle = winningSectorIndex * angle;
  
  // Вычисляем угол, который нужно добавить, чтобы выигрышный сектор оказался вверху
  const additionalAngle = (winningAngle - normalizedAngle + 2 * Math.PI) % (2 * Math.PI);
  
  // Обновляем угол вращения
  rotationAngle.value += additionalAngle;

  // Выводим сектор, который располагается на rotationAngle.value
  const currentSectorIndex = Math.floor((rotationAngle.value % (2 * Math.PI)) / angle);
  console.log('Текущий сектор:', props.sectors[currentSectorIndex]);
};


const getSectorPath = (index) => {
  const totalSectors = props.sectors.length;
  const angle = (2 * Math.PI) / totalSectors;
  const startAngle = index * angle;
  const endAngle = startAngle + angle;

  const x1 = Math.cos(startAngle);
  const y1 = Math.sin(startAngle);
  const x2 = Math.cos(endAngle);
  const y2 = Math.sin(endAngle);

  return `M 0 0 L ${x1} ${y1} A 1 1 0 0 1 ${x2} ${y2} Z`;
};

const getImageX = (index) => {
  const totalSectors = props.sectors.length;
  const angle = (2 * Math.PI) / totalSectors;
  const startAngle = index * angle + angle / 2; // Позиция по центру сектора
  return 0.75 * Math.cos(startAngle); // Положение по оси X
};

const getImageY = (index) => {
  const totalSectors = props.sectors.length;
  const angle = (2 * Math.PI) / totalSectors;
  const startAngle = index * angle + angle / 2; // Позиция по центру сектора
  return 0.75 * Math.sin(startAngle); // Положение по оси Y
};

const getTextX = (index) => {
  const totalSectors = props.sectors.length;
  const angle = (2 * Math.PI) / totalSectors;
  const startAngle = index * angle + angle / 2; // Позиция по центру сектора
  return 0.35 * Math.cos(startAngle); // Положение по оси X для текста
};

const getTextY = (index) => {
  const totalSectors = props.sectors.length;
  const angle = (2 * Math.PI) / totalSectors;
  const startAngle = index * angle + angle / 2; // Позиция по центру сектора
  return 0.35 * Math.sin(startAngle); // Положение по оси Y для текста
};

// Функция для вычисления угла поворота текста
const getRotationAngle = (index) => {
  const totalSectors = props.sectors.length;
  const angle = (360 / totalSectors) * index; // Угол в градусах
  if (angle >= 90 && angle <= 250) {
    return angle - 180; // Поворачиваем в другую сторону
  }
  return angle; // Возвращаем угол
};
</script>

<style lang="scss" scoped>
.wheel-wrapper {
  position: relative;
  width: 800px;
  margin: auto;
  .david-look {
    position: absolute;
    top: 50%;
    right: 0;
    width: 200px;
    height: 230px;
    text-align: left;
    z-index: 1;
    background-image: url("/src/assets/arrow-david.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 20px;
    letter-spacing: 2px;
    font-size: 20px;
    animation: swing 2s ease-in-out infinite;
  }
}
// Определяем ключевые кадры для анимации
@keyframes swing {
  0% {
    transform: translate(90%, -50%) rotate(-2deg);
  }
  50% {
    transform: translate(90%, -50%) rotate(2deg); // Поворачиваем в другую сторону
  }
  100% {
    transform: translate(90%, -50%) rotate(-2deg);
  }
}
svg {
  display: block;
  margin: auto;
  border-radius: 50%;
}
button {
  width: 250px;
  margin: auto;
  margin-top: 36px;
  margin-bottom: 16px;
  z-index: 99;
  cursor: pointer;
}
</style>
