<template>
  <div class="wrapper" :class="{ disabled: !btnActive }">
    <div class="manage">
      <input class="timer" type="range" v-model="spinDuration" min="5" max="60" step="1" />
      <button class="start" @click="spinWheel(spinDuration * 1000)">Крутить<br/> {{ spinDuration }} секунд</button>
    </div>
    <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
    <div class="david-look">WINNER!</div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick, defineEmits } from 'vue';

const props = defineProps({
  sectors: {
    type: Array,
    required: true
  }
});
const emit = defineEmits();

const canvas = ref(null);
const canvasWidth = 900; // Ширина канваса
const canvasHeight = 900; // Высота канваса
const rotationAngle = ref(0); // Угол вращения
const images = ref([]); // Массив для хранения загруженных изображений
const spinDuration = ref(10); // Начальное значение времени вращения
const btnActive = ref(true);

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

const drawRotatedText = (ctx, text, x, y, angle) => {
  ctx.save(); // Сохраняем текущее состояние контекста
  ctx.translate(x, y); // Перемещаем начало координат
  ctx.rotate(angle); // Поворачиваем контекст
  ctx.fillText(text, 0, 0); // Рисуем текст
  ctx.restore(); // Восстанавливаем состояние контекста
};

const calculateImageSize = (sectorAngle) => {
  const sectorWidth = (sectorAngle / (2 * Math.PI)) * canvasWidth; // Ширина сектора в пикселях
  return Math.min(sectorWidth / 0.8, 100); // Размер изображения не больше 50% ширины сектора
};

const getTrianglePoint = (canvasWidth, canvasHeight, triangleHeight = 20) => {
  return {
    x: canvasWidth - 5, // X-координата
    y: canvasHeight / 2 // Y-координата
  };
};

const drawArrow = (ctx) => {
  ctx.fillStyle = 'rgba(255, 0, 0, 0)'; // Цвет стрелки
  ctx.beginPath();
  ctx.moveTo(canvasWidth - 5, canvasHeight / 2); // Перемещаемся к правой стороне канваса
  ctx.lineTo(canvasWidth - 40, canvasHeight / 2 - 15); // Левый угол стрелки
  ctx.lineTo(canvasWidth - 40, canvasHeight / 2 + 15); // Правый угол стрелки
  ctx.closePath();
  ctx.fill(); // Заполняем стрелку цветом
};

const drawWheel = () => {
  if (!canvas.value) return; // Проверка на null
  const ctx = canvas.value.getContext('2d');
  const numSectors = props.sectors.length;
  const totalLevel = props.sectors.reduce((sum, sector) => sum + sector.level_name, 0); // Сумма всех level_name
  const anglePerSector = (2 * Math.PI) / totalLevel; // Угол на единицу level_name
  const textRadius = canvasWidth / 2 * 0.5; // Радиус для текста (50% от радиуса колеса)
  const imageRadius = canvasWidth / 2 * 0.8; // Радиус для изображений (80% от радиуса колеса)

  ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Очистка канваса

  let currentAngle = rotationAngle.value; // Начальный угол для отрисовки

  for (let i = 0; i < numSectors; i++) {
    const sector = props.sectors[i];
    const sectorAngle = anglePerSector * sector.level_name; // Угол сектора на основе level_name    

    // Рисуем сектор
    ctx.beginPath();
    ctx.moveTo(canvasWidth / 2, canvasHeight / 2);
    ctx.arc(canvasWidth / 2, canvasHeight / 2, canvasWidth / 2, currentAngle, currentAngle + sectorAngle);
    ctx.fillStyle = `hsl(${(i / numSectors) * 360}, 40%, 30%)`; // Цвет сектора
    ctx.fill();
    ctx.stroke();

    // Устанавливаем размер шрифта в зависимости от level_name
    if (sector.level_name > 5) {
      ctx.font = '18px Arial';
    } else if (sector.level_name >= 2 && sector.level_name <= 4) {
      ctx.font = '14px Arial';
    } else if (sector.level_name === 1) {
      ctx.font = '10px Arial';
    }
    ctx.textAlign = 'right'; // Выравнивание текста по центру
    ctx.fillStyle = '#FFFFFF'; // Цвет текста

    // Обрезаем текст
    const suggestionText = truncateText(sector.suggestion, 17);
    const textX = canvasWidth / 2 + Math.cos(currentAngle + sectorAngle / 1.8) * textRadius;
    const textY = canvasHeight / 2 + Math.sin(currentAngle + sectorAngle / 2) * textRadius;

    // Рисуем текст, поворачивая его вдоль сектора
    drawRotatedText(ctx, suggestionText, textX, textY, currentAngle + sectorAngle / 2);
    
    // Рассчитываем размер изображения пропорционально ширине сектора
    const imageSize = calculateImageSize(sectorAngle); // Пропорциональный размер изображения
    
    // Рисуем изображение, если оно загружено
    if (images.value[i]) {
      const imgX = canvasWidth / 2 + Math.cos(currentAngle + sectorAngle / 2) * imageRadius;
      const imgY = canvasHeight / 2 + Math.sin(currentAngle + sectorAngle / 2) * imageRadius;
      ctx.drawImage(images.value[i], imgX - imageSize / 2, imgY - imageSize / 2, imageSize, imageSize); // Рисуем изображение
    }

    currentAngle += sectorAngle; // Обновляем текущий угол для следующего сектора
  }

  // Рисуем стрелку после отрисовки колеса
  drawArrow(ctx);
};

const getSectorCoordinates = (rotationAngle) => {
  const sectorCoordinates = [];
  const totalSectors = props.sectors.length;
  const outerRadius = Math.min(canvasWidth, canvasHeight) / 2; // Внешний радиус колеса
  const totalLevel = props.sectors.reduce((sum, sector) => sum + sector.level_name, 0); // Сумма всех level_name
  const anglePerSector = (2 * Math.PI) / totalLevel; // Угол на единицу level_name
  let currentAngle = rotationAngle; // Используем текущее значение угла вращения
  
  for (let i = 0; i < totalSectors; i++) {
    const sector = props.sectors[i];
    const sectorAngle = anglePerSector * sector.level_name; // Угол сектора на основе level_name  
    
    // Координаты начала сектора
    const startX = canvasWidth / 2 + Math.cos(currentAngle) * outerRadius;
    const startY = canvasHeight / 2 + Math.sin(currentAngle) * outerRadius;

    // Координаты конца сектора
    const endX = canvasWidth / 2 + Math.cos(currentAngle + sectorAngle) * outerRadius;
    const endY = canvasHeight / 2 + Math.sin(currentAngle + sectorAngle) * outerRadius;

    sectorCoordinates.push({
      sector: props.sectors[i].suggestion,
      startCoordinates: { x: startX, y: startY },
      endCoordinates: { x: endX, y: endY }
    });

    currentAngle += sectorAngle; // Обновляем текущий угол для следующего сектора
  }

  return sectorCoordinates;
};

const spinWheel = (duration) => {
  btnActive.value = false;
  const startTime = performance.now();
  const endTime = startTime + duration; // Время окончания
  const speed = (2 * Math.PI) / 1000 * 26; // Скорость вращения (2 оборота в секунду)

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;

    if (currentTime < endTime) {
      rotationAngle.value += speed; // Увеличиваем угол вращения
      drawWheel(); // Перерисовываем колесо
      requestAnimationFrame(animate); // Запрашиваем следующий кадр
    } else {
      smoothStop(); // Запускаем плавную остановку
    }
  };

  const smoothStop = () => {
    let stopSpeed = speed; // Начальная скорость для остановки
    const stopDuration = 3000; // Время остановки в миллисекундах
    const stopStartTime = performance.now();

    const stopAnimation = (currentTime) => {
      const elapsed = currentTime - stopStartTime;

      if (elapsed < stopDuration) {
        stopSpeed *= 0.95; // Постепенно уменьшаем скорость
        rotationAngle.value += stopSpeed; // Увеличиваем угол вращения
        drawWheel(); // Перерисовываем колесо
        requestAnimationFrame(stopAnimation); // Запрашиваем следующий кадр
      } else {
        rotationAngle.value += 0; // Устанавливаем угол вращения в конечное состояние
        drawWheel(); // Перерисовываем колесо в конечном состоянии
        const point = getTrianglePoint(canvasWidth, canvasHeight); // Получаем координаты точки
        const coordinates = getSectorCoordinates(rotationAngle.value);
        emit('wheelStop', findSectorByPointY(point.y, coordinates));
        btnActive.value = true;
      }
    };

    requestAnimationFrame(stopAnimation); // Запускаем анимацию остановки
  };

  requestAnimationFrame(animate); // Запускаем анимацию
};

const findSectorByPointY = (pointY, coordinates) => {  
  for (let i = 0; i < coordinates.length; i++) {
    const { startCoordinates, endCoordinates, sector } = coordinates[i];  
    if (pointY > startCoordinates.y && pointY < endCoordinates.y) {      
      return i;
    }
  }
  return null; // Возвращаем null, если ничего не найдено
};

const loadImages = () => {
  images.value = props.sectors.map(sector => {
    const img = new Image();
    img.src = sector.avatar; // Путь к изображению
    return img;
  });
};

// Watch for changes in props.sectors and redraw the wheel
watch(() => props.sectors, (newSectors) => {
  loadImages(); // Загружаем новые изображения
  drawWheel(); // Перерисовываем колесо
}, { immediate: true });


onMounted(() => {
  nextTick(() => {
    drawWheel(); // Вызываем drawWheel после монтирования
    loadImages(); // Загружаем новые изображения
  });
  setTimeout(() => {
    drawWheel();
    loadImages(); // Загружаем изображения при монтировании
  }, 1500);
});
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  width: 900px;
  margin: auto;
  margin-top: 36px;
}
.disabled {
  pointer-events: none;
}
.timer {
  cursor: pointer;
}
.manage {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  max-width: 250px;
  justify-content: end;
  gap: 8px;
  .start {
    margin: auto;
    cursor: pointer;
    background: #3f4d45;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #ccc;
    outline: none;
    color: white;
    transition: 0.2s linear;
    &:hover {
      background-color: rgb(58, 73, 64)
    }
    &:active {
      transform: scale(0.85);
    }
  }
}
.david-look {
  position: absolute;
  top: 50%;
  transform: translateY(-55px);
  right: -195px;
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
// Определяем ключевые кадры для анимации
@keyframes swing {
  0% {
    transform: translate(0%, -55px) rotate(-2deg);
  }
  50% {
    transform: translate(0%, -55px) rotate(2deg); // Поворачиваем в другую сторону
  }
  100% {
    transform: translate(0%, -55px) rotate(-2deg);
  }
}
</style>