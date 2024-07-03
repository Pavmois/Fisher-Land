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
import { ref, onMounted } from "vue";
import { Collapse } from "vue-collapsed";

onMounted(() => {
  const textToCopy = document.getElementById('textToCopy');
  if (textToCopy) {
    textToCopy.addEventListener('click', copyText);
  }
});

const questions = ref([
  {
    title: "Возможно ли заказать у меня рекламу?",
    answer:
      `<span>Конечно</span>, для сотрудничества пишите на <span>simplehugh@mail.ru</span>. Вы можете нажать на <a href="mailto:simplehugh@mail.ru">эту ссылку</a>, чтобы сразу отправить <span>e-mail</span>.`,
    isExpanded: false,
  },
  {
    title: "Откуда мои костюмы для косплея?",
    answer:
      `Делаю их сам из подручных материалов.<br/><br/> В последнее время появилась возможность наблюдать этот процесс. К примеру, костюм для Dead Space я делал на стримах платформы Boosty, где любой фолловер мог наблюдать процесс изготовления брони, шлема и подсветки к ним в прямом эфире`,
    isExpanded: false,
  },
  {
    title: "Не жарко ли мне в костюмах?",
    answer:
      "Это мой 'любимый' вопрос на стримах.<br/><br/> Нет, мне вполне комфортно, <span>все</span> мои костюмы максимально <span>продуманы</span>. Исключения составляют ситуации когда стоит аномальная жара. Ну тогда и в трусах и майке жарко.<br/><br/> Однако меня это не останавливает, гораздо <span>важнее</span> ведь не личный комфорт, а <span>атмосфера</span> на стриме.",
    isExpanded: false,
  },
  {
    title: "Можно ли заказать игру?",
    answer:
      "Да, на канале есть возможность <span>выкупить</span> один стрим для Вашей игры. Так же можно заказать просмотр фильма или пары серий сериала. Из-за полтики Твитча просмотр будет на платформе Boosty",
    isExpanded: false,
  },
  {
    title: "Работаю ли я где-нибудь сейчас?",
    answer:
      `Нет, стримы - это и есть моя <span>основная работа</span>. Я стараюсь для моих подписчиков, а они отвечают мне благодарностью с <span>помощью</span> <a href="https://www.donationalerts.com/r/davidfish" target="_blank">DonationAlerts</a> или <a href="https://boosty.to/davidfisher" target="_blank">Boosty</a>.`,
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
  height: 550px;
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
    text-align: justify;
    padding: 10px 20px;
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.5rem;
    span {
      color: rgb(241, 181, 14);
    }
    a {
      text-decoration:underline;
      color: white;
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
    height: auto;
  }
}
@media screen and (max-width: 500px) {
  .accordeon-wrapper {
    width: 85%;
  }
}
</style>
