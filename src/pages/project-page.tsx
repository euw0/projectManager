import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, FileText, Table } from 'lucide-react';
import { useProject } from '@/contexts/project-context';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types';
import { toast } from 'sonner';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import CredentialsTab from '@/components/credentials-tab';
import NotesTab from '@/components/notes-tab';
import SheetsTab from '@/components/sheets-tab';

export default function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { currentProject, setCurrentProject } = useProject();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectId && (!currentProject || currentProject.id !== projectId)) {
      fetchProject();
    } else {
      setLoading(false);
    }
  }, [projectId, currentProject]);

  const fetchProject = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (error) throw error;
      setCurrentProject(data);
    } catch (error) {
      console.error('Error fetching project:', error);
      toast.error('Failed to load project');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project not found</h2>
          <Button onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{currentProject.name}</h1>
              <p className="text-muted-foreground">
                {currentProject.description || 'No description'}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="credentials" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="credentials" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Credentials</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Notes</span>
            </TabsTrigger>
            <TabsTrigger value="sheets" className="flex items-center space-x-2">
              <Table className="h-4 w-4" />
              <span>Google Sheets</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="credentials" className="mt-6">
            <CredentialsTab />
          </TabsContent>
          
          <TabsContent value="notes" className="mt-6">
            <NotesTab />
          </TabsContent>
          
          <TabsContent value="sheets" className="mt-6">
            <SheetsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}