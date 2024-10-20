<template>
  <div class="wheel_wrapper">
    <h1>Wheel Of Boosty</h1>

     <!-- Инпут для загрузки CSV файла -->
    <input type="file" accept=".csv" @change="handleFileChange" />
    
    <!-- Инпут для загрузки JSON файла -->
    <input type="file" accept=".json" @change="handleJsonFileChange" />

    <!-- Кнопка для сравнения данных -->
    <button class="compare_btn" v-if="parsedData && parsedData.length > 0 && jsonData" @click="compareData">
      Соединить файлы
    </button>

    <!-- Блок для отображения результата сравнения в виде списка -->
    <div v-if="wheelData.length > 0" class="wheel-output">
      <h2>Wheel Data</h2>
      <div class="wheel-list">
        <div v-for="(item, index) in wheelData" :key="index" class="wheel-item">
          <img :src="item.avatar" alt="Avatar" class="avatar" />
          <div class="item-details">
            <span class="author">{{ item.author }}</span>
            <span class="level-name">{{ item.level_name }}</span>
            <span class="start-date">{{ item.start_date }}</span>
            <span class="suggestion">{{ item.suggestion }}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Papa from 'papaparse';

// Определяем типы для данных
interface ParsedDataItem {
  email: string;
  level_name: string;
  start_date: string;
  name: string; // Добавляем поле name, если оно есть
}

interface JsonDataItem {
  author: string;
  [key: string]: any; // Позволяем любые другие ключи
}

const parsedData = ref<any[] | null>(null); // Для хранения данных из CSV файла
const jsonData = ref<any | null>(null); // Для хранения данных из JSON файла
const wheelData = ref<any[]>([]); // Для хранения результата сравнения

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
            // Фильтруем данные, исключая объекты с type равным 'following' и оставляя только те, у которых end_date равен '-'
            parsedData.value = results.data.filter((item: any) => 
              item.type !== 'following' && item.end_date === '-'
            );
            console.log(parsedData.value);
            
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

// Функция для сравнения данных
const compareData = () => {
  wheelData.value = []; // Сбрасываем предыдущие данные
  if (parsedData.value && jsonData.value) {
    parsedData.value.forEach((parsedItem: ParsedDataItem) => {
      jsonData.value.forEach((jsonItem: JsonDataItem) => {
        if (jsonItem.author === parsedItem.name) {
          // Создаем новый объект с нужными ключами
          const newItem = {
            ...jsonItem, // Все ключи из jsonItem
            level_name: parsedItem.level_name, // Ключ level_name из parsedData
            start_date: parsedItem.start_date // Ключ start_date из parsedData
          };
          wheelData.value.push(newItem); // Добавляем новый объект в wheelData
        }
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.wheel_wrapper {
  display: flex;
  flex-direction: column;
  min-height: 90vh;
  
  h1 {
    margin-top: 16px;
  }

  input[type="file"] {
    margin: 32px auto;
  }

  .compare_btn {
    margin: auto;
    font-size: 22px;
    width: 250px;
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
      width: 250px; /* Два столбца с учетом отступа */
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #3f4d45;

      .avatar {
        width: 50px; /* Ширина изображения */
        height: 50px; /* Высота изображения */
        border-radius: 50%; /* Круглая форма */
        margin-right: 10px; /* Отступ справа */
      }

      .item-details {
        display: flex;
        flex-direction: column; /* Вертикальное расположение текстовых блоков */
      }

      span {
        margin-right: 10px; /* Отступ между текстовыми блоками */
      }
    }
  }
}
</style>