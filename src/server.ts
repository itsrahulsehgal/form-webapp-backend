import express from 'express';
import formRoutes from './routes/forms';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/forms', formRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
