import express, { Application } from 'express';
// routes import
import { carRouter } from './routes/car';
import { renterRouter } from './routes/renter';

const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(carRouter);
app.use(renterRouter);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
