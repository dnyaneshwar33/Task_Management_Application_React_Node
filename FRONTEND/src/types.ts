export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}