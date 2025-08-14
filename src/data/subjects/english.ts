
import { SubjectData } from './types';

export const englishData: SubjectData = {
  "5": {
    0: {
      theory: `
        <h2>Настоящее простое время</h2>
        <p>Настоящее простое время (Present Simple) в английском языке используется для выражения регулярных действий, привычек, общеизвестных фактов и постоянных состояний.</p>
        <p><strong>Основные правила и случаи употребления:</strong></p>
        <ul>
          <li>Регулярные и повторяющиеся действия: <em>I play tennis every Sunday.</em></li>
          <li>Постоянные состояния: <em>She lives in Moscow.</em></li>
          <li>Общеизвестные факты: <em>The Earth revolves around the Sun.</em></li>
          <li>Расписания и программы: <em>The train leaves at 9:00.</em></li>
        </ul>
        
        <h3>Образование:</h3>
        <p>Утвердительная форма:</p>
        <ul>
          <li>I/you/we/they + глагол</li>
          <li>he/she/it + глагол + s/es</li>
        </ul>
        
        <p>Отрицательная форма:</p>
        <ul>
          <li>I/you/we/they + do not (don't) + глагол</li>
          <li>he/she/it + does not (doesn't) + глагол</li>
        </ul>
        
        <p>Вопросительная форма:</p>
        <ul>
          <li>Do + I/you/we/they + глагол?</li>
          <li>Does + he/she/it + глагол?</li>
        </ul>
        
        <h3>Правила добавления окончания -s/es:</h3>
        <ol>
          <li>Обычно добавляется -s: play → plays, read → reads</li>
          <li>После sh, ch, ss, x, o добавляется -es: wash → washes, watch → watches</li>
          <li>Если глагол оканчивается на согласную + y, то y меняется на i + es: study → studies</li>
        </ol>
        
        <h3>Маркеры времени:</h3>
        <p>Часто используются следующие слова и выражения:</p>
        <ul>
          <li>always (всегда)</li>
          <li>usually (обычно)</li>
          <li>often (часто)</li>
          <li>sometimes (иногда)</li>
          <li>rarely/seldom (редко)</li>
          <li>never (никогда)</li>
          <li>every day/week/month/year (каждый день/неделю/месяц/год)</li>
        </ul>
      `,
      examples: [
        {
          problem: "Как образуется Present Simple?",
          solution: "Утвердительная форма:\n1) I play tennis. - Я играю в теннис.\n2) She plays tennis. - Она играет в теннис.\n\nОтрицательная форма:\n1) I do not (don't) play tennis. - Я не играю в теннис.\n2) She does not (doesn't) play tennis. - Она не играет в теннис.\n\nВопросительная форма:\n1) Do you play tennis? - Ты играешь в теннис?\n2) Does she play tennis? - Она играет в теннис?"
        },
        {
          problem: "Какие основные случаи употребления Present Simple?",
          solution: "1) Регулярные, повторяющиеся действия: I go to school every day. (Я хожу в школу каждый день.)\n2) Постоянные ситуации: He works in a bank. (Он работает в банке.)\n3) Общеизвестные факты: Water boils at 100 degrees Celsius. (Вода кипит при 100 градусах Цельсия.)\n4) Расписания: The movie starts at 7 pm. (Фильм начинается в 7 вечера.)"
        },
        {
          problem: "Как меняется глагол в 3-м лице единственного числа?",
          solution: "В 3-м лице единственного числа (he, she, it) к глаголу добавляется окончание -s или -es:\n1) play → plays (играет)\n2) watch → watches (смотрит)\n3) study → studies (учится)\n4) fix → fixes (чинит)\n5) go → goes (идёт)"
        }
      ],
      exercises: [
        {
          problem: "Поставьте глаголы в скобках в Present Simple:\n1) He (to go) to school every day.\n2) They (to watch) TV in the evening.\n3) We (to speak) English at the lessons.\n4) She (to like) ice cream.",
          answer: "1) He goes to school every day.\n2) They watch TV in the evening.\n3) We speak English at the lessons.\n4) She likes ice cream."
        },
        {
          problem: "Составьте вопросы и отрицания из следующих предложений:\n1) They play football on Sundays.\n2) She reads books in the evening.\n3) It rains a lot in autumn.",
          answer: "Вопросы:\n1) Do they play football on Sundays?\n2) Does she read books in the evening?\n3) Does it rain a lot in autumn?\n\nОтрицания:\n1) They don't play football on Sundays.\n2) She doesn't read books in the evening.\n3) It doesn't rain a lot in autumn."
        },
        {
          problem: "Выберите правильный вариант:\n1) She always (go/goes) to bed at 10 pm.\n2) They (don't/doesn't) understand French.\n3) (Do/Does) your brother like sports?\n4) We (study/studys) English twice a week.",
          answer: "1) She always goes to bed at 10 pm.\n2) They don't understand French.\n3) Does your brother like sports?\n4) We study English twice a week."
        }
      ],
      additionalContent: `
        <h3>Важные моменты:</h3>
        <ul>
          <li>Глаголы, обозначающие состояние (state verbs), обычно не используются в длительных временах: know, believe, like, love, hate, want, need, prefer, remember, understand и др.</li>
          <li>В вопросах и отрицаниях не добавляется окончание -s/es к основному глаголу.</li>
          <li>Обратите внимание на особые случаи правописания: try → tries, cry → cries, но play → plays (потому что перед y стоит гласная).</li>
        </ul>
        
        <h3>Ссылки на видеоуроки:</h3>
        <div class="video-container">
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/t9ZqZSj3g_o" 
            title="Present Simple - объяснение на русском" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>
      `
    },
    1: {
      theory: `
        <h2>Настоящее длительное время</h2>
        <p>Настоящее длительное время (Present Continuous) используется для описания действий, происходящих в момент речи или в настоящий период времени, а также для выражения запланированных действий в ближайшем будущем.</p>
        
        <p><strong>Основные правила и случаи употребления:</strong></p>
        <ul>
          <li>Действия, происходящие в момент речи: <em>I am reading a book now.</em></li>
          <li>Временные ситуации в настоящем: <em>She is living with her parents until she finds an apartment.</em></li>
          <li>Запланированные действия в ближайшем будущем: <em>We are meeting Tom at the airport tomorrow.</em></li>
          <li>Выражение раздражения: <em>He is always coming late.</em></li>
        </ul>
        
        <h3>Образование:</h3>
        <p>Утвердительная форма:</p>
        <ul>
          <li>I am (I'm) + глагол с окончанием -ing</li>
          <li>you/we/they are (you're/we're/they're) + глагол с окончанием -ing</li>
          <li>he/she/it is (he's/she's/it's) + глагол с окончанием -ing</li>
        </ul>
        
        <p>Отрицательная форма:</p>
        <ul>
          <li>I am not (I'm not) + глагол с окончанием -ing</li>
          <li>you/we/they are not (aren't) + глагол с окончанием -ing</li>
          <li>he/she/it is not (isn't) + глагол с окончанием -ing</li>
        </ul>
        
        <p>Вопросительная форма:</p>
        <ul>
          <li>Am + I + глагол с окончанием -ing?</li>
          <li>Are + you/we/they + глагол с окончанием -ing?</li>
          <li>Is + he/she/it + глагол с окончанием -ing?</li>
        </ul>
        
        <h3>Правила добавления окончания -ing:</h3>
        <ol>
          <li>Обычно добавляется -ing: play → playing, read → reading</li>
          <li>Если глагол оканчивается на -e, то e опускается: write → writing, make → making</li>
          <li>Если глагол оканчивается на согласную + гласную + согласную, и ударение падает на последний слог, то последняя согласная удваивается: run → running, swim → swimming</li>
          <li>Если глагол оканчивается на -ie, то ie меняется на y + ing: lie → lying, die → dying</li>
        </ol>
        
        <h3>Маркеры времени:</h3>
        <p>Часто используются следующие слова и выражения:</p>
        <ul>
          <li>now (сейчас)</li>
          <li>at the moment (в данный момент)</li>
          <li>today (сегодня)</li>
          <li>this week/month/year (на этой неделе/в этом месяце/в этом году)</li>
          <li>Look! (Смотри!)</li>
          <li>Listen! (Слушай!)</li>
        </ul>
      `,
      examples: [
        {
          problem: "Как образуется Present Continuous?",
          solution: "Утвердительная форма:\n1) I am reading a book now. - Я читаю книгу сейчас.\n2) She is watching TV. - Она смотрит телевизор.\n\nОтрицательная форма:\n1) I am not reading a book. - Я не читаю книгу.\n2) She is not (isn't) watching TV. - Она не смотрит телевизор.\n\nВопросительная форма:\n1) Am I reading a book? - Я читаю книгу?\n2) Is she watching TV? - Она смотрит телевизор?"
        },
        {
          problem: "Какие основные случаи употребления Present Continuous?",
          solution: "1) Действия, происходящие в момент речи: Look! It is raining. (Смотри! Идёт дождь.)\n2) Временные ситуации в настоящем: I am taking a Spanish course this semester. (Я прохожу курс испанского в этом семестре.)\n3) Запланированные действия в ближайшем будущем: We are flying to Paris next week. (Мы летим в Париж на следующей неделе.)\n4) Выражение раздражения (с always, constantly, forever): You are always forgetting your keys! (Ты вечно забываешь свои ключи!)"
        },
        {
          problem: "Какие глаголы обычно не используются в Present Continuous?",
          solution: "Глаголы состояния (state verbs) обычно не используются в Present Continuous:\n1) Глаголы мыслительной деятельности: think, know, understand, believe, remember, forget\n2) Глаголы чувств и восприятия: see, hear, smell, taste, feel\n3) Глаголы желания и предпочтения: want, need, prefer, love, hate, like\n4) Другие глаголы: be, have (в значении 'иметь'), own, belong, cost, seem"
        }
      ],
      exercises: [
        {
          problem: "Поставьте глаголы в скобках в Present Continuous:\n1) Look! The children (to play) in the garden.\n2) I (to do) my homework now.\n3) They (to swim) in the pool at the moment.\n4) Listen! Someone (to knock) at the door.",
          answer: "1) Look! The children are playing in the garden.\n2) I am doing my homework now.\n3) They are swimming in the pool at the moment.\n4) Listen! Someone is knocking at the door."
        },
        {
          problem: "Составьте вопросы и отрицания из следующих предложений:\n1) They are watching a movie.\n2) She is cooking dinner.\n3) We are waiting for the bus.",
          answer: "Вопросы:\n1) Are they watching a movie?\n2) Is she cooking dinner?\n3) Are we waiting for the bus?\n\nОтрицания:\n1) They are not (aren't) watching a movie.\n2) She is not (isn't) cooking dinner.\n3) We are not (aren't) waiting for the bus."
        },
        {
          problem: "Заполните пропуски, используя Present Simple или Present Continuous:\n1) Tom usually (go) to work by car, but today he (walk).\n2) Listen! Someone (sing) in the next room.\n3) I (not understand) this rule. Can you explain it again?",
          answer: "1) Tom usually goes to work by car, but today he is walking.\n2) Listen! Someone is singing in the next room.\n3) I don't understand this rule. Can you explain it again?"
        }
      ],
      additionalContent: `
        <h3>Сравнение Present Simple и Present Continuous:</h3>
        <table border="1" cellpadding="5">
          <tr>
            <th>Present Simple</th>
            <th>Present Continuous</th>
          </tr>
          <tr>
            <td>Регулярные, повторяющиеся действия</td>
            <td>Действия, происходящие в момент речи</td>
          </tr>
          <tr>
            <td>Общеизвестные факты</td>
            <td>Временные ситуации</td>
          </tr>
          <tr>
            <td>Постоянные ситуации</td>
            <td>Запланированные действия в ближайшем будущем</td>
          </tr>
          <tr>
            <td>Расписания и программы</td>
            <td>Выражение раздражения (с always, constantly)</td>
          </tr>
        </table>
        
        <h3>Ссылки на видеоуроки:</h3>
        <div class="video-container">
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/ZyJAcZnj9QQ" 
            title="Present Continuous - объяснение на русском" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>
      `
    },
    2: {
      theory: `
        <h2>Прошедшее простое время</h2>
        <p>Прошедшее простое время (Past Simple) используется для выражения действий, которые произошли в определенное время в прошлом и уже завершились.</p>
        
        <p><strong>Основные правила и случаи употребления:</strong></p>
        <ul>
          <li>Действия, которые произошли в прошлом и уже закончились: <em>I visited Paris last year.</em></li>
          <li>Последовательность действий в прошлом: <em>She came home, had dinner and went to bed.</em></li>
          <li>Привычные или повторяющиеся действия в прошлом: <em>When I was a child, I played tennis every day.</em></li>
        </ul>
        
        <h3>Образование:</h3>
        <p>Утвердительная форма:</p>
        <ul>
          <li>Правильные глаголы: подлежащее + глагол с окончанием -ed</li>
          <li>Неправильные глаголы: подлежащее + вторая форма глагола (см. таблицу неправильных глаголов)</li>
        </ul>
        
        <p>Отрицательная форма:</p>
        <ul>
          <li>подлежащее + did not (didn't) + инфинитив без to</li>
        </ul>
        
        <p>Вопросительная форма:</p>
        <ul>
          <li>Did + подлежащее + инфинитив без to?</li>
        </ul>
        
        <h3>Правила добавления окончания -ed:</h3>
        <ol>
          <li>Обычно добавляется -ed: play → played, work → worked</li>
          <li>Если глагол оканчивается на -e, то добавляется только -d: live → lived, love → loved</li>
          <li>Если глагол оканчивается на согласную + y, то y меняется на i + ed: study → studied, try → tried</li>
          <li>Если глагол оканчивается на согласную + гласную + согласную, и ударение падает на последний слог, то последняя согласная удваивается: stop → stopped, plan → planned</li>
        </ol>
        
        <h3>Маркеры времени:</h3>
        <p>Часто используются следующие слова и выражения:</p>
        <ul>
          <li>yesterday (вчера)</li>
          <li>last week/month/year (на прошлой неделе/в прошлом месяце/в прошлом году)</li>
          <li>ago (назад): two days ago, a week ago</li>
          <li>in 1995, in the 20th century (в 1995 году, в 20 веке)</li>
          <li>when I was a child (когда я был ребенком)</li>
        </ul>
        
        <h3>Таблица некоторых неправильных глаголов:</h3>
        <table border="1" cellpadding="5">
          <tr>
            <th>Infinitive</th>
            <th>Past Simple</th>
            <th>Past Participle</th>
            <th>Перевод</th>
          </tr>
          <tr>
            <td>be</td>
            <td>was/were</td>
            <td>been</td>
            <td>быть</td>
          </tr>
          <tr>
            <td>begin</td>
            <td>began</td>
            <td>begun</td>
            <td>начинать</td>
          </tr>
          <tr>
            <td>come</td>
            <td>came</td>
            <td>come</td>
            <td>приходить</td>
          </tr>
          <tr>
            <td>do</td>
            <td>did</td>
            <td>done</td>
            <td>делать</td>
          </tr>
          <tr>
            <td>eat</td>
            <td>ate</td>
            <td>eaten</td>
            <td>есть</td>
          </tr>
          <tr>
            <td>go</td>
            <td>went</td>
            <td>gone</td>
            <td>идти</td>
          </tr>
          <tr>
            <td>have</td>
            <td>had</td>
            <td>had</td>
            <td>иметь</td>
          </tr>
          <tr>
            <td>see</td>
            <td>saw</td>
            <td>seen</td>
            <td>видеть</td>
          </tr>
          <tr>
            <td>take</td>
            <td>took</td>
            <td>taken</td>
            <td>брать</td>
          </tr>
          <tr>
            <td>write</td>
            <td>wrote</td>
            <td>written</td>
            <td>писать</td>
          </tr>
        </table>
      `,
      examples: [
        {
          problem: "Как образуется Past Simple?",
          solution: "Утвердительная форма:\n1) I played tennis yesterday. - Я играл в теннис вчера. (правильный глагол)\n2) She went to school. - Она пошла в школу. (неправильный глагол)\n\nОтрицательная форма:\n1) I did not (didn't) play tennis. - Я не играл в теннис.\n2) She did not (didn't) go to school. - Она не ходила в школу.\n\nВопросительная форма:\n1) Did you play tennis? - Ты играл в теннис?\n2) Did she go to school? - Она ходила в школу?"
        },
        {
          problem: "Какие основные случаи употребления Past Simple?",
          solution: "1) Действия, которые произошли и закончились в прошлом: I saw a good film yesterday. (Я видел хороший фильм вчера.)\n2) Последовательность действий в прошлом: He got up, had breakfast and went to work. (Он встал, позавтракал и пошел на работу.)\n3) Привычные действия в прошлом: When I was young, I played football every weekend. (Когда я был молодым, я играл в футбол каждые выходные.)"
        },
        {
          problem: "Как образуется Past Simple с глаголом 'to be'?",
          solution: "Глагол 'to be' имеет особые формы в Past Simple:\n1) I/he/she/it was ... (Я был/он был/она была/оно было ...)\n2) You/we/they were ... (Ты был/мы были/они были ...)\n\nОтрицательная форма:\n1) I/he/she/it was not (wasn't) ... (Я не был/он не был/она не была/оно не было ...)\n2) You/we/they were not (weren't) ... (Ты не был/мы не были/они не были ...)\n\nВопросительная форма:\n1) Was I/he/she/it ...? (Был ли я/он/она/оно ...?)\n2) Were you/we/they ...? (Был ли ты/мы/они ...?)"
        }
      ],
      exercises: [
        {
          problem: "Поставьте глаголы в скобках в Past Simple:\n1) They (to visit) their grandparents last summer.\n2) She (to buy) a new dress yesterday.\n3) We (to go) to the cinema last week.\n4) He (to write) a letter to his friend.",
          answer: "1) They visited their grandparents last summer.\n2) She bought a new dress yesterday.\n3) We went to the cinema last week.\n4) He wrote a letter to his friend."
        },
        {
          problem: "Составьте вопросы и отрицания из следующих предложений:\n1) She watched TV last night.\n2) They went to the park.\n3) He played football yesterday.",
          answer: "Вопросы:\n1) Did she watch TV last night?\n2) Did they go to the park?\n3) Did he play football yesterday?\n\nОтрицания:\n1) She didn't watch TV last night.\n2) They didn't go to the park.\n3) He didn't play football yesterday."
        },
        {
          problem: "Заполните пропуски, используя правильную форму глагола 'to be' в Past Simple:\n1) I ___ at school yesterday.\n2) They ___ at the cinema last Sunday.\n3) She ___ not at home when I called.\n4) ___ you at the party last night?",
          answer: "1) I was at school yesterday.\n2) They were at the cinema last Sunday.\n3) She was not (wasn't) at home when I called.\n4) Were you at the party last night?"
        }
      ],
      additionalContent: `
        <h3>Важные моменты:</h3>
        <ul>
          <li>В вопросах и отрицаниях основной глагол всегда используется в форме инфинитива без to, вне зависимости от того, правильный это глагол или неправильный.</li>
          <li>Обратите внимание, что глагол "to be" (was/were) образует вопросы и отрицания без вспомогательного глагола did.</li>
          <li>Для выражения привычных действий в прошлом также можно использовать конструкцию "used to + инфинитив": When I was a child, I used to play in the garden. (Когда я был ребенком, я обычно играл в саду.)</li>
        </ul>
        
        <h3>Ссылки на видеоуроки:</h3>
        <div class="video-container">
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/JmmzKmQpvoE" 
            title="Past Simple - объяснение на русском" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>
      `
    },
    3: {
      theory: `
        <h2>Будущее простое время</h2>
        <p>Будущее простое время (Future Simple) используется для выражения действий, которые произойдут в будущем.</p>
        
        <p><strong>Основные правила и случаи употребления:</strong></p>
        <ul>
          <li>Предсказания о будущем: <em>It will rain tomorrow.</em></li>
          <li>Спонтанные решения: <em>I'll help you with your bags.</em></li>
          <li>Обещания: <em>I will always love you.</em></li>
          <li>Предложения и просьбы: <em>Will you help me?</em></li>
          <li>Действия, которые невозможно контролировать: <em>I will be 30 next year.</em></li>
        </ul>
        
        <h3>Образование:</h3>
        <p>Утвердительная форма:</p>
        <ul>
          <li>подлежащее + will (сокращенно 'll) + инфинитив без to</li>
        </ul>
        
        <p>Отрицательная форма:</p>
        <ul>
          <li>подлежащее + will not (won't) + инфинитив без to</li>
        </ul>
        
        <p>Вопросительная форма:</p>
        <ul>
          <li>Will + подлежащее + инфинитив без to?</li>
        </ul>
        
        <h3>Другие способы выражения будущего:</h3>
        <ol>
          <li>be going to + инфинитив: используется для выражения планов и намерений, а также предсказаний, основанных на настоящей ситуации:
            <ul>
              <li>I am going to visit my grandmother next week. (Я собираюсь навестить бабушку на следующей неделе.)</li>
              <li>Look at those black clouds. It's going to rain. (Посмотри на эти черные тучи. Сейчас пойдет дождь.)</li>
            </ul>
          </li>
          <li>Present Continuous (настоящее длительное время) для запланированных действий:
            <ul>
              <li>We are flying to New York tomorrow. (Мы летим в Нью-Йорк завтра.)</li>
            </ul>
          </li>
          <li>Present Simple (настоящее простое время) для действий по расписанию:
            <ul>
              <li>The train leaves at 5 p.m. (Поезд отправляется в 5 вечера.)</li>
            </ul>
          </li>
        </ol>
        
        <h3>Маркеры времени:</h3>
        <p>Часто используются следующие слова и выражения:</p>
        <ul>
          <li>tomorrow (завтра)</li>
          <li>next week/month/year (на следующей неделе/в следующем месяце/в следующем году)</li>
          <li>in the future (в будущем)</li>
          <li>in 2030, in the 22nd century (в 2030 году, в 22 веке)</li>
          <li>soon (скоро)</li>
          <li>tonight (сегодня вечером)</li>
        </ul>
      `,
      examples: [
        {
          problem: "Как образуется Future Simple?",
          solution: "Утвердительная форма:\n1) I will (I'll) play tennis tomorrow. - Я буду играть в теннис завтра.\n2) She will (she'll) go to school. - Она пойдет в школу.\n\nОтрицательная форма:\n1) I will not (won't) play tennis. - Я не буду играть в теннис.\n2) She will not (won't) go to school. - Она не пойдет в школу.\n\nВопросительная форма:\n1) Will you play tennis? - Ты будешь играть в теннис?\n2) Will she go to school? - Она пойдет в школу?"
        },
        {
          problem: "Какие основные случаи употребления Future Simple?",
          solution: "1) Предсказания о будущем: I think our team will win the match. (Я думаю, наша команда выиграет матч.)\n2) Спонтанные решения: Oh, I've left my phone at home. I'll go back and get it. (О, я оставил телефон дома. Я вернусь и возьму его.)\n3) Обещания: I will call you when I arrive. (Я позвоню тебе, когда приеду.)\n4) Предложения и просьбы: Will you help me with my homework? (Ты поможешь мне с домашним заданием?)\n5) Действия, которые невозможно контролировать: The sun will rise at 5:30 tomorrow. (Солнце взойдет завтра в 5:30.)"
        },
        {
          problem: "В чем разница между 'will' и 'be going to'?",
          solution: "Will:\n1) Предсказания, основанные на личном мнении: I think it will rain tomorrow. (Я думаю, завтра пойдет дождь.)\n2) Спонтанные решения: The phone is ringing. I'll answer it. (Звонит телефон. Я отвечу.)\n3) Обещания и предложения: I'll help you with your homework. (Я помогу тебе с домашним заданием.)\n\nBe going to:\n1) Планы и намерения: I'm going to study medicine when I graduate. (Я собираюсь изучать медицину, когда закончу учебу.)\n2) Предсказания, основанные на настоящей ситуации: Look at those clouds. It's going to rain. (Посмотри на эти облака. Сейчас пойдет дождь.)"
        }
      ],
      exercises: [
        {
          problem: "Составьте предложения в Future Simple:\n1) I / to visit / my friends / next week\n2) She / not / to buy / this dress\n3) They / to go / to the beach / tomorrow?\n4) We / to have / a party / next Saturday",
          answer: "1) I will visit my friends next week.\n2) She will not (won't) buy this dress.\n3) Will they go to the beach tomorrow?\n4) We will have a party next Saturday."
        },
        {
          problem: "Выберите правильный вариант: 'will' или 'going to':\n1) I've decided what to do. I (will/am going to) study art.\n2) The sky is very dark. It (will/is going to) rain.\n3) I'm sure she (will/is going to) pass the exam.\n4) I can't carry all these bags. I (will/am going to) help you.",
          answer: "1) I've decided what to do. I am going to study art. (запланированное действие)\n2) The sky is very dark. It is going to rain. (предсказание, основанное на настоящей ситуации)\n3) I'm sure she will pass the exam. (предсказание, основанное на личном мнении)\n4) I can't carry all these bags. I will help you. (спонтанное решение)"
        },
        {
          problem: "Переведите на английский язык:\n1) Я думаю, завтра будет хорошая погода.\n2) Смотри! Тот человек сейчас упадет.\n3) Мы собираемся переехать в новую квартиру в следующем месяце.\n4) Ты поможешь мне с этой задачей?",
          answer: "1) I think it will be good weather tomorrow.\n2) Look! That man is going to fall.\n3) We are going to move to a new apartment next month.\n4) Will you help me with this task?"
        }
      ],
      additionalContent: `
        <h3>Важные моменты:</h3>
        <ul>
          <li>В разговорной речи часто используется сокращенная форма 'll вместо will: I'll, he'll, she'll, it'll, we'll, you'll, they'll.</li>
          <li>В придаточных предложениях условия (после if) и времени (после when, before, after, until, as soon as) вместо будущего времени используется настоящее: I'll call you when I arrive (not: when I will arrive). (Я позвоню тебе, когда приеду.)</li>
          <li>Будьте внимательны при выборе между Future Simple (will) и конструкцией be going to. Они могут использоваться в схожих ситуациях, но имеют некоторые различия в оттенках значения.</li>
        </ul>
        
        <h3>Ссылки на видеоуроки:</h3>
        <div class="video-container">
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/hMK5uzWVOmI" 
            title="Future Simple (Will) - объяснение на русском" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>
      `
    }
  },
  "6": {
    0: {
      theory: `
        <h2>Настоящее совершенное время</h2>
        <p>Настоящее совершенное время (Present Perfect) используется для выражения действий, которые произошли в прошлом, но имеют связь с настоящим временем.</p>
        
        <p><strong>Основные правила и случаи употребления:</strong></p>
        <ul>
          <li>Действия, которые завершились к настоящему моменту, но точное время не указывается: <em>I have visited Paris.</em> (Я посетил Париж. - когда-то в жизни)</li>
          <li>Действия, которые начались в прошлом и продолжаются до настоящего времени: <em>She has lived here for five years.</em> (Она живет здесь пять лет. - и продолжает жить)</li>
          <li>Недавно завершившиеся действия, результат которых заметен в настоящем: <em>I have broken my arm.</em> (Я сломал руку. - и сейчас она в гипсе)</li>
        </ul>
        
        <h3>Образование:</h3>
        <p>Утвердительная форма:</p>
        <ul>
          <li>подлежащее + have/has + причастие прошедшего времени (Past Participle)</li>
          <li>I/you/we/they have (сокращенно 've) + Past Participle</li>
          <li>he/she/it has (сокращенно 's) + Past Participle</li>
        </ul>
        
        <p>Отрицательная форма:</p>
        <ul>
          <li>подлежащее + have/has not (haven't/hasn't) + Past Participle</li>
        </ul>
        
        <p>Вопросительная форма:</p>
        <ul>
          <li>Have/Has + подлежащее + Past Participle?</li>
        </ul>
        
        <h3>Причастие прошедшего времени (Past Participle):</h3>
        <ol>
          <li>Для правильных глаголов: основа глагола + -ed (так же, как Past Simple)</li>
          <li>Для неправильных глаголов: третья форма глагола (см. таблицу неправильных глаголов)</li>
        </ol>
        
        <h3>Маркеры времени:</h3>
        <p>Часто используются следующие слова и выражения:</p>
        <ul>
          <li>just (только что): I have just finished my homework.</li>
          <li>already (уже): She has already seen this film.</li>
          <li>yet (уже/еще) в вопросах и отрицаниях: Have you done your homework yet? I haven't seen that film yet.</li>
          <li>ever (когда-либо): Have you ever been to Paris?</li>
          <li>never (никогда): I have never eaten sushi.</li>
          <li>for (в течение): I have known him for ten years.</li>
          <li>since (с): She has lived here since 2010.</li>
          <li>recently/lately (в последнее время): We have recently moved to a new house.</li>
        </ul>
        
        <h3>Таблица некоторых неправильных глаголов:</h3>
        <table border="1" cellpadding="5">
          <tr>
            <th>Infinitive</th>
            <th>Past Simple</th>
            <th>Past Participle</th>
            <th>Перевод</th>
          </tr>
          <tr>
            <td>be</td>
            <td>was/were</td>
            <td>been</td>
            <td>быть</td>
          </tr>
          <tr>
            <td>begin</td>
            <td>began</td>
            <td>begun</td>
            <td>начинать</td>
          </tr>
          <tr>
            <td>break</td>
            <td>broke</td>
            <td>broken</td>
            <td>ломать</td>
          </tr>
          <tr>
            <td>bring</td>
            <td>brought</td>
            <td>brought</td>
            <td>приносить</td>
          </tr>
          <tr>
            <td>buy</td>
            <td>bought</td>
            <td>bought</td>
            <td>покупать</td>
          </tr>
          <tr>
            <td>come</td>
            <td>came</td>
            <td>come</td>
            <td>приходить</td>
          </tr>
          <tr>
            <td>do</td>
            <td>did</td>
            <td>done</td>
            <td>делать</td>
          </tr>
          <tr>
            <td>drink</td>
            <td>drank</td>
            <td>drunk</td>
            <td>пить</td>
          </tr>
          <tr>
            <td>eat</td>
            <td>ate</td>
            <td>eaten</td>
            <td>есть</td>
          </tr>
          <tr>
            <td>fall</td>
            <td>fell</td>
            <td>fallen</td>
            <td>падать</td>
          </tr>
        </table>
      `,
      examples: [
        {
          problem: "Как образуется Present Perfect?",
          solution: "Утвердительная форма:\n1) I have played tennis. - Я играл в теннис (когда-то в жизни).\n2) She has gone to school. - Она пошла в школу (и еще не вернулась).\n\nОтрицательная форма:\n1) I have not (haven't) played tennis. - Я не играл в теннис.\n2) She has not (hasn't) gone to school. - Она не ушла в школу.\n\nВопросительная форма:\n1) Have you played tennis? - Ты играл в теннис?\n2) Has she gone to school? - Она ушла в школу?"
        },
        {
          problem: "Какие основные случаи употребления Present Perfect?",
          solution: "1) Опыт в жизни (без указания конкретного времени): I have been to London. (Я был в Лондоне.)\n2) Недавно завершившиеся действия: I have just finished my work. (Я только что закончил свою работу.)\n3) Действия, которые начались в прошлом и продолжаются до настоящего времени: I have lived here for ten years. (Я живу здесь десять лет.)\n4) Действия, которые повторялись несколько раз до настоящего момента: I have seen this film three times. (Я видел этот фильм три раза.)"
        },
        {
          problem: "В чем разница между Present Perfect и Past Simple?",
          solution: "Present Perfect:\n1) Используется, когда время действия не важно, важен результат или опыт: I have broken my leg. (Я сломал ногу. - важно то, что она сломана сейчас)\n2) Используется с периодами времени, которые еще не закончились: I have read two books this week. (Я прочитал две книги на этой неделе. - неделя еще не закончилась)\n\nPast Simple:\n1) Используется, когда важно время, когда произошло действие: I broke my leg yesterday. (Я сломал ногу вчера. - указано конкретное время)\n2) Используется с законченными периодами времени: I read two books last week. (Я прочитал две книги на прошлой неделе. - неделя уже закончилась)"
        }
      ],
      exercises: [
        {
          problem: "Составьте предложения в Present Perfect:\n1) I / already / to finish / my homework\n2) She / never / to be / to Paris\n3) They / just / to arrive\n4) We / not / to see / this film / yet",
          answer: "1) I have already finished my homework.\n2) She has never been to Paris.\n3) They have just arrived.\n4) We have not (haven't) seen this film yet."
        },
        {
          problem: "Составьте вопросы в Present Perfect:\n1) you / ever / to visit / London?\n2) she / to finish / her work / yet?\n3) they / to arrive / already?\n4) how many times / you / to read / this book?",
          answer: "1) Have you ever visited London?\n2) Has she finished her work yet?\n3) Have they arrived already?\n4) How many times have you read this book?"
        },
        {
          problem: "Выберите правильный вариант: Present Perfect или Past Simple:\n1) I (have seen / saw) this film last week.\n2) She (has lived / lived) in Moscow since 2010.\n3) We (have visited / visited) the museum three times.\n4) When (have you bought / did you buy) this car?",
          answer: "1) I saw this film last week. (Past Simple, так как указано конкретное время - last week)\n2) She has lived in Moscow since 2010. (Present Perfect, действие продолжается до настоящего времени)\n3) We have visited the museum three times. (Present Perfect, отсутствует указание на конкретное время)\n4) When did you buy this car? (Past Simple, вопрос о конкретном времени)"
        }
      ],
      additionalContent: `
        <h3>Важные моменты:</h3>
        <ul>
          <li>Present Perfect часто переводится на русский язык прошедшим временем, что может вызывать путаницу.</li>
          <li>Present Perfect не используется с выражениями, указывающими на завершенное время в прошлом: yesterday, last week, in 2010, when и т.д. В этих случаях используется Past Simple.</li>
          <li>Существует также время Present Perfect Continuous, которое делает акцент на длительность действия, а не на его результат: I have been living here for ten years. (Я живу здесь десять лет. - акцент на длительность)</li>
          <li>Важно различать have как вспомогательный глагол в Present Perfect и have как смысловой глагол в значении 'иметь': I have a car. (У меня есть машина.) vs. I have bought a car. (Я купил машину.)</li>
        </ul>
        
        <h3>Сравнение Present Perfect и Past Simple:</h3>
        <table border="1" cellpadding="5">
          <tr>
            <th>Present Perfect</th>
            <th>Past Simple</th>
          </tr>
          <tr>
            <td>Время не указано или не важно</td>
            <td>Время указано или важно</td>
          </tr>
          <tr>
            <td>Связь с настоящим</td>
            <td>Нет связи с настоящим</td>
          </tr>
          <tr>
            <td>Используется с: just, already, yet, ever, never, for, since</td>
            <td>Используется с: yesterday, ago, last week, in 2010, when</td>
          </tr>
          <tr>
            <td>I have lost my keys. (Я потерял ключи. - и сейчас не могу их найти)</td>
            <td>I lost my keys yesterday. (Я потерял ключи вчера. - когда именно это произошло)</td>
          </tr>
        </table>
        
        <h3>Ссылки на видеоуроки:</h3>
        <div class="video-container">
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/3VbuczGvzfs" 
            title="Present Perfect - объяснение на русском" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>
      `
    },
    1: {
      theory: `
        <h2>Прошедшее длительное время</h2>
        <p>Прошедшее длительное время (Past Continuous) используется для выражения действий, которые происходили в определенный момент в прошлом или служили фоном для других действий.</p>
        
        <p><strong>Основные правила и случаи употребления:</strong></p>
        <ul>
          <li>Действия, происходившие в определенный момент в прошлом: <em>At 7 o'clock yesterday I was having dinner.</em> (Вчера в 7 часов я ужинал.)</li>
          <li>Действия, происходившие в течение некоторого времени в прошлом: <em>Yesterday evening I was working on my project.</em> (Вчера вечером я работал над своим проектом.)</li>
          <li>Два параллельных длительных действия в прошлом: <em>While I was cooking, my sister was watching TV.</em> (Пока я готовил, моя сестра смотрела телевизор.)</li>
          <li>Фоновое действие, во время которого произошло другое, более короткое действие: <em>I was walking home when it started to rain.</em> (Я шел домой, когда начался дождь.)</li>
        </ul>
        
        <h3>Образование:</h3>
        <p>Утвердительная форма:</p>
        <ul>
          <li>подлежащее + was/were + глагол с окончанием -ing</li>
          <li>I/he/she/it was + глагол с окончанием -ing</li>
          <li>you/we/they were + глагол с окончанием -ing</li>
        </ul>
        
        <p>Отрицательная форма:</p>
        <ul>
          <li>подлежащее + was/were not (wasn't/weren't) + глагол с окончанием -ing</li>
        </ul>
        
        <p>Вопросительная форма:</p>
        <ul>
          <li>Was + I/he/she/it + глагол с окончанием -ing?</li>
          <li>Were + you/we/they + глагол с окончанием -ing?</li>
        </ul>
        
        <h3>Правила добавления окончания -ing:</h3>
        <ol>
          <li>Обычно добавляется -ing: play → playing, read → reading</li>
          <li>Если глагол оканчивается на -e, то e опускается: write → writing, make → making</li>
          <li>Если глагол оканчивается на согласную + гласную + согласную, и ударение падает на последний слог, то последняя согласная удваивается: run → running, swim → swimming</li>
          <li>Если глагол оканчивается на -ie, то ie меняется на y + ing: lie → lying, die → dying</li>
        </ol>
        
        <h3>Маркеры времени:</h3>
        <p>Часто используются следующие слова и выражения:</p>
        <ul>
          <li>at that moment (в тот момент)</li>
          <li>at this time yesterday (в это время вчера)</li>
          <li>from 5 to 6 yesterday (вчера с 5 до 6)</li>
          <li>all day/morning/evening (весь день/утро/вечер)</li>
          <li>while (в то время как, пока)</li>
          <li>when (когда)</li>
        </ul>
      `,
      examples: [
        {
          problem: "Как образуется Past Continuous?",
          solution: "Утвердительная форма:\n1) I was reading a book at 7 o'clock yesterday. - Я читал книгу вчера в 7 часов.\n2) They were watching TV when I came. - Они смотрели телевизор, когда я пришел.\n\nОтрицательная форма:\n1) I was not (wasn't) reading a book. - Я не читал книгу.\n2) They were not (weren't) watching TV. - Они не смотрели телевизор.\n\nВопросительная форма:\n1) Was I reading a book? - Я читал книгу?\n2) Were they watching TV? - Они смотрели телевизор?"
        },
        {
          problem: "Какие основные случаи употребления Past Continuous?",
          solution: "1) Действия, происходившие в определенный момент в прошлом: At 10 p.m. last night I was studying. (Вчера в 10 вечера я занимался.)\n2) Действия, происходившие в течение некоторого времени в прошлом: I was working all day yesterday. (Я работал весь день вчера.)\n3) Два параллельных длительных действия в прошлом: While I was reading, my wife was cooking. (Пока я читал, моя жена готовила.)\n4) Фоновое действие, во время которого произошло другое, более короткое действие: I was walking in the park when I met my friend. (Я гулял в парке, когда встретил своего друга.)"
        },
        {
          problem: "В чем разница между Past Simple и Past Continuous?",
          solution: "Past Simple:\n1) Завершенные действия в прошлом: I visited Paris last year. (Я посетил Париж в прошлом году.)\n2) Последовательность действий в прошлом: I got up, had breakfast and went to work. (Я встал, позавтракал и пошел на работу.)\n\nPast Continuous:\n1) Действие, происходившее в определенный момент в прошлом: At 9 o'clock yesterday I was working. (Вчера в 9 часов я работал.)\n2) Длительное действие, прерванное другим, более коротким действием: I was taking a shower when the phone rang. (Я принимал душ, когда зазвонил телефон.)"
        }
      ],
      exercises: [
        {
          problem: "Поставьте глаголы в скобках в Past Continuous:\n1) I (to sleep) when the phone rang.\n2) What you (to do) at 8 p.m. yesterday?\n3) We (to walk) in the park all day.\n4) She (not / to watch) TV when I came.",
          answer: "1) I was sleeping when the phone rang.\n2) What were you doing at 8 p.m. yesterday?\n3) We were walking in the park all day.\n4) She was not (wasn't) watching TV when I came."
        },
        {
          problem: "Составьте предложения, используя Past Continuous или Past Simple:\n1) When I (to see) her, she (to cross) the street.\n2) I (to call) him while he (to have) a shower.\n3) When the fire (to start), we (to sleep).\n4) He (to fall) off the ladder while he (to paint) the ceiling.",
          answer: "1) When I saw her, she was crossing the street.\n2) I called him while he was having a shower.\n3) When the fire started, we were sleeping.\n4) He fell off the ladder while he was painting the ceiling."
        },
        {
          problem: "Заполните пропуски, используя Past Simple или Past Continuous:\n1) I ___ (to read) a book when someone ___ (to knock) at the door.\n2) While we ___ (to have) dinner, the lights ___ (to go) out.\n3) What ___ you ___ (to do) when I ___ (to call) you yesterday?",
          answer: "1) I was reading a book when someone knocked at the door.\n2) While we were having dinner, the lights went out.\n3) What were you doing when I called you yesterday?"
        }
      ],
      additionalContent: `
        <h3>Важные моменты:</h3>
        <ul>
          <li>Past Continuous часто используется с Past Simple для противопоставления фонового (длительного) действия и короткого действия, которое его прервало.</li>
          <li>Как и в Present Continuous, глаголы состояния (state verbs) обычно не используются в Past Continuous: know, believe, like, love, hate, want, need, и др.</li>
          <li>Past Continuous может также использоваться для описания действий, которые происходили одновременно, с союзом while: While I was cooking, my husband was cleaning the house. (Пока я готовила, мой муж убирал дом.)</li>
        </ul>
        
        <h3>Сравнение Past Simple и Past Continuous:</h3>
        <table border="1" cellpadding="5">
          <tr>
            <th>Past Simple</th>
            <th>Past Continuous</th>
          </tr>
          <tr>
            <td>Завершенные действия в прошлом</td>
            <td>Действия, которые происходили в определенный момент или период в прошлом</td>
          </tr>
          <tr>
            <td>Последовательность действий</td>
            <td>Параллельные действия</td>
          </tr>
          <tr>
            <td>Короткие, прерывающие действия</td>
            <td>Длительные, фоновые действия</td>
          </tr>
          <tr>
            <td>Обычно используется с: yesterday, ago, last week, in 2010, when</td>
            <td>Обычно используется с: at that time, while, when, all day</td>
          </tr>
        </table>
        
        <h3>Ссылки на видеоуроки:</h3>
        <div class="video-container">
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/QF4Bh42IXeU" 
            title="Past Continuous - объяснение на русском" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>
      `
    }
  }
};
