import { useState } from "react";
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
import { SUBJECTS_BY_GRADE, DIFFICULTIES, LANGUAGES } from "@/lib/constants";
import { useAuth } from "@/contexts/AuthContext";
import { Check, BookOpen, Coins, Sparkles } from "lucide-react";
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

export function TopicSelector({ open, onOpenChange, mode, onStart }: TopicSelectorProps) {
  const { user } = useAuth();
  const grade = user?.grade || 12;
  const subjects = SUBJECTS_BY_GRADE[grade];

  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<string>("Medium");
  const [language, setLanguage] = useState<string>("en");

  const currentSubject = subjects.find((s) => s.name === selectedSubject);
  const topics = currentSubject?.topics || [];

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const selectAllTopics = () => {
    if (selectedTopics.length === topics.length) {
      setSelectedTopics([]);
    } else {
      setSelectedTopics([...topics]);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Configure {mode}
          </DialogTitle>
          <DialogDescription>
            Select your subject, topics, and preferences
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6 py-4">
          {/* Subject Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Subject</label>
            <Select value={selectedSubject} onValueChange={(v) => {
              setSelectedSubject(v);
              setSelectedTopics([]);
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

          {/* Topic Selection */}
          {selectedSubject && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Topics ({selectedTopics.length} selected)
                </label>
                <Button variant="ghost" size="sm" onClick={selectAllTopics}>
                  {selectedTopics.length === topics.length ? "Deselect All" : "Select All"}
                </Button>
              </div>
              <div className="grid gap-2 max-h-48 overflow-y-auto pr-2">
                {topics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border p-3 text-left transition-all",
                      selectedTopics.includes(topic)
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-md border transition-colors",
                        selectedTopics.includes(topic)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground"
                      )}
                    >
                      {selectedTopics.includes(topic) && <Check className="h-3 w-3" />}
                    </div>
                    <span className="text-sm">{topic}</span>
                  </button>
                ))}
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
                      {d}
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
            <span>{getCost()} coins</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              variant="hero"
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
