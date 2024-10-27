<template>
  <div class="wheel-wrapper">
    <button @click="spinWheel()">Вращать колесо</button>
    <div class="wheel-svg" :style="{ transform: `rotate(${rotationAngle}rad)`, transition: 'transform 1s ease-out' }">
      <svg viewBox="-1 -1 2 2">
        <g v-for="(sector, index) in sectors" :key="sector.id">
          <path
            :d="getSectorPath(sector.id)"
            :fill="`hsl(${(index / sectors.length) * 360}, 55%, 40%)`" 
          />
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

    </div>
    <div class="david-look">WINNER!</div>
    <div class="line"></div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const emit = defineEmits();
const props = defineProps({
  sectors: {
    type: Array,
    required: true
  }
});

const rotationAngle = ref(0); // Добавляем реактивную переменную для угла вращения

const spinWheel = () => {
  const fullRotations = 10; // Количество полных оборотов
  const randomFactor = Math.random() * (280 - 80) + 80; // Генерируем рандомное значение от 80 до 280
  rotationAngle.value += (fullRotations * 2 * Math.PI) + (randomFactor * (Math.PI / 180)); // Добавляем 10 оборотов и рандомное значение в радианах

  // Устанавливаем таймер для вызова функций после завершения вращения
  setTimeout(() => {
  const lineCenter = getLineCenter();
  const imagesCoords = getImagesCoords();
  findNearestImage(lineCenter, imagesCoords);
}, 1000); // Задержка 5 секунд, чтобы совпадало с длительностью вращения
};

const getLineCenter = () => {
  const lineElement = document.querySelector('.line');
  const rect = lineElement.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  return { x: centerX, y: centerY };
};

const getImagesCoords = () => {
  const imagesCoords = {};
  const images = document.querySelectorAll('.wheel-svg image');
  
  images.forEach((image, index) => {
    const rect = image.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    imagesCoords[index] = { x: centerX, y: centerY };
  });

  return imagesCoords;
};

const findNearestImage = (lineCenter, imagesCoords) => {
  let nearestImage = null;
  let minDistance = Infinity;

  for (const [index, coords] of Object.entries(imagesCoords)) {
    const distance = Math.sqrt(
      Math.pow(coords.x - lineCenter.x, 2) + Math.pow(coords.y - lineCenter.y, 2)
    );

    if (distance < minDistance) {
      minDistance = distance;
      nearestImage = { index, coords };
    }
  }

  console.log(nearestImage.index);
  emit('wheelStop', Number(nearestImage.index));
  return nearestImage;
};

// Функция для обрезки текста с добавлением многоточия
const truncateText = (text) => {
  const maxLength = 15; // Максимальная длина текста
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...'; // Обрезаем текст и добавляем многоточие
  }
  return text; // Возвращаем оригинальный текст, если он меньше или равен максимальной длине
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
    top: 57%;
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
.wheel-svg {
  border: 2px solid rgb(255, 255, 255);
  border-radius: 50%;
}
.line {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
  width: 1px;
  height: 1px;
  background: whitesmoke;

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
  cursor: pointer;
}
</style>
