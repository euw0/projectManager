import React, { createContext, useContext, useState } from 'react';
import { Project, Credential, ProjectNote } from '@/types';

interface ProjectContextType {
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  credentials: Credential[];
  setCredentials: (credentials: Credential[]) => void;
  notes: ProjectNote[];
  setNotes: (notes: ProjectNote[]) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [notes, setNotes] = useState<ProjectNote[]>([]);

  const value = {
    currentProject,
    setCurrentProject,
    credentials,
    setCredentials,
    notes,
    setNotes,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}