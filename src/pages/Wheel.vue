<template>
  <div v-if="isWidthPc" class="wheel_wrapper">
    <h1>Wheel Of Boosty</h1>

    <div class="input_loaders">
      <!-- Инпут для загрузки CSV файла -->
      <label :class="parsedData ? 'active' : 'inactive'">
        <span v-if="!parsedData">
          Выберите CSV файл
        </span>
        <input type="file" accept=".csv" @change="handleFileChange" />
      </label>
      
      <!-- Инпут для загрузки JSON файла -->
      <label  :class="jsonData ? 'active' : 'inactive'">
        <span v-if="!jsonData">
          Выберите JSON файл
        </span>
        <input type="file" accept=".json" @change="handleJsonFileChange" />
      </label>
    </div>

    <!-- Кнопка для сравнения данных -->
    <button class="compare_btn" v-if="parsedData && parsedData.length > 0 && jsonData" @click="compareData">
      Получить таблицу участников
    </button>

    <div v-if="noDataComments.length" class="noDataComments">
      Комментарий на бусти есть, а подписки - нет!
      <ul>
        <li v-for="(item, index) in noDataComments" :key="index">
          <span>{{ item.author }}</span> заказал <span> {{ item.suggestion }}</span>
        </li>
      </ul>
    </div>

    <!-- Блок для отображения результата сравнения в виде списка -->
    <div v-if="wheelData.length > 0" class="wheel-output">
      <h2>Участники</h2>
      <div class="wheel-list">
        <div v-for="(item, index) in wheelData" :key="index" class="wheel-item">
          <div class="gen-item" @click="getInfo(index)" title="Удалить"></div>
          <img :src="item.avatar" alt="Avatar" class="avatar" />
          <div class="item-details">
            <span class="author">{{ item.author }}</span>
            <span class="level-name">Тир: {{ item.level_name }}</span>
            <span v-if="item.start_date" class="start-date">{{ formatDateWithMonths(item.start_date) }}</span>
            <span v-else class="start-date">Сегодня</span>
            <span class="suggestion">{{ cleanString(item.suggestion) }}</span>
          </div>
        </div>
      </div>
      <div class="add-member">
        <button class="open-btn" @click="showPopup = !showPopup">Добавить участников</button>
        <div v-if="showPopup" class="popup">
          <input v-model="author" placeholder="Ник" />
          <input v-model.number="levelName" type="number" placeholder="Уровень 1-7" min="1" max="7"/>
          <input v-model="suggestion" placeholder="Игра" />
          <button @click="addItem">Добавить</button>
        </div>
      </div>
    </div>
        
    <!-- Блок для отображения списка победителей -->
    <div v-if="winners.length" class="wheel-output">
      <h2>Победители</h2>
      <div class="wheel-list">
        <div v-for="(item, index) in winners" :key="index" class="wheel-item">
          <img :src="item.avatar" alt="Avatar" class="avatar" />
          <div class="item-details">
            <span class="author">{{ item.author }}</span>
            <span class="level-name">Тир: {{ item.level_name }}</span>
            <span v-if="item.start_date" class="start-date">{{ formatDateWithMonths(item.start_date) }}</span>
            <span v-else class="start-date">Сегодня</span>
            <span class="suggestion">{{ cleanString(item.suggestion) }}</span>
          </div>
        </div>
      </div>

      <div class="copyText">
        <button class="copyBtn" @click="getSuggestionsString(winners)">
          Скопировать победителей
        </button>
      </div>
    </div>
    
    <WheelFortune v-if="wheelData.length" :sectors="wheelData" @wheelStop="wheelStoped"/>
  </div>
  <div v-else class="wheel-not">
    <span>
      Версия колеса для планшетов и мобильных устройств в разработке
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Papa from 'papaparse';
//@ts-ignore
import WheelFortune from '../components/WheelFortune.vue';
import member from "../assets/newMember.png";
const showPopup = ref(false);
type ParsedDataItem = {
  name: string;
  level_name: string;
  start_date: string;
  [key: string]: any; // Позволяем любые другие ключи
}

type JsonDataItem = {
  author: string;
  [key: string]: any; // Позволяем любые другие ключи
}

const subTiers = [
  {
    name: 'Ведьхряк',
    tier: 1,
  },
  {
    name: 'Ассасвин',
    tier: 2,
  },
  {
    name: 'Безумный Хрякс',
    tier: 3,
  },
  {
    name: 'Свин-паук',
    tier: 4,
  },
  {
    name: 'Порк',
    tier: 6,
  },
  {
    name: 'Космосвинятник',
    tier: 7,
  },
]

const parsedData = ref<any[] | null>(null); // Для хранения данных из CSV файла
const jsonData = ref<any | null>(null); // Для хранения данных из JSON файла
const wheelData = ref<any[]>([]); // Для хранения результата сравнения
const winners = ref<any[]>([]); // Для хранения результата сравнения
const noDataComments = ref<any[]>([]); // Для хранения комментариев без совпадений
const isWidthPc = ref(true); // Изначально предполагаем, что ширина экрана больше 1300p
const author = ref('');
const levelName = ref('');
const suggestion = ref('');

const addItem = () => {
  showPopup.value = !showPopup.value;
  const newItem = {
    author: author.value,
    level_name: levelName.value,
    suggestion: suggestion.value,
    avatar: member,
    id: wheelData.value.length, // Используем длину массива wheelData для id
  };
  
  wheelData.value.push(newItem); // Добавляем новый объект в массив wheelData

  // Пересобираем массив, выставляя новые id по порядку
  wheelData.value = wheelData.value.map((item, newIndex) => ({
    ...item,
    id: newIndex // Присваиваем новые id по порядку, начиная с 0
  }));

  // Очищаем поля ввода после добавления
  author.value = '';
  levelName.value = '';
  suggestion.value = '';
};

// Метод для очистки строки от специальных символов
const cleanString = (str: string): string => {
  // Удаляем пробелы в начале и конце строки, заменяем неразделимые пробелы на обычные и убираем спец.символы
  const cleanedStr = str
    .trim() // Убираем пробелы в начале и конце строки
    .replace(/[\u00A0]/g, ' ') // Заменяем неразделимые пробелы на обычные пробелы
    .replace(/[^\w\sа-яА-ЯёЁ]/gi, ''); // Удаляем все спец.символы
  return cleanedStr; // Возвращаем очищенную строку
}

const checkWidth = () => {
  isWidthPc.value = window.innerWidth >= 1300; // Меняем значение переменной в зависимости от ширины экрана
}

const formatDateWithMonths = (dateString: string): string => {
  const date = new Date(dateString); // Создаем объект даты из строки
  const currentDate = new Date(); // Текущая дата

  // Получаем количество месяцев, прошедших с указанной даты
  const monthsPassed = (currentDate.getFullYear() - date.getFullYear()) * 12 + (currentDate.getMonth() - date.getMonth());

  // Форматируем дату в нужный формат
  const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getFullYear()).slice(-2)}`;

  return `${formattedDate} (${monthsPassed} мес.)`; // Возвращаем отформатированную строку
}

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target?.result;
      if (typeof csv === 'string') {
        Papa.parse(csv, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            parsedData.value = results.data.filter((item: any) => 
              item.type !== 'following' && item.end_date === '-'
            );
          },
        });
      }
    };
    reader.readAsText(file);
  }
};

const handleJsonFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const json = e.target?.result;
      if (typeof json === 'string') {
        jsonData.value = JSON.parse(json); // Парсим JSON и сохраняем в jsonData
      }
    };
    reader.readAsText(file);
  }
};

async function getSuggestionsString(winners: any) {
  const suggestionsString = winners.map((winner: { suggestion: string; }) => winner.suggestion).join(' -> ');

  // Копируем строку в буфер обмена
  try {
    await navigator.clipboard.writeText(suggestionsString);
    alert('Скопировано в буфер обмена:' + suggestionsString);
  } catch (err) {
    alert('Ошибка при копировании в буфер обмена:' + err);
  }

  return suggestionsString;
}

// Функция для сравнения данных и формирования NoDataComments
const compareDataAndFindMissing = (jsonArr: any[], wheelArr: any[]) => {
  // Получаем все авторы из wheelData для быстрого поиска
  const wheelAuthors = new Set(wheelArr.map(item => item.author));
  
  // Находим объекты из jsonData, которых нет в wheelData
  const missingComments = jsonArr.filter(jsonItem => !wheelAuthors.has(jsonItem.author));
  
  // Сохраняем результат в noDataComments
  noDataComments.value = missingComments;
  
  return missingComments;
};

// Функция для сравнения данных
const compareData = () => {
  wheelData.value = []; // Сбрасываем предыдущие данные
  let idCounter = 0; // Инициализируем счетчик для id
  if (parsedData.value && jsonData.value) {
    parsedData.value.forEach((parsedItem: ParsedDataItem) => {
      jsonData.value.forEach((jsonItem: JsonDataItem) => {
        if (jsonItem.author === parsedItem.name) {
          // Создаем новый объект с нужными ключами
          const newItem = {
            id: idCounter++, // Добавляем id с текущим значением счетчика и увеличиваем его
            ...jsonItem, // Все ключи из jsonItem
            level_name: (() => {
              const foundTier = subTiers.find(subTier => subTier.name === parsedItem.level_name);
              return foundTier ? foundTier.tier : null; // Возвращаем tier или null, если не найдено
            })(),
            start_date: parsedItem.start_date, // Ключ start_date из parsedData
          };
          wheelData.value.push(newItem); // Добавляем новый объект в wheelData
        }
      });
    });

     // Вызываем функцию для поиска несовпадающих комментариев
     const missingComments = compareDataAndFindMissing(jsonData.value, wheelData.value);
  }
};

const wheelStoped = (index: number) => {
  setTimeout(() => {
    // Удаляем объект по индексу
    if (index >= 0 && index < wheelData.value.length) {
      // Получаем объект по индексу
      const winner = wheelData.value[index];
  
      // Добавляем объект в массив winners
      winners.value.push(winner);
  
      // Удаляем объект по индексу
      wheelData.value.splice(index, 1);

      // Определяем переменную allWinners
      const allWinners = wheelData.value.filter(item => item.suggestion.toLowerCase() === winner.suggestion.toLowerCase());

      // Если allWinners не пустой, удаляем все его объекты из wheelData.value
      if (allWinners.length > 0) {
        wheelData.value = wheelData.value.filter(item => !allWinners.includes(item));
      }
    
    // Пересобираем массив, выставляя новые id по порядку
    wheelData.value = wheelData.value.map((item, newIndex) => ({
      ...item,
      id: newIndex // Присваиваем новые id по порядку, начиная с 0
    }));
    }
  }, 500);

}

const getInfo = (index: number) => {
  // Удаляем объект по индексу
  wheelData.value.splice(index, 1);

  // Пересобираем массив, выставляя новые id по порядку
  wheelData.value = wheelData.value.map((item, newIndex) => ({
  ...item,
  id: newIndex // Присваиваем новые id по порядку, начиная с 0
}));
}

// Устанавливаем обработчик события при монтировании компонента
onMounted(() => {
  checkWidth(); // Проверяем ширину при инициализации
  window.addEventListener('resize', checkWidth); // Добавляем обработчик события resize
});

// Удаляем обработчик события перед размонтированием компонента
onBeforeUnmount(() => {
  window.removeEventListener('resize', checkWidth);
});
</script>

<style lang="scss" scoped>
.add-member {
  display: flex;
  gap: 32px;
  margin-top: 8px;
  .open-btn {
    cursor: pointer;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #3f4d45;
    color: white;
    transition: all 0.2s linear;
      &:hover {
        opacity: 0.7;
      }
  }
  .popup {
    display: flex;
    gap: 8px;
    input {
      width: 120px;
    }
    button {
      cursor: pointer;
    }
  }
}
.wheel-not {
  display: flex;
  min-height: 90vh;
  span {
    margin: auto;
    font-size: 32px;
  }
}
.wheel_wrapper {
  display: flex;
  flex-direction: column;
  min-height: 90vh;
  
  h1 {
    margin-top: 16px;
  }

  .input_loaders {
    display: flex;
    justify-content: space-between;
    margin: 32px auto;

    span {
      color: white;
    }

    .inactive {
      border: 1px solid red;
      color: red;
    }

    .active {
      border: 1px solid green;
      color: green;
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 20px;
      border: 1px solid rgb(88, 88, 88);
      margin-right: 16px;
    }

    input[type="file"] {
      font-size: 18px;
      margin: auto;
      &:hover {
        cursor: pointer;
      }
    }

    @media screen and (max-width: 800px) {
      flex-direction: column;
      gap: 8px;
    }
    @media screen and (max-width: 430px) {
      label {
        margin: auto;
        input[type="file"] {
          font-size: 14px;
        }
      }
    }
  }

  .compare_btn {
    margin: auto;
    margin-top: 0;
    font-size: 22px;
    width: 250px;
    outline: none;
    background: rgb(46, 46, 46);
    border: 1px solid rgb(88, 88, 88);
    height: 100%;
    border-radius: 20px;
    color: white;
    padding: 4px 0;
    cursor: pointer;
    transition: all 0.35s linear;
    &:hover {
      background: transparent;
    }
  }

  .json-output {
    margin-top: 16px;
    background-color: #504646;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .copyText {
    display: flex;
    align-items: start;
    margin-top: 8px;
    .copyBtn {
      cursor: pointer;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #3f4d45;
      color: white;
      transition: all 0.2s linear;
      &:hover {
        opacity: 0.7;
      }
    }
  }
  .wheel-output {
    margin: auto;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    width: 1200px;

    .wheel-list {
      display: flex;
      flex-wrap: wrap; /* Позволяет элементам переноситься на следующую строку */
      gap: 8px; /* Отступ между элементами */
    }

    .gen-item {
      position: absolute;
      top: 5%;
      right: 5%;
      width: 25px;
      height: 25px;
      background-image: url('/src/assets/trash.png');
      background-repeat: no-repeat;
      background-size: cover;
      transition: all 0.2s;
      opacity: 0;
      border-radius: 20px;
      background-color: #3f4d45;
      &:hover {
        cursor: pointer;
      }
    }

    .wheel-item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 250px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #3f4d45;

      &:hover {
        .gen-item {
          opacity: 1;
        }
      }

      .avatar {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin-right: 10px;
      }

      .item-details {
        display: flex;
        flex-direction: column;
        text-align: left;
        gap: 5px;
        height: 100%;
        width: calc(100% - 80px);
        .suggestion {
          text-wrap: wrap;
          color: blanchedalmond;
        }
        .level-name {
          color: deepskyblue;
        }
        .start-date {
          color: mediumaquamarine;
        }
      }

      span {
        margin-right: 10px;
      }
    }
  }
}
.noDataComments {
  width: 1200px;
  text-align: left;
  padding: 10px;
  margin: auto;
  margin-top: 16px;
  span {
    color: blanchedalmond;
  }
}
</style>