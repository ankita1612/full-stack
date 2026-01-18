import express, { Application } from 'express';
import postRoutes from './routes/post.route';

const app: Application = express();

app.use(express.json());

// routes
app.use('/api/v1/posts', postRoutes);

// health check
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK' });
});

export default app;
