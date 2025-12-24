import { useState } from 'react';
import { Lock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { mockAchievements, Achievement } from '@/lib/mockGamificationData';
import { cn } from '@/lib/utils';

type Category = 'all' | 'streak' | 'quiz' | 'mastery' | 'social' | 'special';

export function AchievementsGrid() {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [category, setCategory] = useState<Category>('all');

  const filteredAchievements = category === 'all' 
    ? mockAchievements 
    : mockAchievements.filter(a => a.category === category);

  const unlockedCount = mockAchievements.filter(a => a.unlockedAt).length;
  const totalCount = mockAchievements.length;

  const categories: { value: Category; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'streak', label: 'Streaks' },
    { value: 'quiz', label: 'Quizzes' },
    { value: 'mastery', label: 'Mastery' },
    { value: 'special', label: 'Special' },
  ];

  return (
    <>
      <Card className="rounded-3xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              🏆 Achievements
            </CardTitle>
            <Badge variant="secondary">
              {unlockedCount}/{totalCount} Unlocked
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={category} onValueChange={(v) => setCategory(v as Category)}>
            <TabsList className="grid grid-cols-5 h-10">
              {categories.map((cat) => (
                <TabsTrigger key={cat.value} value={cat.value} className="text-xs">
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={category} className="mt-4">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {filteredAchievements.map((achievement) => {
                  const isUnlocked = !!achievement.unlockedAt;
                  const progressPercent = (achievement.progress / achievement.requirement) * 100;

                  return (
                    <button
                      key={achievement.id}
                      onClick={() => setSelectedAchievement(achievement)}
                      className={cn(
                        "relative flex flex-col items-center p-3 rounded-2xl border transition-all",
                        "hover:scale-105 hover:shadow-md",
                        isUnlocked
                          ? "bg-primary/5 border-primary/20"
                          : "bg-muted/50 border-border"
                      )}
                    >
                      <span className={cn(
                        "text-3xl mb-1",
                        !isUnlocked && "grayscale opacity-50"
                      )}>
                        {achievement.icon}
                      </span>
                      <p className={cn(
                        "text-[10px] text-center line-clamp-2",
                        isUnlocked ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {achievement.title}
                      </p>
                      {isUnlocked ? (
                        <CheckCircle className="absolute -top-1 -right-1 h-4 w-4 text-success" />
                      ) : (
                        <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-muted flex items-center justify-center">
                          <Lock className="h-2.5 w-2.5 text-muted-foreground" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Achievement Detail Dialog */}
      <Dialog open={!!selectedAchievement} onOpenChange={() => setSelectedAchievement(null)}>
        <DialogContent className="sm:max-w-sm">
          {selectedAchievement && (
            <>
              <DialogHeader>
                <DialogTitle className="text-center">
                  <span className="text-5xl block mb-2">{selectedAchievement.icon}</span>
                  {selectedAchievement.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 text-center">
                <p className="text-muted-foreground">{selectedAchievement.description}</p>
                
                {selectedAchievement.unlockedAt ? (
                  <Badge className="bg-success/20 text-success">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Unlocked on {selectedAchievement.unlockedAt}
                  </Badge>
                ) : (
                  <div className="space-y-2">
                    <Progress 
                      value={(selectedAchievement.progress / selectedAchievement.requirement) * 100} 
                      className="h-3"
                    />
                    <p className="text-sm text-muted-foreground">
                      {selectedAchievement.progress}/{selectedAchievement.requirement} completed
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
