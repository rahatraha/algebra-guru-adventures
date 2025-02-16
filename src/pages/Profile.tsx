
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Trophy,
  Star,
  Settings,
  Sun,
  Moon,
  Volume2,
  BellRing,
  Upload,
  Pencil
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import type { UserProfile, SubjectProgress, Achievement } from "@/types/profile";

const mockProfile: UserProfile = {
  id: "1",
  firstName: "Иван",
  lastName: "Петров",
  grade: 8,
  avatar: "/placeholder.svg",
  level: 12,
  xp: 1250,
  streakDays: 5,
  subjects: [
    { subject: "Алгебра", progress: 75, totalTasks: 100, completedTasks: 75 },
    { subject: "Геометрия", progress: 60, totalTasks: 100, completedTasks: 60 },
    { subject: "Русский язык", progress: 85, totalTasks: 100, completedTasks: 85 }
  ],
  achievements: [
    {
      id: "1",
      title: "Первые шаги",
      description: "Решите первую задачу",
      icon: "🌟",
      earned: true,
      earnedDate: new Date()
    },
    {
      id: "2",
      title: "Знаток алгебры",
      description: "Решите 100 задач по алгебре",
      icon: "📚",
      earned: false
    }
  ],
  settings: {
    theme: 'light',
    soundEnabled: true,
    notificationsEnabled: true
  }
};

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({
          ...prev,
          avatar: e.target?.result as string
        }));
        toast({
          title: "Аватар обновлен",
          description: "Ваш новый аватар успешно загружен",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSettingChange = (setting: keyof UserSettings, value: boolean) => {
    setProfile(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [setting]: value
      }
    }));
    toast({
      title: "Настройки обновлены",
      description: "Ваши настройки успешно сохранены",
    });
  };

  const calculateLevelProgress = () => {
    const xpForNextLevel = (profile.level + 1) * 1000;
    return (profile.xp / xpForNextLevel) * 100;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-12">
          {/* Левая колонка - основная информация */}
          <div className="md:col-span-4 space-y-6">
            <Card className="p-6">
              <div className="relative">
                <Avatar className="w-32 h-32 mx-auto">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback>
                    {profile.firstName[0]}{profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <label 
                  htmlFor="avatar-upload" 
                  className="absolute bottom-0 right-1/3 bg-primary hover:bg-primary/90 text-white p-2 rounded-full cursor-pointer"
                >
                  <Upload className="h-4 w-4" />
                </label>
                <input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleAvatarUpload}
                />
              </div>

              <div className="mt-4 text-center">
                <h2 className="text-2xl font-bold">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-muted-foreground">{profile.grade} класс</p>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Уровень {profile.level}</span>
                  <span className="text-sm text-muted-foreground">{profile.xp} XP</span>
                </div>
                <Progress value={calculateLevelProgress()} className="h-2" />
              </div>

              <div className="mt-6 flex items-center justify-center gap-4">
                <Badge variant="secondary" className="flex gap-1">
                  <Trophy className="h-4 w-4" />
                  {profile.achievements.filter(a => a.earned).length} достижений
                </Badge>
                <Badge variant="secondary" className="flex gap-1">
                  <Star className="h-4 w-4" />
                  {profile.streakDays} дней подряд
                </Badge>
              </div>
            </Card>

            {/* Настройки */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Настройки
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {profile.settings.theme === 'light' ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                    <Label>Тёмная тема</Label>
                  </div>
                  <Switch
                    checked={profile.settings.theme === 'dark'}
                    onCheckedChange={(checked) => 
                      setProfile(prev => ({
                        ...prev,
                        settings: { ...prev.settings, theme: checked ? 'dark' : 'light' }
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    <Label>Звуковые эффекты</Label>
                  </div>
                  <Switch
                    checked={profile.settings.soundEnabled}
                    onCheckedChange={(checked) => 
                      handleSettingChange('soundEnabled', checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BellRing className="h-4 w-4" />
                    <Label>Уведомления</Label>
                  </div>
                  <Switch
                    checked={profile.settings.notificationsEnabled}
                    onCheckedChange={(checked) => 
                      handleSettingChange('notificationsEnabled', checked)
                    }
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Правая колонка - прогресс и достижения */}
          <div className="md:col-span-8 space-y-6">
            {/* Прогресс по предметам */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Прогресс по предметам</h3>
              <div className="space-y-4">
                {profile.subjects.map((subject) => (
                  <div key={subject.subject} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{subject.subject}</span>
                      <span className="text-sm text-muted-foreground">
                        {subject.completedTasks}/{subject.totalTasks} заданий
                      </span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Достижения */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Достижения</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {profile.achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border ${
                      achievement.earned 
                        ? 'bg-primary/5 border-primary/20' 
                        : 'bg-muted/50 border-muted'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                        {achievement.earned && achievement.earnedDate && (
                          <p className="text-xs text-primary mt-1">
                            Получено: {achievement.earnedDate.toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
