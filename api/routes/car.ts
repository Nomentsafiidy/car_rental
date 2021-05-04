import { Request, Response, Router } from 'express';

export const carRouter = Router();

carRouter.get('/getCars', (req: Request, res: Response) => {
    res.send('/getCars');
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
