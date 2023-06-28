import express from 'express';
import router from './routes/index';

const PORT = parseInt(process.env.PORT, 10) || 5000;
const app = express();

app.use(express.json());

app.use('/', router);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

export default app;
