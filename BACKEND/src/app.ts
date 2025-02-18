import express from 'express';
import router from './routes/taskRoutes';

const app = express();
app.use(express.json());

app.use('/api/tasks', router);

const port = 8000;

app.listen(port, () => {
  console.log(` Server is running on port ${port}`);
});
