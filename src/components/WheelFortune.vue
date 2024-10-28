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
            :width="getImageSize(sector.id) + '%'" 
            :height="getImageSize(sector.id) + '%'"
            transform="translate(-0.05, -0.05)"
          />
          <text 
            :x="getTextX(sector.id)" 
            :y="getTextY(sector.id)" 
            text-anchor="middle" 
            alignment-baseline="middle" 
            fill="white"
            font-size="0.04"
            :transform="`rotate(${getRotationAngle(index)}, ${getTextX(index)}, ${getTextY(index)})`"
          >
          {{ truncateText(sector.suggestion) }}
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

  // Суммируем значения level_name
  const totalLevelNameSum = props.sectors.reduce((sum, sector) => {
    return sum + (sector.level_name || 0); // Добавляем значение level_name, если оно существует
  }, 0);

  // Вычисляем минимальную ширину сектора
  const minSectorWidth = 360 / totalLevelNameSum;

  // Получаем значение level_name для текущего сектора
  const currentLevelName = props.sectors[index].level_name || 0;

  // Вычисляем угол для текущего сектора
  const angle = minSectorWidth * currentLevelName; // Ширина сектора на основе level_name
  const startAngle = (index === 0 ? 0 : props.sectors.slice(0, index).reduce((sum, sector) => sum + (sector.level_name || 0), 0)) * minSectorWidth;
  const endAngle = startAngle + angle;

  const x1 = Math.cos((startAngle * Math.PI) / 180);
  const y1 = Math.sin((startAngle * Math.PI) / 180);
  const x2 = Math.cos((endAngle * Math.PI) / 180);
  const y2 = Math.sin((endAngle * Math.PI) / 180);

  return `M 0 0 L ${x1} ${y1} A 1 1 0 0 1 ${x2} ${y2} Z`;
};

const getImageX = (index) => {
  const totalSectors = props.sectors.length;

  // Проверяем, существует ли сектор с данным индексом
  if (index < 0 || index >= totalSectors) {
    console.error('Индекс сектора вне диапазона:', index);
    return 0; // Возвращаем 0 или любое другое значение по умолчанию
  }

  // Суммируем значения level_name
  const totalLevelNameSum = props.sectors.reduce((sum, sector) => {
    return sum + (sector.level_name || 0);
  }, 0);

  // Вычисляем минимальную ширину сектора
  const minSectorWidth = 360 / totalLevelNameSum;

  // Получаем значение level_name для текущего сектора
  const currentLevelName = props.sectors[index]?.level_name || 0;

  // Вычисляем угол для текущего сектора
  const angle = minSectorWidth * currentLevelName;
  const startAngle = (index === 0 ? 0 : props.sectors.slice(0, index).reduce((sum, sector) => sum + (sector.level_name || 0), 0)) * minSectorWidth;

  // Позиция по центру сектора
  const centerAngle = startAngle + angle / 2;

  // Уменьшаем коэффициент, чтобы изображение было ближе к краю сектора
  const offset = 0.85; // Измените это значение, чтобы настроить расстояние от края
  return offset * Math.cos((centerAngle * Math.PI) / 180); // Положение по оси X для изображения
};

const getImageY = (index) => {
  const totalSectors = props.sectors.length;

  // Проверяем, существует ли сектор с данным индексом
  if (index < 0 || index >= totalSectors) {
    console.error('Индекс сектора вне диапазона:', index);
    return 0; // Возвращаем 0 или любое другое значение по умолчанию
  }

  // Суммируем значения level_name
  const totalLevelNameSum = props.sectors.reduce((sum, sector) => {
    return sum + (sector.level_name || 0);
  }, 0);

  // Вычисляем минимальную ширину сектора
  const minSectorWidth = 360 / totalLevelNameSum;

  // Получаем значение level_name для текущего сектора
  const currentLevelName = props.sectors[index]?.level_name || 0;

  // Вычисляем угол для текущего сектора
  const angle = minSectorWidth * currentLevelName;
  const startAngle = (index === 0 ? 0 : props.sectors.slice(0, index).reduce((sum, sector) => sum + (sector.level_name || 0), 0)) * minSectorWidth;

  // Позиция по центру сектора
  const centerAngle = startAngle + angle / 2;

  // Уменьшаем коэффициент, чтобы изображение было ближе к краю сектора
  const offset = 0.85; // Измените это значение, чтобы настроить расстояние от края
  return offset * Math.sin((centerAngle * Math.PI) / 180); // Положение по оси Y для изображения
};

// Функция для расчета размера изображения на основе ширины сектора
const getImageSize = (sectorId) => {
  const sectorWidth = getSectorWidth(sectorId); // Получаем ширину сектора
  const imageSize = Math.min(sectorWidth * 0.9, 10); // Устанавливаем размер изображения, чтобы он не превышал 90% ширины сектора и 10%
  return imageSize;
};

// Функция для получения ширины сектора
const getSectorWidth = (sectorId) => {
  // Здесь нужно реализовать логику для расчета ширины сектора на основе его id
  // Например, если у вас есть массив с секторами, вы можете использовать его для получения ширины
  const sectorIndex = props.sectors.findIndex(sector => sector.id === sectorId);
  const totalWidth = 100; // Общая ширина колеса в процентах
  const sectorCount = props.sectors.length;
  return totalWidth / sectorCount; // Ширина сектора в процентах
};

const getTextX = (index) => {
  const totalSectors = props.sectors.length;

  // Суммируем значения level_name
  const totalLevelNameSum = props.sectors.reduce((sum, sector) => {
    return sum + (sector.level_name || 0);
  }, 0);

  // Вычисляем минимальную ширину сектора
  const minSectorWidth = 360 / totalLevelNameSum;

  // Получаем значение level_name для текущего сектора
  const currentLevelName = props.sectors[index].level_name || 0;

  // Вычисляем угол для текущего сектора
  const angle = minSectorWidth * currentLevelName;
  const startAngle = (index === 0 ? 0 : props.sectors.slice(0, index).reduce((sum, sector) => sum + (sector.level_name || 0), 0)) * minSectorWidth;

  // Позиция по центру сектора
  const centerAngle = startAngle + angle / 2;

  return 0.5 * Math.cos((centerAngle * Math.PI) / 180); // Положение по оси X для текста
};

const getTextY = (index) => {
  const totalSectors = props.sectors.length;

  // Суммируем значения level_name
  const totalLevelNameSum = props.sectors.reduce((sum, sector) => {
    return sum + (sector.level_name || 0);
  }, 0);

  // Вычисляем минимальную ширину сектора
  const minSectorWidth = 360 / totalLevelNameSum;

  // Получаем значение level_name для текущего сектора
  const currentLevelName = props.sectors[index].level_name || 0;

  // Вычисляем угол для текущего сектора
  const angle = minSectorWidth * currentLevelName;
  const startAngle = (index === 0 ? 0 : props.sectors.slice(0, index).reduce((sum, sector) => sum + (sector.level_name || 0), 0)) * minSectorWidth;

  // Позиция по центру сектора
  const centerAngle = startAngle + angle / 2;

  return 0.5 * Math.sin((centerAngle * Math.PI) / 180); // Положение по оси Y для текста
};

// Функция для вычисления угла поворота текста
const getRotationAngle = (index) => {
  const totalSectors = props.sectors.length;

  // Суммируем значения level_name
  const totalLevelNameSum = props.sectors.reduce((sum, sector) => {
    return sum + (sector.level_name || 0);
  }, 0);

  // Вычисляем минимальную ширину сектора
  const minSectorWidth = 360 / totalLevelNameSum;

  // Получаем значение level_name для текущего сектора
  const currentLevelName = props.sectors[index].level_name || 0;

  // Вычисляем угол для текущего сектора
  const angle = minSectorWidth * currentLevelName;
  const startAngle = (index === 0 ? 0 : props.sectors.slice(0, index).reduce((sum, sector) => sum + (sector.level_name || 0), 0)) * minSectorWidth;

  // Угол поворота текста совпадает с углом поворота сектора
  const rotationAngle = startAngle + angle / 2;

  return rotationAngle; // Возвращаем угол поворота текста
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
