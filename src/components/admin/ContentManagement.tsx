import { useState } from 'react';
import { Calendar, Video, FileText, Calculator, Trophy, Plus, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  mockEvents,
  mockVideos,
  mockPapers,
  mockFormulas,
  ContentItem,
} from '@/lib/mockAdminData';
import { toast } from 'sonner';

interface ContentTableProps {
  items: ContentItem[];
  onEdit: (item: ContentItem) => void;
  onDelete: (id: string) => void;
}

function ContentTable({ items, onEdit, onDelete }: ContentTableProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'draft':
        return 'secondary';
      case 'archived':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <div className="rounded-3xl border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(item.status)}>{item.status}</Badge>
              </TableCell>
              <TableCell>{item.createdAt}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(item.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function ContentManagement() {
  const [events, setEvents] = useState(mockEvents);
  const [videos, setVideos] = useState(mockVideos);
  const [papers, setPapers] = useState(mockPapers);
  const [formulas, setFormulas] = useState(mockFormulas);

  const handleEdit = (item: ContentItem) => {
    toast.info(`Edit functionality for "${item.title}" (demo mode)`);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
    toast.success('Event deleted');
  };

  const handleDeleteVideo = (id: string) => {
    setVideos(videos.filter((v) => v.id !== id));
    toast.success('Video deleted');
  };

  const handleDeletePaper = (id: string) => {
    setPapers(papers.filter((p) => p.id !== id));
    toast.success('Paper deleted');
  };

  const handleDeleteFormula = (id: string) => {
    setFormulas(formulas.filter((f) => f.id !== id));
    toast.success('Formula sheet deleted');
  };

  const contentSections = [
    {
      id: 'events',
      label: 'Events',
      icon: Calendar,
      items: events,
      onDelete: handleDeleteEvent,
    },
    {
      id: 'videos',
      label: 'Videos',
      icon: Video,
      items: videos,
      onDelete: handleDeleteVideo,
    },
    {
      id: 'papers',
      label: 'Papers',
      icon: FileText,
      items: papers,
      onDelete: handleDeletePaper,
    },
    {
      id: 'formulas',
      label: 'Formulas',
      icon: Calculator,
      items: formulas,
      onDelete: handleDeleteFormula,
    },
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="events">
        <TabsList className="grid w-full grid-cols-5 rounded-2xl h-12">
          {contentSections.map((section) => (
            <TabsTrigger
              key={section.id}
              value={section.id}
              className="flex items-center gap-2 rounded-xl"
            >
              <section.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{section.label}</span>
            </TabsTrigger>
          ))}
          <TabsTrigger value="leaderboard" className="flex items-center gap-2 rounded-xl">
            <Trophy className="h-4 w-4" />
            <span className="hidden sm:inline">Leaderboard</span>
          </TabsTrigger>
        </TabsList>

        {contentSections.map((section) => (
          <TabsContent key={section.id} value={section.id} className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{section.label} Manager</h3>
              <Button className="rounded-full">
                <Plus className="h-4 w-4 mr-2" />
                Add {section.label.slice(0, -1)}
              </Button>
            </div>
            <ContentTable
              items={section.items}
              onEdit={handleEdit}
              onDelete={section.onDelete}
            />
          </TabsContent>
        ))}

        <TabsContent value="leaderboard" className="mt-6">
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-gold" />
                Leaderboard Manager
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="rounded-2xl border-2 border-dashed">
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground mb-2">Weekly Leaderboard</p>
                    <p className="text-2xl font-bold">Active</p>
                    <Button variant="outline" size="sm" className="mt-4 rounded-full">
                      Configure
                    </Button>
                  </CardContent>
                </Card>
                <Card className="rounded-2xl border-2 border-dashed">
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground mb-2">Monthly Leaderboard</p>
                    <p className="text-2xl font-bold">Active</p>
                    <Button variant="outline" size="sm" className="mt-4 rounded-full">
                      Configure
                    </Button>
                  </CardContent>
                </Card>
                <Card className="rounded-2xl border-2 border-dashed">
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground mb-2">All-Time Leaderboard</p>
                    <p className="text-2xl font-bold">Active</p>
                    <Button variant="outline" size="sm" className="mt-4 rounded-full">
                      Configure
                    </Button>
                  </CardContent>
                </Card>
              </div>
              <div className="pt-4">
                <Button className="rounded-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Special Event Leaderboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
