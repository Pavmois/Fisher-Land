<template>
  <div>Текущий сектор: {{ currentSectorName }}</div>
  <button @click="startRotation">Крутите барабан!</button>
  <svg :width="size" :height="size" viewBox="-1 -1 2 2" :style="{ transform: `rotate(${rotationAngle}rad)` }">
    <g v-for="(sector, index) in sectors" :key="index">
      <path :d="getSectorPath(index)" :fill="`hsl(${(index / sectors.length) * 360}, 55%, 40%)`" />
      <image 
        :href="sector.avatar"
        :alt="sector.author"
        :x="getImageX(index)" 
        :y="getImageY(index)" 
        width="10%" 
        height="10%" 
        transform="translate(-0.1, -0.1)"
      />
      <text 
        :x="getTextX(index)" 
        :y="getTextY(index)" 
        text-anchor="middle" 
        alignment-baseline="middle" 
        fill="white"
        font-size="0.04"
        :transform="`rotate(${getRotationAngle(index + 0.5)}, ${getTextX(index)}, ${getTextY(index)})`"
      >
      {{ truncateText(sector.suggestion) }}
      </text>
    </g>
  </svg>
</template>

<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps({
  sectors: {
    type: Array,
    required: true
  },
  size: {
    type: Number,
    default: 800
  }
});

// Функция для обрезки текста с добавлением многоточия
const truncateText = (text) => {
  const maxLength = 15; // Максимальная длина текста
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...'; // Обрезаем текст и добавляем многоточие
  }
  return text; // Возвращаем оригинальный текст, если он меньше или равен максимальной длине
};

const rotationAngle = ref(0); // Переменная для хранения угла вращения
const currentSectorName = ref(''); // Переменная для хранения названия текущего сектора

const startRotation = () => {
  const duration = 3000; // мс
  const interval = 5; // Обновление каждые 10 мс
  const totalSteps = duration / interval;
  let currentStep = 0;

  const decelerationStartStep = totalSteps - 1800; // Начало замедления за 50 шагов до остановки
  const rotationInterval = setInterval(() => {
    let rotationSpeed = 5; // Начальная скорость вращения

    // Уменьшаем скорость вращения при приближении к остановке
    if (currentStep >= decelerationStartStep) {
      const decelerationFactor = (totalSteps - currentStep) / 1800; // Уменьшаем скорость
      rotationSpeed *= decelerationFactor; // Применяем фактор замедления
    }

    rotationAngle.value += (Math.PI / 180) * rotationSpeed; // Увеличиваем угол вращения
    currentStep++;

    // Обновляем название текущего сектора
    updateCurrentSector();

    if (currentStep >= totalSteps) {
      clearInterval(rotationInterval); // Останавливаем вращение через 10 секунд
      logWheelStopped();
    }
  }, interval);
};

const logWheelStopped = () => {
  console.log("Колесо стоп");
};

const updateCurrentSector = () => {
  const totalSectors = props.sectors.length;
  const anglePerSector = (2 * Math.PI) / totalSectors;
  const currentAngle = rotationAngle.value % (2 * Math.PI);
  const index = Math.floor((currentAngle + (Math.PI / 2)) / anglePerSector) % totalSectors; // +π/2 для корректного определения верхнего сектора
  currentSectorName.value = props.sectors[index].suggestion; // Обновляем название текущего сектора
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

<style scoped>
svg {
  display: block;
  margin: auto;
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
