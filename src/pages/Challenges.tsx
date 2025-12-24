import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Swords,
  Plus,
  Copy,
  Share2,
  Clock,
  Trophy,
  Users,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Navbar } from '@/components/layout/Navbar';
import { mockChallenges, FriendChallenge, ChallengeAttempt } from '@/lib/mockSocialData';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function Challenges() {
  const [challenges, setChallenges] = useState(mockChallenges);
  const [joinCode, setJoinCode] = useState('');
  const [selectedChallenge, setSelectedChallenge] = useState<FriendChallenge | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Challenge code copied!');
  };

  const handleShare = (challenge: FriendChallenge) => {
    const shareUrl = `${window.location.origin}/challenge/${challenge.code}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Share link copied!');
  };

  const handleJoinChallenge = () => {
    if (!joinCode.trim()) {
      toast.error('Please enter a challenge code');
      return;
    }
    const found = challenges.find((c) => c.code === joinCode.toUpperCase());
    if (found) {
      setSelectedChallenge(found);
      setJoinCode('');
    } else {
      toast.error('Challenge not found');
    }
  };

  const handleStartChallenge = () => {
    toast.success('Starting challenge... (Demo mode)');
    setSelectedChallenge(null);
  };

  const getDaysRemaining = (expiresAt: string) => {
    const diff = new Date(expiresAt).getTime() - Date.now();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="font-display text-3xl font-bold flex items-center gap-2">
              <Swords className="h-8 w-8 text-primary" />
              Friend Challenges
            </h1>
            <p className="text-muted-foreground">
              Challenge your friends and compete on the leaderboard!
            </p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)} className="rounded-full">
            <Plus className="h-4 w-4 mr-2" />
            Create Challenge
          </Button>
        </div>

        {/* Join Challenge */}
        <Card className="rounded-3xl mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter challenge code (e.g., ABC123)"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  className="text-center text-lg font-mono tracking-widest"
                  maxLength={6}
                />
              </div>
              <Button onClick={handleJoinChallenge} className="rounded-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                Join Challenge
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* My Challenges */}
        <div className="grid gap-6 lg:grid-cols-2">
          {challenges.map((challenge) => {
            const daysLeft = getDaysRemaining(challenge.expiresAt);
            const isCreator = challenge.creatorId === 'current';

            return (
              <Card key={challenge.id} className="rounded-3xl overflow-hidden">
                <div className={cn(
                  "p-4",
                  isCreator
                    ? "bg-gradient-to-r from-primary/10 to-gold/10"
                    : "bg-muted/50"
                )}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{challenge.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {challenge.subject} • {challenge.topic}
                      </p>
                    </div>
                    <Badge variant={daysLeft <= 7 ? 'destructive' : 'secondary'}>
                      <Clock className="h-3 w-3 mr-1" />
                      {daysLeft} days left
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4 space-y-4">
                  {/* Challenge Info */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{challenge.questionCount} questions</span>
                    <span>•</span>
                    <span>{challenge.difficulty}</span>
                    <span>•</span>
                    <span>by {challenge.creatorName}</span>
                  </div>

                  {/* Challenge Code */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 flex items-center justify-center p-2 rounded-xl bg-muted font-mono text-lg tracking-widest">
                      {challenge.code}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCopyCode(challenge.code)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare(challenge)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Leaderboard Preview */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="h-4 w-4 text-gold" />
                      <span className="text-sm font-medium">Leaderboard</span>
                      <Badge variant="outline" className="ml-auto">
                        <Users className="h-3 w-3 mr-1" />
                        {challenge.attempts.length} attempts
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {challenge.attempts
                        .sort((a, b) => b.score - a.score)
                        .slice(0, 3)
                        .map((attempt, index) => (
                          <div
                            key={attempt.id}
                            className={cn(
                              "flex items-center gap-3 p-2 rounded-xl",
                              attempt.odanId === 'current' && "bg-primary/10"
                            )}
                          >
                            <span className="w-6 text-center font-bold text-muted-foreground">
                              #{index + 1}
                            </span>
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {attempt.name.split(' ').map((n) => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="flex-1 text-sm font-medium">
                              {attempt.name}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {formatTime(attempt.timeTaken)}
                            </span>
                            <Badge>{attempt.score}%</Badge>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <Button
                    className="w-full rounded-full"
                    onClick={() => setSelectedChallenge(challenge)}
                  >
                    {challenge.attempts.some((a) => a.odanId === 'current')
                      ? 'View Details'
                      : 'Take Challenge'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      {/* Challenge Detail Dialog */}
      <Dialog open={!!selectedChallenge} onOpenChange={() => setSelectedChallenge(null)}>
        <DialogContent className="sm:max-w-lg">
          {selectedChallenge && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedChallenge.title}</DialogTitle>
                <DialogDescription>
                  {selectedChallenge.subject} • {selectedChallenge.topic}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 rounded-xl bg-muted">
                    <p className="text-2xl font-bold">{selectedChallenge.questionCount}</p>
                    <p className="text-xs text-muted-foreground">Questions</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted">
                    <p className="text-2xl font-bold">{selectedChallenge.difficulty}</p>
                    <p className="text-xs text-muted-foreground">Difficulty</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted">
                    <p className="text-2xl font-bold">{selectedChallenge.attempts.length}</p>
                    <p className="text-xs text-muted-foreground">Attempts</p>
                  </div>
                </div>

                <ScrollArea className="h-[200px]">
                  <div className="space-y-2">
                    {selectedChallenge.attempts
                      .sort((a, b) => b.score - a.score)
                      .map((attempt, index) => (
                        <div
                          key={attempt.id}
                          className="flex items-center gap-3 p-3 rounded-xl border"
                        >
                          <span className="w-8 text-center font-bold">#{index + 1}</span>
                          <Avatar>
                            <AvatarFallback>
                              {attempt.name.split(' ').map((n) => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">{attempt.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatTime(attempt.timeTaken)}
                            </p>
                          </div>
                          <Badge variant={attempt.score >= 80 ? 'default' : 'secondary'}>
                            {attempt.score}%
                          </Badge>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedChallenge(null)}>
                  Close
                </Button>
                <Button onClick={handleStartChallenge}>
                  {selectedChallenge.attempts.some((a) => a.odanId === 'current')
                    ? 'Retry Challenge'
                    : 'Start Challenge'}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Challenge Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Challenge</DialogTitle>
            <DialogDescription>
              Create a challenge from your recent quiz sessions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground text-center">
              Complete a quiz first to create a challenge from it. Your friends will attempt the
              same questions and compete on the leaderboard!
            </p>
            <div className="p-4 rounded-xl border border-dashed text-center">
              <p className="text-muted-foreground">No recent quiz sessions</p>
              <Button variant="link" asChild className="mt-2">
                <Link to="/dashboard">Go to Dashboard to start a quiz</Link>
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
