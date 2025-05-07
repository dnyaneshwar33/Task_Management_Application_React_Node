import { Request, Response, NextFunction } from 'express';
import tasks from '../data/data';

class TaskController {
  addNewTask = (req: Request, res: Response, next: NextFunction): any => {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: 'Title and description are required' });
    }

    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      completed: false,
    };

    tasks.push(newTask);
    res.status(201).json({ message: 'Task Added Successfully', newTask });
  };

  getAllTasks = (req: Request, res: Response): void => {
    res.status(200).json({ message: 'Tasks fetched Successfully', tasks });
  };

  updateTask = (req: Request, res: Response): any => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    if (!title && !description && completed === undefined) {
      return res
        .status(400)
        .json({ message: 'At least one field to update is required' });
    }

    const taskId = Number(id);
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      return res.status(400).json({ message: 'Task not found' });
    }

    const task = tasks[taskIndex];

    if (title) task.title = title;
    if (description) task.description = description;
    if (completed !== undefined) task.completed = completed;

    res.status(200).json({ message: 'Task updated Successfully', task });
  };

  deleteTask = (req: Request, res: Response): any => {
    const { id } = req.params;
    const taskId = Number(id);
    const taskIndex = tasks.findIndex((task) => task.id == taskId);

    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }
    tasks.splice(taskIndex, 1);
    res.status(200).json({ message: 'Task Deleted Successfully' });
  };
}

export default new TaskController();
