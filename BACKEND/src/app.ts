import express from 'express';
import router from './routes/taskRoutes';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/tasks', router);

const port = 8000;

app.listen(port, () => {
  console.log(` Server is running on port ${port}`);
});
