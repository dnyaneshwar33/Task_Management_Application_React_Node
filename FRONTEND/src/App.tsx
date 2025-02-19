import React from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { Plus } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { Task, TaskFormData } from './types';
import { api } from './api';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
    },
    secondary: {
      main: '#7c3aed',
    },
    background: {
      default: '#f3f4f6',
    },
  },
});

function App() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingTask, setEditingTask] = React.useState<Task | null>(null);

  const fetchTasks = React.useCallback(async () => {
    try {
      const data = await api.getTasks();
      setTasks(data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    }
  }, []);

  React.useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async (data: TaskFormData) => {
    try {
      await api.createTask(data);
      await fetchTasks();
      setIsFormOpen(false);
      toast.success('Task created successfully');
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const handleUpdateTask = async (data: TaskFormData) => {
    if (!editingTask) return;
    try {
      const editingtaskNum=Number(editingTask.id);
      await api.updateTask(editingtaskNum, {
        ...data,
        completed: editingTask.completed
      });
      await fetchTasks();
      setIsFormOpen(false);
      setEditingTask(null);
      toast.success('Task updated successfully');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await api.deleteTask(id);
      await fetchTasks();
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      await api.updateTask(id, { completed });
      await fetchTasks();
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-right" />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
            Task Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<Plus size={20} />}
            onClick={() => {
              setEditingTask(null);
              setIsFormOpen(true);
            }}
          >
            New Task
          </Button>
        </Box>

        <TaskList
          tasks={tasks}
          onEdit={(task) => {
            setEditingTask(task);
            setIsFormOpen(true);
          }}
          onDelete={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
        />

        <TaskForm
          open={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingTask(null);
          }}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          initialData={
            editingTask
              ? {
                  title: editingTask.title,
                  description: editingTask.description,
                  priority: editingTask.priority,
                  dueDate: editingTask.dueDate,
                }
              : undefined
          }
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;