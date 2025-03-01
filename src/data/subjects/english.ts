
import { SubjectData } from './types';

export const englishData: SubjectData = {
  "5": {
    0: {
      theory: `
        <h2>Present Simple Tense</h2>
        <p>Настоящее простое время в английском языке.</p>
        <p>Основные правила и случаи употребления:</p>
        <ul>
          <li>Регулярные действия и привычки</li>
          <li>Общеизвестные факты</li>
          <li>Расписания и программы</li>
          <li>Образование: I/you/we/they + глагол, he/she/it + глагол + s/es</li>
        </ul>
      `,
      examples: [
        {
          problem: "Как образуется Present Simple?",
          solution: "Утвердительная форма:\n1) I play tennis. - Я играю в теннис.\n2) She plays tennis. - Она играет в теннис.\n\nОтрицательная форма:\n1) I do not (don't) play tennis. - Я не играю в теннис.\n2) She does not (doesn't) play tennis. - Она не играет в теннис.\n\nВопросительная форма:\n1) Do you play tennis? - Ты играешь в теннис?\n2) Does she play tennis? - Она играет в теннис?"
        }
      ],
      exercises: [
        {
          problem: "Поставьте глаголы в скобках в Present Simple:\n1) He (to go) to school every day.\n2) They (to watch) TV in the evening.\n3) We (to speak) English at the lessons.\n4) She (to like) ice cream.",
          answer: "1) He goes to school every day.\n2) They watch TV in the evening.\n3) We speak English at the lessons.\n4) She likes ice cream."
        }
      ]
    },
    1: {
      theory: `
        <h2>Present Continuous Tense</h2>
        <p>Настоящее длительное время в английском языке.</p>
        <p>Основные правила и случаи употребления:</p>
        <ul>
          <li>Действия, происходящие в момент речи</li>
          <li>Временные ситуации в настоящем</li>
          <li>Запланированные действия в ближайшем будущем</li>
          <li>Образование: to be (am/is/are) + глагол с окончанием -ing</li>
        </ul>
      `,
      examples: [
        {
          problem: "Как образуется Present Continuous?",
          solution: "Утвердительная форма:\n1) I am reading a book now. - Я читаю книгу сейчас.\n2) She is watching TV. - Она смотрит телевизор.\n\nОтрицательная форма:\n1) I am not reading a book. - Я не читаю книгу.\n2) She is not (isn't) watching TV. - Она не смотрит телевизор.\n\nВопросительная форма:\n1) Am I reading a book? - Я читаю книгу?\n2) Is she watching TV? - Она смотрит телевизор?"
        }
      ],
      exercises: [
        {
          problem: "Поставьте глаголы в скобках в Present Continuous:\n1) Look! The children (to play) in the garden.\n2) I (to do) my homework now.\n3) They (to swim) in the pool at the moment.\n4) Listen! Someone (to knock) at the door.",
          answer: "1) Look! The children are playing in the garden.\n2) I am doing my homework now.\n3) They are swimming in the pool at the moment.\n4) Listen! Someone is knocking at the door."
        }
      ]
    }
  }
};
