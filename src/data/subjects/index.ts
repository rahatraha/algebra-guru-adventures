
import { russianData } from './russian';
import { mathematicsData } from './mathematics';
import { geographyData } from './geography';
import { historyData } from './history';
import { englishData } from './english';
import { kazakhData } from './kazakh';
import { SubjectsData } from './types';

export const topics: SubjectsData = {
  russian: russianData,
  mathematics: mathematicsData,
  algebra: mathematicsData, // алиас для математики
  geography: geographyData,
  history: historyData,
  english: englishData,
  kazakh: kazakhData
};

// Language translations for subject names
export const subjectNames = {
  ru: {
    russian: "Русский язык",
    literature: "Литература",
    algebra: "Алгебра",
    geometry: "Геометрия",
    history: "История",
    geography: "География",
    physics: "Физика",
    chemistry: "Химия",
    biology: "Биология",
    social: "Обществознание",
    informatics: "Информатика",
    english: "Английский язык",
    kazakh: "Казахский язык",
    mathematics: "Математика"
  },
  kz: {
    russian: "Орыс тілі",
    literature: "Әдебиет",
    algebra: "Алгебра",
    geometry: "Геометрия",
    history: "Тарих",
    geography: "География",
    physics: "Физика",
    chemistry: "Химия",
    biology: "Биология",
    social: "Қоғамтану",
    informatics: "Информатика",
    english: "Ағылшын тілі",
    kazakh: "Қазақ тілі",
    mathematics: "Математика"
  }
};
