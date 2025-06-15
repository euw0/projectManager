export interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface Credential {
  id: string;
  project_id: string;
  title: string;
  username: string;
  password: string;
  website_url?: string;
  category: 'email' | 'bank' | 'social' | 'work' | 'personal' | 'other';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectNote {
  id: string;
  project_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface GoogleSheet {
  id: string;
  name: string;
  url: string;
  project_id: string;
  created_at: string;
}