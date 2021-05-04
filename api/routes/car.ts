import { Request, Response, Router } from 'express';
import { DbManager } from './../services/DbManager';

export const carRouter = Router();

carRouter.get('/getCars', async (req: Request, res: Response) => {
    let response: any = {
        success: false,
    };
    let carList = await new DbManager().exec('SELECT * FROM car');
    if (carList) {
        response.success = true;
        response.cars = carList;
    } else {
        response.success = false;
        response.message = 'Error :';
    }
    res.json(response);
});

carRouter.get('/deleteCar/:id', (req: Request, res: Response) => {
    res.send('/deleteCar/' + req.params.id);
});

carRouter.post('/updateCar/:id', (req: Request, res: Response) => {
    res.send('/updateCar/:id' + req.params.id);
});

carRouter.post('/addCar', (req: Request, res: Response) => {
    res.send('/addCar');
});
