import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, BarChart3, FolderCog, ArrowLeft, Shield } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { UserManagement } from '@/components/admin/UserManagement';
import { AnalyticsDashboard } from '@/components/admin/AnalyticsDashboard';
import { ContentManagement } from '@/components/admin/ContentManagement';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('users');

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
                <Shield className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="hidden sm:inline">Logged in as:</span>
              <span className="font-medium text-foreground">admin@prepwyse.com</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-3 rounded-2xl h-12 mb-8">
            <TabsTrigger
              value="users"
              className="flex items-center gap-2 rounded-xl"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="flex items-center gap-2 rounded-xl"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="flex items-center gap-2 rounded-xl"
            >
              <FolderCog className="h-4 w-4" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">User Management</h2>
              <p className="text-muted-foreground">
                View, search, edit, and manage all registered users.
              </p>
            </div>
            <UserManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
              <p className="text-muted-foreground">
                Platform metrics, trends, and user engagement insights.
              </p>
            </div>
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="content">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Content Management</h2>
              <p className="text-muted-foreground">
                Manage events, videos, papers, formulas, and leaderboards.
              </p>
            </div>
            <ContentManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
