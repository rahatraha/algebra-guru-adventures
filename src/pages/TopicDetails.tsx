
import { useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { topics } from "../data/subjects";
import { TheoryContent } from "@/components/topic/TheoryContent";
import { ExamplesContent } from "@/components/topic/ExamplesContent";
import { ExercisesContent } from "@/components/topic/ExercisesContent";
import { useLanguage } from "@/contexts/LanguageContext";

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="theory" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="theory">{t('theory')}</TabsTrigger>
                  <TabsTrigger value="examples">{t('examples')}</TabsTrigger>
                  <TabsTrigger value="exercises">{t('exercises')}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="theory">
                  <TheoryContent content={content.theory} />
                </TabsContent>

                <TabsContent value="examples">
                  <ExamplesContent examples={content.examples} />
                </TabsContent>

                <TabsContent value="exercises">
                  <ExercisesContent exercises={content.exercises} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TopicDetails;
