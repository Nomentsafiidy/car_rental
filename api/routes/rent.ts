import { Request, Response, Router } from 'express';
import { DbManager } from './../services/DbManager';

export const rentRouter = Router();

rentRouter.get('/getRent', async (_req: Request, res: Response) => {
    let response: any = {
        success: false,
    };
    let rentList = await new DbManager().exec('SELECT * FROM rent');
    if (rentList) {
        response.success = true;
        response.rent = rentList;
    } else {
        response.success = false;
        response.message = 'Error :';
    }
    res.json(response);
});

rentRouter.get('/deleteRent/:id', async (req: Request, res: Response) => {
    let response: any = {
        success: false,
    };
    let qr = await new DbManager().exec(`DELETE FROM rent WHERE id = ${parseInt(req.params.id)}`);
    if (qr) {
        response.success = true;
    } else {
        response.success = false;
        response.message = 'Error :';
    }
    res.json(response);
});

rentRouter.post('/updateRent', async (req: Request, res: Response) => {
    let { id, carId, renterId, daysNumber, date } = req.body;
    let response: any = {
        success: false,
    };
    let qr: any = await new DbManager().exec(`UPDATE rent
    SET carId = ${parseInt(carId)}, renterId = ${parseInt(renterId)}, 
    daysNumber = ${parseInt(daysNumber)}, date = ${parseInt(date)} 
    WHERE id = ${parseInt(id)}`);
    if (qr) {
        response.success = true;
    } else {
        response.success = false;
        response.message = 'Error :';
    }
    res.json(response);
});

rentRouter.post('/addRent', async (req: Request, res: Response) => {
    let { carId, renterId, daysNumber, date } = req.body;
    let response: any = {
        success: false,
    };
    let qr: any = await new DbManager().exec(`INSERT INTO rent (carId, renterId, daysNumber, date)
VALUES ( ${parseInt(carId)}, ${parseInt(renterId)}, ${parseInt(daysNumber)}, ${parseInt(date)} )`);
    if (qr) {
        response.success = true;
        response.id = qr.insertId;
    } else {
        response.success = false;
        response.message = 'Error :';
    }
    res.json(response);
});
