import { Request, Response, Router } from 'express';
import { DbManager } from './../services/DbManager';

export const carRouter = Router();

carRouter.post('/getCars', async (req: Request, res: Response) => {
    let response: any = {
        success: false,
    };
    let { keyWord } = req.body;
    let queryString: string = '';
    if (keyWord && isNaN(parseInt(keyWord))) {
        queryString = `SELECT * FROM car WHERE designation LIKE '%${keyWord}%' `;
    } else if (keyWord && !isNaN(parseInt(keyWord))) {
        queryString = `SELECT * FROM car WHERE id = ${parseInt(keyWord)} `;
    } else {
        queryString = 'SELECT * FROM car';
    }
    let carList = await new DbManager().exec(queryString);
    if (carList) {
        response.success = true;
        response.cars = carList;
    } else {
        response.success = false;
        response.message = 'Error :';
    }
    res.json(response);
});

carRouter.get('/deleteCar/:id', async (req: Request, res: Response) => {
    let response: any = {
        success: false,
    };
    let carList = await new DbManager().exec(`DELETE FROM car WHERE id = ${parseInt(req.params.id)}`);
    if (carList) {
        response.success = true;
    } else {
        response.success = false;
        response.message = 'Error :';
    }
    res.json(response);
});

carRouter.post('/updateCar', async (req: Request, res: Response) => {
    let { id, designation, dailyRent } = req.body;
    let response: any = {
        success: false,
    };
    let car: any = await new DbManager().exec(`UPDATE car
    SET designation = '${designation.toString()}', dailyRent = ${parseInt(dailyRent)}
    WHERE id = ${parseInt(id)}`);
    if (car) {
        response.success = true;
    } else {
        response.success = false;
        response.message = 'Error :';
    }
    res.json(response);
});

carRouter.post('/addCar', async (req: Request, res: Response) => {
    let { designation, dailyRent } = req.body;
    let response: any = {
        success: false,
    };
    let car: any = await new DbManager().exec(`INSERT INTO car (designation, dailyRent)
VALUES ( '${designation.toString()}', ${parseInt(dailyRent)} )`);
    if (car) {
        response.success = true;
        response.id = car.insertId;
    } else {
        response.success = false;
        response.message = 'Error :';
    }
    res.json(response);
});
