
import { useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { topics } from "../data/subjects";
import { TheoryContent } from "@/components/topic/TheoryContent";
import { ExamplesContent } from "@/components/topic/ExamplesContent";
import { ExercisesContent } from "@/components/topic/ExercisesContent";
import { useLanguage } from "@/contexts/LanguageContext";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const TopicDetails = () => {
  const { subject, grade, topicId } = useParams();
  const { t } = useLanguage();
  
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
    
    return subjectKeys[subject] ? (t('locale') === 'ru' ? subjectKeys[subject][0] : subjectKeys[subject][1]) : subject;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Topic header with breadcrumb-like information */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {getSubjectTitle()} - {t('grade')} {grade}
            </h1>
            <p className="text-gray-600">
              {t('topic')} #{parseInt(topicId) + 1}
            </p>
          </div>
          
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
                    
                    {/* Additional learning resources */}
                    <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <h3 className="text-lg font-semibold text-blue-800 mb-2">{t('additional_resources')}</h3>
                      <ul className="list-disc list-inside space-y-2 text-blue-700">
                        <li>{t('resource_video')}</li>
                        <li>{t('resource_interactive')}</li>
                        <li>{t('resource_book')}</li>
                      </ul>
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
                  </TabsContent>

                  <TabsContent value="exercises">
                    <ExercisesContent exercises={content.exercises} />
                    
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
          
          {/* Related topics */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t('related_topics')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedTopics.map((id) => (
                <Card 
                  key={id} 
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => window.location.href = `/subjects/${subject}/${grade}/${id}`}
                >
                  <CardContent className="p-4">
                    <h3 className="font-medium text-gray-800">
                      {t('topic')} #{parseInt(id) + 1}
                    </h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Study statistics */}
          <Card className="mt-8">
            <CardContent className="p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-2">{t('study_statistics')}</h2>
              <div className="grid grid-cols-3 gap-4 text-center">
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
        </div>
      </main>
    </div>
  );
};

export default TopicDetails;
