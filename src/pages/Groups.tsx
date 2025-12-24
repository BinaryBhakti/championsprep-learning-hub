import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Users,
  Plus,
  Copy,
  Settings,
  Layers,
  Activity,
  Crown,
  UserPlus,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Navbar } from '@/components/layout/Navbar';
import { mockStudyGroups, StudyGroup } from '@/lib/mockSocialData';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function Groups() {
  const [groups, setGroups] = useState(mockStudyGroups);
  const [joinCode, setJoinCode] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<StudyGroup | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDesc, setNewGroupDesc] = useState('');

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Invite code copied!');
  };

  const handleJoinGroup = () => {
    if (!joinCode.trim()) {
      toast.error('Please enter an invite code');
      return;
    }
    const found = groups.find((g) => g.inviteCode === joinCode.toUpperCase());
    if (found) {
      toast.success(`Joined "${found.name}"!`);
      setJoinCode('');
    } else {
      toast.error('Group not found');
    }
  };

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) {
      toast.error('Please enter a group name');
      return;
    }
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newGroup: StudyGroup = {
      id: Date.now().toString(),
      name: newGroupName,
      description: newGroupDesc,
      inviteCode: newCode,
      creatorId: 'current',
      creatorName: 'Arjun Sharma',
      memberCount: 1,
      members: [{ id: 'current', name: 'Arjun Sharma', role: 'admin', joinedAt: new Date().toISOString(), xp: 2180 }],
      sharedDecks: [],
      activityFeed: [],
      createdAt: new Date().toISOString(),
    };
    setGroups([newGroup, ...groups]);
    setShowCreateDialog(false);
    setNewGroupName('');
    setNewGroupDesc('');
    toast.success(`Group "${newGroupName}" created! Invite code: ${newCode}`);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'join':
        return <UserPlus className="h-4 w-4 text-success" />;
      case 'quiz':
        return <Activity className="h-4 w-4 text-primary" />;
      case 'deck_share':
        return <Layers className="h-4 w-4 text-gold" />;
      case 'achievement':
        return <Crown className="h-4 w-4 text-gold" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
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
              <Users className="h-8 w-8 text-primary" />
              Study Groups
            </h1>
            <p className="text-muted-foreground">
              Learn together, share resources, and track progress!
            </p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)} className="rounded-full">
            <Plus className="h-4 w-4 mr-2" />
            Create Group
          </Button>
        </div>

        {/* Join Group */}
        <Card className="rounded-3xl mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter invite code (e.g., COMWAR)"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  className="text-center text-lg font-mono tracking-widest"
                  maxLength={6}
                />
              </div>
              <Button onClick={handleJoinGroup} className="rounded-full">
                <UserPlus className="h-4 w-4 mr-2" />
                Join Group
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* My Groups */}
        <div className="grid gap-6 lg:grid-cols-2">
          {groups.map((group) => {
            const isAdmin = group.creatorId === 'current';

            return (
              <Card
                key={group.id}
                className="rounded-3xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedGroup(group)}
              >
                <div className={cn(
                  "p-4",
                  isAdmin
                    ? "bg-gradient-to-r from-primary/10 to-gold/10"
                    : "bg-muted/50"
                )}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{group.name}</h3>
                        {isAdmin && (
                          <Badge variant="outline" className="text-xs">
                            <Crown className="h-3 w-3 mr-1" />
                            Admin
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {group.description}
                      </p>
                    </div>
                    <Badge>
                      <Users className="h-3 w-3 mr-1" />
                      {group.memberCount}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4 space-y-4">
                  {/* Invite Code */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Invite Code:</span>
                    <code className="px-2 py-1 rounded bg-muted font-mono">
                      {group.inviteCode}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyCode(group.inviteCode);
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Shared Decks Preview */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Shared Decks</span>
                      <Badge variant="outline" className="ml-auto text-xs">
                        {group.sharedDecks.length}
                      </Badge>
                    </div>
                    {group.sharedDecks.length > 0 ? (
                      <div className="flex gap-2">
                        {group.sharedDecks.slice(0, 2).map((deck) => (
                          <Badge key={deck.id} variant="secondary" className="text-xs">
                            {deck.title}
                          </Badge>
                        ))}
                        {group.sharedDecks.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{group.sharedDecks.length - 2} more
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground">No shared decks yet</p>
                    )}
                  </div>

                  {/* Recent Activity Preview */}
                  {group.activityFeed.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {getActivityIcon(group.activityFeed[0].type)}
                      <span className="truncate">
                        {group.activityFeed[0].userName} {group.activityFeed[0].message}
                      </span>
                      <span className="shrink-0">
                        {formatTimestamp(group.activityFeed[0].timestamp)}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      {/* Group Detail Dialog */}
      <Dialog open={!!selectedGroup} onOpenChange={() => setSelectedGroup(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          {selectedGroup && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="flex items-center gap-2">
                    {selectedGroup.name}
                    {selectedGroup.creatorId === 'current' && (
                      <Badge variant="outline">
                        <Crown className="h-3 w-3 mr-1" />
                        Admin
                      </Badge>
                    )}
                  </DialogTitle>
                  {selectedGroup.creatorId === 'current' && (
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <DialogDescription>{selectedGroup.description}</DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="members" className="flex-1 overflow-hidden">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="members">Members</TabsTrigger>
                  <TabsTrigger value="decks">Shared Decks</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="members" className="mt-4">
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-2">
                      {selectedGroup.members.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center gap-3 p-3 rounded-xl border"
                        >
                          <Avatar>
                            <AvatarFallback>
                              {member.name.split(' ').map((n) => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{member.name}</p>
                              {member.role === 'admin' && (
                                <Crown className="h-4 w-4 text-gold" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {member.xp.toLocaleString()} XP
                            </p>
                          </div>
                          {selectedGroup.creatorId === 'current' && member.id !== 'current' && (
                            <Button variant="ghost" size="icon" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="decks" className="mt-4">
                  <ScrollArea className="h-[300px]">
                    {selectedGroup.sharedDecks.length > 0 ? (
                      <div className="space-y-2">
                        {selectedGroup.sharedDecks.map((deck) => (
                          <div
                            key={deck.id}
                            className="flex items-center gap-3 p-3 rounded-xl border"
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10">
                              <Layers className="h-5 w-5 text-gold" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{deck.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {deck.cardCount} cards • {deck.topic}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              by {deck.sharedBy}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Layers className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                        <p className="text-muted-foreground">No shared decks yet</p>
                        <Button variant="link" className="mt-2">
                          Share a flashcard deck
                        </Button>
                      </div>
                    )}
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="activity" className="mt-4">
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-3">
                      {selectedGroup.activityFeed.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-3 p-3 rounded-xl bg-muted/50"
                        >
                          {getActivityIcon(activity.type)}
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="font-medium">{activity.userName}</span>{' '}
                              {activity.message}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatTimestamp(activity.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Group Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Study Group</DialogTitle>
            <DialogDescription>
              Create a group to study together with friends
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="group-name">Group Name</Label>
              <Input
                id="group-name"
                placeholder="e.g., Commerce Warriors"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="group-desc">Description (optional)</Label>
              <Textarea
                id="group-desc"
                placeholder="What's this group about?"
                value={newGroupDesc}
                onChange={(e) => setNewGroupDesc(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateGroup}>Create Group</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
