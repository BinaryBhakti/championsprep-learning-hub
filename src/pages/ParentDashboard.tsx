import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChildLinking } from '@/components/parent/ChildLinking';
import { MonitoringDashboard } from '@/components/parent/MonitoringDashboard';
import { CoinPurchase } from '@/components/parent/CoinPurchase';
import {
  LinkedChild,
  mockLinkedChild,
  mockChildStats,
  mockSubjectMastery,
  mockWeeklyActivity,
  mockAchievements,
  mockTopicsToReview,
} from '@/lib/mockParentData';

export default function ParentDashboard() {
  const [linkedChild, setLinkedChild] = useState<LinkedChild | null>(mockLinkedChild);

  const handleChildLinked = (child: LinkedChild) => {
    setLinkedChild(child);
  };

  const handleChildUnlinked = () => {
    setLinkedChild(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/dashboard">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">Parent Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="hidden sm:inline">Monitoring:</span>
              <span className="font-medium text-foreground">
                {linkedChild ? linkedChild.name : 'No child linked'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Child Linking Section */}
        <ChildLinking
          linkedChild={linkedChild}
          onChildLinked={handleChildLinked}
          onChildUnlinked={handleChildUnlinked}
        />

        {linkedChild ? (
          <>
            {/* Monitoring Dashboard */}
            <div>
              <h2 className="text-2xl font-bold mb-2">Progress Overview</h2>
              <p className="text-muted-foreground mb-6">
                Track {linkedChild.name}'s learning journey and achievements.
              </p>
              <MonitoringDashboard
                stats={mockChildStats}
                subjectMastery={mockSubjectMastery}
                weeklyActivity={mockWeeklyActivity}
                achievements={mockAchievements}
                topicsToReview={mockTopicsToReview}
              />
            </div>

            {/* Coin Purchase Section */}
            <div>
              <h2 className="text-2xl font-bold mb-2">Support Their Learning</h2>
              <p className="text-muted-foreground mb-6">
                Purchase coins to help {linkedChild.name} access more practice questions.
              </p>
              <CoinPurchase childName={linkedChild.name} />
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <Users className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Child Linked</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Link your child's account using their registered email to start monitoring
              their progress and support their learning journey.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
