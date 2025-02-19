import { Router } from 'express';
import taskController from '../controller/taskController';

const router = Router();

router.post('/', taskController.addNewTask);
router.get('/', taskController.getAllTasks);
router.put('/:id?', taskController.updateTask);
router.delete('/:id?', taskController.deleteTask);

export default router;
