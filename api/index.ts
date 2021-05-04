import express, { Application } from 'express';
// routes import
import { carRouter } from './routes/car';
import { renterRouter } from './routes/renter';
import { rentRouter } from './routes/rent';

const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(carRouter);
app.use(renterRouter);
app.use(rentRouter);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
