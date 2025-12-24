import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SUBJECTS_BY_GRADE, DIFFICULTIES, LANGUAGES } from "@/lib/constants";
import { mockTopicProgress } from "@/lib/mockStudentData";
import { useAuth } from "@/contexts/AuthContext";
import { Check, BookOpen, Coins, Sparkles, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopicSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: string;
  onStart: (config: TopicConfig) => void;
}

interface TopicConfig {
  subject: string;
  topics: string[];
  difficulty: string;
  language: string;
}

type MasteryFilter = 'all' | 'weak' | 'mastered' | 'not_started';

export function TopicSelector({ open, onOpenChange, mode, onStart }: TopicSelectorProps) {
  const { user } = useAuth();
  const grade = user?.grade || 12;
  const subjects = SUBJECTS_BY_GRADE[grade];

  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<string>("Medium");
  const [language, setLanguage] = useState<string>("en");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [masteryFilter, setMasteryFilter] = useState<MasteryFilter>('all');

  const currentSubject = subjects.find((s) => s.name === selectedSubject);
  const allTopics: string[] = currentSubject ? [...currentSubject.topics] : [];

  // Get mastery data for topics
  const getTopicMastery = (topic: string) => {
    const progress = mockTopicProgress.find(
      (p) => p.topic === topic && p.subject === selectedSubject
    );
    return progress?.mastery ?? 0;
  };

  const getTopicStatus = (topic: string) => {
    const progress = mockTopicProgress.find(
      (p) => p.topic === topic && p.subject === selectedSubject
    );
    return progress?.status ?? 'not_started';
  };

  // Filter topics based on search and mastery filter
  const filteredTopics = useMemo(() => {
    let filtered = [...allTopics];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((topic) =>
        topic.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Mastery filter
    if (masteryFilter !== 'all') {
      filtered = filtered.filter((topic) => {
        const mastery = getTopicMastery(topic);
        switch (masteryFilter) {
          case 'weak':
            return mastery > 0 && mastery < 60;
          case 'mastered':
            return mastery >= 80;
          case 'not_started':
            return mastery === 0;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [allTopics, searchQuery, masteryFilter, selectedSubject]);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const selectAllTopics = () => {
    if (selectedTopics.length === filteredTopics.length) {
      setSelectedTopics([]);
    } else {
      setSelectedTopics([...filteredTopics]);
    }
  };

  const handleStart = () => {
    if (selectedSubject && selectedTopics.length > 0) {
      onStart({
        subject: selectedSubject,
        topics: selectedTopics,
        difficulty,
        language,
      });
      onOpenChange(false);
    }
  };

  const getCost = () => {
    const costs: Record<string, number> = { Easy: 2, Medium: 3, Hard: 5 };
    return costs[difficulty] || 3;
  };

  const getMasteryBadge = (mastery: number, status: string) => {
    if (status === 'not_started') {
      return <Badge variant="outline" className="text-xs">New</Badge>;
    }
    if (mastery >= 80) {
      return <Badge className="bg-success/20 text-success text-xs">{mastery}%</Badge>;
    }
    if (mastery < 60) {
      return <Badge variant="destructive" className="text-xs">{mastery}%</Badge>;
    }
    return <Badge variant="secondary" className="text-xs">{mastery}%</Badge>;
  };

  const masteryFilters: { value: MasteryFilter; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: allTopics.length },
    { value: 'weak', label: 'Weak (<60%)', count: allTopics.filter(t => { const m = getTopicMastery(t); return m > 0 && m < 60; }).length },
    { value: 'mastered', label: 'Mastered (≥80%)', count: allTopics.filter(t => getTopicMastery(t) >= 80).length },
    { value: 'not_started', label: 'Not Started', count: allTopics.filter(t => getTopicMastery(t) === 0).length },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Configure {mode}
          </DialogTitle>
          <DialogDescription>
            Select your subject, topics, and preferences
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-5 py-4">
          {/* Subject Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Subject</label>
            <Select value={selectedSubject} onValueChange={(v) => {
              setSelectedSubject(v);
              setSelectedTopics([]);
              setSearchQuery("");
              setMasteryFilter('all');
            }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.name} value={subject.name}>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      {subject.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Topic Selection with Search & Filters */}
          {selectedSubject && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Topics ({selectedTopics.length} selected)
                </label>
                <Button variant="ghost" size="sm" onClick={selectAllTopics}>
                  {selectedTopics.length === filteredTopics.length ? "Deselect All" : "Select All"}
                </Button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Mastery Filters */}
              <div className="flex flex-wrap gap-2">
                <Filter className="h-4 w-4 text-muted-foreground mt-1" />
                {masteryFilters.map((filter) => (
                  <Button
                    key={filter.value}
                    variant={masteryFilter === filter.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMasteryFilter(filter.value)}
                    className="rounded-full text-xs"
                  >
                    {filter.label} ({filter.count})
                  </Button>
                ))}
              </div>

              {/* Topic List */}
              <div className="grid gap-2 max-h-48 overflow-y-auto pr-2">
                {filteredTopics.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No topics match your filters
                  </p>
                ) : (
                  filteredTopics.map((topic) => {
                    const mastery = getTopicMastery(topic);
                    const status = getTopicStatus(topic);
                    return (
                      <button
                        key={topic}
                        onClick={() => toggleTopic(topic)}
                        className={cn(
                          "flex items-center gap-3 rounded-xl border p-3 text-left transition-all",
                          selectedTopics.includes(topic)
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border hover:border-primary/50 hover:bg-muted/50"
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-5 w-5 items-center justify-center rounded-md border transition-colors shrink-0",
                            selectedTopics.includes(topic)
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-muted-foreground"
                          )}
                        >
                          {selectedTopics.includes(topic) && <Check className="h-3 w-3" />}
                        </div>
                        <span className="text-sm flex-1">{topic}</span>
                        {getMasteryBadge(mastery, status)}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Difficulty & Language */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty</label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DIFFICULTIES.map((d) => (
                    <SelectItem key={d} value={d}>
                      <div className="flex items-center gap-2">
                        <span>{d}</span>
                        <span className="text-xs text-muted-foreground">
                          ({d === 'Easy' ? 2 : d === 'Medium' ? 3 : 5} coins)
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Language</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t pt-4">
          <div className="coin-badge">
            <Coins className="h-4 w-4" />
            <span>{getCost()} coins per question</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleStart}
              disabled={!selectedSubject || selectedTopics.length === 0}
            >
              Start Learning
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
