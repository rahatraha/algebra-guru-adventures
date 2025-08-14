
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'ru' | 'kz';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ru: {
    'home': 'Главная',
    'mathematics': 'Математика',
    'russian': 'Русский язык',
    'english': 'Английский язык',
    'history': 'История',
    'geography': 'География',
    'kazakh': 'Казахский язык',
    'calculator': 'Калькулятор',
    'achievements': 'Достижения',
    'forum': 'Форум',
    'profile': 'Профиль',
    'settings': 'Настройки',
    'logout': 'Выйти',
    'welcome': 'Добро пожаловать в Мир Знаний',
    'subtitle': 'Изучайте школьные предметы в интерактивной форме',
    'level': 'Уровень',
    'to_next_level': 'XP до следующего уровня',
    'streak': 'дня подряд',
    'achievements_count': 'достижений',
    'start_learning': 'Начать обучение',
    'daily_challenge': 'Ежедневный вызов',
    'new_task': 'Новое задание',
    'solve_task': 'Решите задание и получите дополнительные XP!',
    'start_challenge': 'Начать вызов',
    'grade': 'класс',
    'grades': 'классы',
    'theory': 'Теория',
    'examples': 'Примеры',
    'exercises': 'Упражнения',
    'topic_not_found': 'Тема не найдена',
    'topic_not_found_message': 'Извините, запрашиваемая тема не существует или была удалена.',
    'example': 'Пример',
    'exercise': 'Упражнение',
    'solution': 'Решение',
    'show_answer': 'Показать ответ',
    'hide_answer': 'Скрыть ответ',
    'video_lessons': 'Видеоуроки',
    'additional_materials': 'Дополнительные материалы',
    'watch_video': 'Смотреть видео',
    'practice_exercises': 'Практические упражнения',
    'test_knowledge': 'Проверить знания',
    'learn_more': 'Узнать больше'
  },
  kz: {
    'home': 'Басты бет',
    'mathematics': 'Математика',
    'russian': 'Орыс тілі',
    'english': 'Ағылшын тілі',
    'history': 'Тарих',
    'geography': 'География',
    'kazakh': 'Қазақ тілі',
    'calculator': 'Калькулятор',
    'achievements': 'Жетістіктер',
    'forum': 'Форум',
    'profile': 'Профиль',
    'settings': 'Параметрлер',
    'logout': 'Шығу',
    'welcome': 'Білім Әлеміне қош келдіңіз',
    'subtitle': 'Мектеп пәндерін интерактивті түрде оқыңыз',
    'level': 'Деңгей',
    'to_next_level': 'Келесі деңгейге дейін XP',
    'streak': 'күн қатарынан',
    'achievements_count': 'жетістіктер',
    'start_learning': 'Оқуды бастау',
    'daily_challenge': 'Күнделікті мәселе',
    'new_task': 'Жаңа тапсырма',
    'solve_task': 'Тапсырманы шешіп, қосымша XP алыңыз!',
    'start_challenge': 'Сынақты бастау',
    'grade': 'сынып',
    'grades': 'сыныптар',
    'theory': 'Теория',
    'examples': 'Мысалдар',
    'exercises': 'Жаттығулар',
    'topic_not_found': 'Тақырып табылмады',
    'topic_not_found_message': 'Кешіріңіз, сұралған тақырып жоқ немесе жойылды.',
    'example': 'Мысал',
    'exercise': 'Жаттығу',
    'solution': 'Шешім',
    'show_answer': 'Жауабын көрсету',
    'hide_answer': 'Жауабын жасыру',
    'video_lessons': 'Видеосабақтар',
    'additional_materials': 'Қосымша материалдар',
    'watch_video': 'Видео көру',
    'practice_exercises': 'Практикалық жаттығулар',
    'test_knowledge': 'Білімді тексеру',
    'learn_more': 'Көбірек білу'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
