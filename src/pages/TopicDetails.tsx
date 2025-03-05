
import { useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { topics } from "../data/subjects";
import { TheoryContent } from "@/components/topic/TheoryContent";
import { ExamplesContent } from "@/components/topic/ExamplesContent";
import { ExercisesContent } from "@/components/topic/ExercisesContent";
import { useLanguage } from "@/contexts/LanguageContext";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { YoutubeVideo } from "@/components/topic/YoutubeVideo";

// YouTube video IDs for each subject
const subjectVideos = {
  mathematics: [
    "M9S5wG6_314", // Khan Academy math basics
    "EsDhJg9fH-c", // Math for beginners
    "pTnEG_WGd2Q"  // Math principles
  ],
  algebra: [
    "LwCRRUa9D1g", // Algebra basics
    "i6sbjtJjmyQ", // Linear equations
    "XUxJSVReKEQ"  // Quadratic equations
  ],
  russian: [
    "c7D5nzOEh8k", // Russian language basics
    "LTysUdbJg6s", // Russian grammar
    "Hr5LkW-SHdM"  // Russian vocabulary
  ],
  english: [
    "tL2M_VmKCh0", // English for beginners
    "XAD0tuZZcfU", // English grammar
    "wKRDSLtgVJA"  // English vocabulary
  ],
  kazakh: [
    "LuVQWech6qk", // Kazakh language basics
    "yYIYnreFbmc", // Kazakh grammar
    "VHCJE0prs8A"  // Kazakh vocabulary
  ],
  geography: [
    "LWLl9RVN4QM", // Geography basics
    "K5yYBCgZ2ew", // Countries and capitals
    "qrp0t8xTiF8"  // Earth's structure
  ],
  history: [
    "Yocja_N5s1I", // World history
    "C6rQ6xQ0ByA", // Ancient civilizations
    "LL_VKCGzpCU"  // Modern history
  ]
};

// Additional educational resources for each subject
const additionalResources = {
  mathematics: {
    ru: [
      "Математика 5-9 классы - Виленкин Н.Я.",
      "Сборник задач по математике - Мерзляк А.Г.", 
      "Алгебра и начала анализа - Колмогоров А.Н."
    ],
    kz: [
      "Математика 5-9 сыныптар - Алдамуратова Т.А.",
      "Математикадан есептер жинағы - Әбілқасымова А.",
      "Алгебра және анализ бастамасы - Шыныбеков Ә.Н."
    ]
  },
  algebra: {
    ru: [
      "Алгебра 7-9 классы - Макарычев Ю.Н.",
      "Сборник задач по алгебре - Мерзляк А.Г.",
      "Алгебра и начала анализа - Алимов Ш.А."
    ],
    kz: [
      "Алгебра 7-9 сыныптар - Әбілқасымова А.",
      "Алгебрадан есептер жинағы - Әбілқасымова А.",
      "Алгебра және анализ бастамасы - Шыныбеков Ә.Н."
    ]
  },
  russian: {
    ru: [
      "Русский язык 5-9 классы - Ладыженская Т.А.",
      "Сборник упражнений по русскому языку - Богданова Г.А.",
      "Русский язык. Теория - Бабайцева В.В."
    ],
    kz: [
      "Орыс тілі 5-9 сыныптар - Сабитова З.К.",
      "Орыс тілінен жаттығулар жинағы - Мусатаева М.Ш.",
      "Орыс тілі. Теория - Нуршаихова Ж.А."
    ]
  },
  english: {
    ru: [
      "Английский язык 5-9 классы - Кузовлев В.П.",
      "Грамматика английского языка - Голицынский Ю.Б.",
      "Essential Grammar in Use - Raymond Murphy"
    ],
    kz: [
      "Ағылшын тілі 5-9 сыныптар - Аяпова Т.Т.",
      "Ағылшын тілінің грамматикасы - Асқарова Н.А.",
      "Essential Grammar in Use - Raymond Murphy"
    ]
  },
  kazakh: {
    ru: [
      "Казахский язык 5-9 классы - Жанпеисова У.А.",
      "Сборник упражнений по казахскому языку - Бектуров Ш.К.",
      "Казахский язык для всех - Оразбаева Ф.Ш."
    ],
    kz: [
      "Қазақ тілі 5-9 сыныптар - Жанпейісова У.Ә.",
      "Қазақ тілінен жаттығулар жинағы - Бектұров Ш.К.",
      "Қазақ тілі барлығына - Оразбаева Ф.Ш."
    ]
  },
  geography: {
    ru: [
      "География 5-9 классы - Домогацких Е.М.",
      "Атлас по географии - Дрофа",
      "Физическая география - Крылова О.В."
    ],
    kz: [
      "География 5-9 сыныптар - Бейсенова Ә.С.",
      "Географиялық атлас - Дрофа",
      "Физикалық география - Карпова З.П."
    ]
  },
  history: {
    ru: [
      "История 5-9 классы - Вигасин А.А., Агибалова Е.В.",
      "Атлас по истории - Дрофа",
      "Всемирная история - Уколова В.И."
    ],
    kz: [
      "Тарих 5-9 сыныптар - Қожахмет-ұлы К.",
      "Тарихи атлас - Дрофа",
      "Әлем тарихы - Қасымбаев Ж."
    ]
  }
};

// Online educational platforms
const onlinePlatforms = {
  ru: [
    { name: "Coursera", url: "https://www.coursera.org/browse/arts-and-humanities" },
    { name: "Khan Academy", url: "https://ru.khanacademy.org/" },
    { name: "Stepik", url: "https://stepik.org/catalog" },
    { name: "InternetUrok", url: "https://interneturok.ru/" }
  ],
  kz: [
    { name: "BilimLand", url: "https://bilimland.kz/" },
    { name: "Daryn Online", url: "https://www.daryn.online/" },
    { name: "OpenAlmaU", url: "https://open.almau.edu.kz/" },
    { name: "Kundelik", url: "https://kundelik.kz/" }
  ]
};

// Educational apps
const educationalApps = {
  ru: [
    "Photomath - решение математических задач",
    "Quizlet - изучение с карточками",
    "Duolingo - изучение языков",
    "GeoGebra - интерактивная математика"
  ],
  kz: [
    "Photomath - математикалық есептердің шешімі",
    "Quizlet - карточкалармен оқыту",
    "Duolingo - тілдерді үйрену",
    "GeoGebra - интерактивті математика"
  ]
};

// Key formulas by subject
const keyFormulas = {
  mathematics: {
    ru: [
      "Площадь прямоугольника: S = a×b",
      "Площадь треугольника: S = (a×h)/2",
      "Объем параллелепипеда: V = a×b×c",
      "Теорема Пифагора: a²+b²=c²"
    ],
    kz: [
      "Тікбұрыштың ауданы: S = a×b",
      "Үшбұрыштың ауданы: S = (a×h)/2",
      "Параллелепипедтің көлемі: V = a×b×c",
      "Пифагор теоремасы: a²+b²=c²"
    ]
  },
  algebra: {
    ru: [
      "Квадратное уравнение: ax²+bx+c=0",
      "Дискриминант: D = b²-4ac",
      "Корни квадратного уравнения: x = (-b±√D)/2a",
      "Сумма арифметической прогрессии: Sn = ((a₁+aₙ)×n)/2"
    ],
    kz: [
      "Квадраттық теңдеу: ax²+bx+c=0",
      "Дискриминант: D = b²-4ac",
      "Квадраттық теңдеу түбірлері: x = (-b±√D)/2a",
      "Арифметикалық прогрессияның қосындысы: Sn = ((a₁+aₙ)×n)/2"
    ]
  }
};

const TopicDetails = () => {
  const { subject, grade, topicId } = useParams();
  const { t, locale } = useLanguage();
  
  if (!subject || !grade || !topicId || !topics[subject]?.[grade]?.[topicId]) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Card className="p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('topic_not_found')}</h2>
              <p className="text-gray-600">{t('topic_not_found_message')}</p>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  const content = topics[subject][grade][topicId];
  
  // Get related topics (other topics in the same subject and grade)
  const relatedTopics = Object.keys(topics[subject][grade])
    .filter(id => id !== topicId)
    .slice(0, 3);
  
  // Get the subject name based on the current language
  const getSubjectTitle = () => {
    const subjectKeys = {
      "mathematics": ["Математика", "Математика"],
      "algebra": ["Алгебра", "Алгебра"],
      "russian": ["Русский язык", "Орыс тілі"],
      "english": ["Английский язык", "Ағылшын тілі"],
      "kazakh": ["Казахский язык", "Қазақ тілі"],
      "geography": ["География", "География"],
      "history": ["История", "Тарих"]
    };
    
    return subjectKeys[subject] ? (locale === 'ru' ? subjectKeys[subject][0] : subjectKeys[subject][1]) : subject;
  };

  // Get videos for current subject
  const getTopicVideos = () => {
    return subjectVideos[subject] || subjectVideos.mathematics;
  };
  
  // Get resources for current subject
  const getResources = () => {
    return additionalResources[subject]?.[locale === 'ru' ? 'ru' : 'kz'] || additionalResources.mathematics[locale === 'ru' ? 'ru' : 'kz'];
  };

  // Get formulas if applicable
  const getFormulas = () => {
    return keyFormulas[subject]?.[locale === 'ru' ? 'ru' : 'kz'];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Topic header with breadcrumb-like information */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {getSubjectTitle()} - {t('grade')} {grade}
            </h1>
            <p className="text-gray-600">
              {t('topic')} #{parseInt(topicId) + 1}
            </p>
            
            {/* Navigation breadcrumbs */}
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <a href="/" className="hover:text-blue-600 transition-colors">{t('home')}</a>
              <span className="mx-2">→</span>
              <a href={`/subjects/${subject}`} className="hover:text-blue-600 transition-colors">{getSubjectTitle()}</a>
              <span className="mx-2">→</span>
              <a href={`/subjects/${subject}/${grade}`} className="hover:text-blue-600 transition-colors">{t('grade')} {grade}</a>
              <span className="mx-2">→</span>
              <span className="text-gray-700">{t('topic')} #{parseInt(topicId) + 1}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <Tabs defaultValue="theory" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                      <TabsTrigger value="theory">{t('theory')}</TabsTrigger>
                      <TabsTrigger value="examples">{t('examples')}</TabsTrigger>
                      <TabsTrigger value="exercises">{t('exercises')}</TabsTrigger>
                    </TabsList>
                    
                    <ScrollArea className="h-[60vh] pr-4">
                      <TabsContent value="theory" className="pt-2">
                        <TheoryContent content={content.theory} />
                        
                        {/* Key formulas section if applicable */}
                        {getFormulas() && (
                          <div className="mt-6 bg-amber-50 p-4 rounded-lg border border-amber-100">
                            <h3 className="text-lg font-semibold text-amber-800 mb-2">{t('key_formulas')}</h3>
                            <ul className="space-y-2 text-amber-700">
                              {getFormulas().map((formula, index) => (
                                <li key={index} className="p-2 bg-amber-100/50 rounded flex items-center">
                                  <span className="text-amber-600 mr-2">•</span> {formula}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {/* Additional learning resources */}
                        <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
                          <h3 className="text-lg font-semibold text-blue-800 mb-2">{t('additional_resources')}</h3>
                          <ul className="list-disc list-inside space-y-2 text-blue-700">
                            {getResources().map((resource, index) => (
                              <li key={index}>{resource}</li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Video lessons */}
                        <div className="mt-8">
                          <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('video_lessons')}</h3>
                          <div className="space-y-4">
                            {getTopicVideos().map((videoId, index) => (
                              <div key={index} className="rounded-lg overflow-hidden border border-gray-200">
                                <YoutubeVideo videoId={videoId} />
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="examples">
                        <ExamplesContent examples={content.examples} />
                        
                        {/* Tips and tricks section */}
                        <div className="mt-8 bg-green-50 p-4 rounded-lg border border-green-100">
                          <h3 className="text-lg font-semibold text-green-800 mb-2">{t('tips_and_tricks')}</h3>
                          <ul className="list-disc list-inside space-y-2 text-green-700">
                            <li>{t('tip_1')}</li>
                            <li>{t('tip_2')}</li>
                            <li>{t('tip_3')}</li>
                          </ul>
                        </div>
                        
                        {/* Common mistakes to avoid */}
                        <div className="mt-6 bg-red-50 p-4 rounded-lg border border-red-100">
                          <h3 className="text-lg font-semibold text-red-800 mb-2">{t('common_mistakes')}</h3>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <span className="text-red-500 mr-2">✗</span>
                              <span className="text-red-700">{t('mistake_1')}</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-red-500 mr-2">✗</span>
                              <span className="text-red-700">{t('mistake_2')}</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-red-500 mr-2">✗</span>
                              <span className="text-red-700">{t('mistake_3')}</span>
                            </li>
                          </ul>
                        </div>
                      </TabsContent>

                      <TabsContent value="exercises">
                        <ExercisesContent exercises={content.exercises} />
                        
                        {/* Additional exercises */}
                        <div className="mt-6 bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                          <h3 className="text-lg font-semibold text-indigo-800 mb-2">{t('additional_exercises')}</h3>
                          <ul className="space-y-3 text-indigo-700">
                            <li className="p-2 bg-indigo-100/50 rounded">
                              <p className="font-medium">{t('exercise')} 1:</p>
                              <p>{t('additional_exercise_1')}</p>
                            </li>
                            <li className="p-2 bg-indigo-100/50 rounded">
                              <p className="font-medium">{t('exercise')} 2:</p>
                              <p>{t('additional_exercise_2')}</p>
                            </li>
                            <li className="p-2 bg-indigo-100/50 rounded">
                              <p className="font-medium">{t('exercise')} 3:</p>
                              <p>{t('additional_exercise_3')}</p>
                            </li>
                          </ul>
                        </div>
                        
                        {/* Practice guidelines */}
                        <div className="mt-8 bg-purple-50 p-4 rounded-lg border border-purple-100">
                          <h3 className="text-lg font-semibold text-purple-800 mb-2">{t('practice_guidelines')}</h3>
                          <ol className="list-decimal list-inside space-y-2 text-purple-700">
                            <li>{t('guideline_1')}</li>
                            <li>{t('guideline_2')}</li>
                            <li>{t('guideline_3')}</li>
                          </ol>
                        </div>
                      </TabsContent>
                    </ScrollArea>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              {/* Sidebar content */}
              {/* Study statistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('study_statistics')}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 gap-4 text-center">
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">75%</p>
                      <p className="text-sm text-orange-700">{t('theory_completion')}</p>
                    </div>
                    <div className="bg-cyan-50 p-3 rounded-lg">
                      <p className="text-2xl font-bold text-cyan-600">60%</p>
                      <p className="text-sm text-cyan-700">{t('examples_tried')}</p>
                    </div>
                    <div className="bg-pink-50 p-3 rounded-lg">
                      <p className="text-2xl font-bold text-pink-600">50%</p>
                      <p className="text-sm text-pink-700">{t('exercises_completed')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Online platforms */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('online_platforms')}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <ul className="space-y-2">
                    {onlinePlatforms[locale === 'ru' ? 'ru' : 'kz'].map((platform, index) => (
                      <li key={index}>
                        <a 
                          href={platform.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center p-2 bg-gray-50 hover:bg-gray-100 rounded transition-colors"
                        >
                          <span className="text-blue-500 mr-2">🔗</span>
                          {platform.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              {/* Educational apps */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('educational_apps')}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <ul className="space-y-2">
                    {educationalApps[locale === 'ru' ? 'ru' : 'kz'].map((app, index) => (
                      <li key={index} className="flex items-center p-2 bg-gray-50 rounded">
                        <span className="text-purple-500 mr-2">📱</span>
                        {app}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              {/* Related topics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('related_topics')}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {relatedTopics.map((id) => (
                      <a 
                        key={id}
                        href={`/subjects/${subject}/${grade}/${id}`}
                        className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                      >
                        <h3 className="font-medium text-gray-800">
                          {t('topic')} #{parseInt(id) + 1}
                        </h3>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TopicDetails;
