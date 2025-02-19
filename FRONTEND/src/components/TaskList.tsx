import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Checkbox,
} from '@mui/material';
import { Pencil, Trash2 } from 'lucide-react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number, completed: boolean) => void;
}

export function TaskList({ tasks = [], onEdit, onDelete, onToggleComplete }: TaskListProps) {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">Status</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            {/* <TableCell>Priority</TableCell> */}
            {/* <TableCell>Due Date</TableCell> */}
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(tasks) && tasks.map((task) => (
            <TableRow
              key={task.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor: task.completed ? 'rgba(0, 0, 0, 0.04)' : 'inherit',
              }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={task.completed}
                  onChange={(e) => onToggleComplete(Number(task.id), e.target.checked)}
                />
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              >
                {task.title}
              </TableCell>
              <TableCell>{task.description}</TableCell>
              {/* <TableCell>
                <Chip
                  label={task.priority}
                  color={priorityColors[task.priority]}
                  size="small"
                />
              </TableCell> */}
              {/* <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell> */}
              <TableCell align="right">
                <IconButton onClick={() => onEdit(task)} color="primary" size="small">
                  <Pencil size={18} />
                </IconButton>
                <IconButton onClick={() => onDelete(Number(task.id))} color="error" size="small">
                  <Trash2 size={18} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}