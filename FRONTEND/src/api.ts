import axios from 'axios';
import { Task, TaskFormData } from './types';

const API_URL = 'http://localhost:8000/api'; // Replace with your actual backend URL

export const api = {
  getTasks: async () => {
    const response = await axios.get<{ message: string; tasks: Task[] }>(`${API_URL}/tasks`);
    return response.data.tasks;
  },

  createTask: async (taskData: TaskFormData) => {
    const response = await axios.post<{ message: string; newTask: Task }>(`${API_URL}/tasks`, {
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      dueDate: taskData.dueDate
    });
    return response.data.newTask;
  },

  updateTask: async (id: number, task: Partial<Task>) => {
    const response = await axios.put<{ message: string; task: Task }>(
      `${API_URL}/tasks/${id}`,
      task
    );
    return response.data.task;
  },

  deleteTask: async (id: number) => {
    await axios.delete(`${API_URL}/tasks/${id}`);
  }
};