import express, { Application } from 'express';
// routes import
import { carRouter } from './routes/car';

const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(carRouter);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
