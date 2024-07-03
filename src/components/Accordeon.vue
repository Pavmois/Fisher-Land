<template>
  <h2>F.A.Q</h2>
  <div class="accordeon-wrapper">
    <div
      class="question"
      v-for="(question, index) in questions"
      :key="question.title"
    >
      <button @click="handleAccordion(index)">
        <h3>
          {{ question.title }}
        </h3>
      </button>
      <Collapse :when="questions[index].isExpanded" class="collapse">
        <p v-html="question.answer"></p>
      </Collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Collapse } from "vue-collapsed";

const questions = ref([
  {
    title: "Не жарко ли мне в костюмах?",
    answer:
      "Это мой 'любимый' вопрос на стримах.<br/><br/> Нет, мне вполне комфортно, все мои костюмы <span>максимально</span> продуманы. Исключения составляют ситуации когда стоит аномальная жара. Ну тогда и в трусах и майке жарко.<br/><br/> Однако меня это не останавливает, ведь гораздо важнее не личный комфорт, а <span>атмосфера</span> на стриме.",
    isExpanded: false,
  },
  {
    title: "Работаю ли я где-нибудь сейчас?",
    answer:
      "Нет, стримы - это и есть моя <span>основная работа</span>. Я стараюсь для моих подписчиков, а они отвечают мне благодарностью.",
    isExpanded: false,
  },
  {
    title: "Возможно ли заказать у меня рекламу?",
    answer:
      "Конечно, вся информация для связи есть на странице <span>'Контакты'</span>, однако сразу предупреждаю - я против ставок на спорт, казино и прочего скам-говна.",
    isExpanded: false,
  },
]);

const handleAccordion = (selectedIndex: number) => {
  questions.value.forEach((_, index) => {
    questions.value[index].isExpanded =
      index === selectedIndex ? !questions.value[index].isExpanded : false;
  });
}
</script>

<style lang="scss" scoped>
.accordeon-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: auto;
  margin-top: 20px;
  max-height: 850px;
}
.question {
  margin-bottom: 1rem;
  border-radius: 20px;
  border-radius: 15px;
}
button {
  font-size: 1.5rem;
  width: 100%;
  height: 45px;
  border: 1px solid rgb(88, 88, 88);
  outline: none;
  border-radius: 20px;
  background-color: transparent;
  color: white;
  &:hover {
    cursor: pointer;
  }
}
.collapse {
  width: 100%;
  margin: auto;
  text-align: left;
  transition: height 300ms cubic-bezier(0.3, 0, 0.6, 1);
  :deep(p) {
    color: white;
    padding: 10px 20px;
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.5rem;
    span {
      font-weight: 700;
      color: red;
    }
    .boosty {
      text-decoration: none;
      color: #f15f2c;
    }
  }
}
@media screen and (max-width: 1500px) {
  .accordeon-wrapper {
    width: 60%;
  }
}
@media screen and (max-width: 1200px) {
  button {
    font-size: 1rem;
  }
  .collapse {
    :deep(p) {
      font-size: 1rem;
    }
  }
}
@media screen and (max-width: 1000px) {
  .accordeon-wrapper {
    width: 75%;
  }
}
@media screen and (max-width: 500px) {
  .accordeon-wrapper {
    width: 85%;
  }
}
</style>
