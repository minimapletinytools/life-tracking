export interface Entry {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export interface EntryFormData {
  title: string;
  content: string;
}