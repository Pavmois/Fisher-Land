<template>
  <div class="wheel_wrapper">
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

    <!-- Блок для отображения результата сравнения в виде списка -->
    <div v-if="wheelData.length > 0" class="wheel-output">
      <h2>Участники</h2>
      <div class="wheel-list">
        <div v-for="(item, index) in wheelData" :key="index" class="wheel-item">
          <img :src="item.avatar" alt="Avatar" class="avatar" />
          <div class="item-details">
            <span class="author">{{ item.author }}</span>
            <span class="level-name">Тир: {{ item.level_name }}</span>
            <span class="start-date">{{ item.start_date }}</span>
            <span class="suggestion">{{ item.suggestion }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Блок для отображения результата сравнения в виде списка -->
    <div v-if="winners.length" class="wheel-output">
      <h2>Победители</h2>
      <div class="wheel-list">
        <div v-for="(item, index) in winners" :key="index" class="wheel-item">
          <img :src="item.avatar" alt="Avatar" class="avatar" />
          <div class="item-details">
            <span class="author">{{ item.author }}</span>
            <span class="level-name">Тир: {{ item.level_name }}</span>
            <span class="start-date">{{ item.start_date }}</span>
            <span class="suggestion">{{ item.suggestion }}</span>
          </div>
        </div>
      </div>
    </div>

    <WheelFortune v-if="wheelData.length" :key="wheelData.length" :sectors="wheelData" @wheelStop="wheelStoped"/>

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Papa from 'papaparse';
//@ts-ignore
import WheelFortune from '../components/WheelFortune.vue';

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

const parsedData = ref<any[] | null>(null); // Для хранения данных из CSV файла
const jsonData = ref<any | null>(null); // Для хранения данных из JSON файла
const wheelData = ref<any[]>([]); // Для хранения результата сравнения
const winners = ref<any[]>([]); // Для хранения результата сравнения


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

const extractNumber = (str: string) => {
  const match = str.match(/\d+/); // Ищем первое числовое значение в строке
  return match ? parseInt(match[0], 10) : null; // Возвращаем число или null, если число не найдено
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
            level_name: extractNumber(parsedItem.level_name), // Ключ level_name из parsedData
            start_date: parsedItem.start_date, // Ключ start_date из parsedData
          };
          wheelData.value.push(newItem); // Добавляем новый объект в wheelData
        }
      });
    });
  }
  console.log(1111, wheelData.value);
  
};

const wheelStoped = (index: number) => {
  console.log(index);

  setTimeout(() => {
    // Удаляем объект по индексу
    if (index >= 0 && index < wheelData.value.length) {
      // Получаем объект по индексу
      const winner = wheelData.value[index];
  
      // Добавляем объект в массив winners
      winners.value.push(winner);
  
      // Удаляем объект по индексу
      wheelData.value.splice(index, 1);
    
    // Пересобираем массив, выставляя новые id по порядку
    wheelData.value = wheelData.value.map((item, newIndex) => ({
      ...item,
      id: newIndex // Присваиваем новые id по порядку, начиная с 0
    }));
    }
  }, 2000);

}
</script>

<style lang="scss" scoped>
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

    .wheel-item {
      display: flex;
      align-items: center;
      width: 250px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #3f4d45;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }

      .item-details {
        display: flex;
        flex-direction: column;
      }

      span {
        margin-right: 10px;
      }
    }
  }
}
</style>