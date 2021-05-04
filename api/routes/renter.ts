import { Request, Response, Router } from 'express';
import { DbManager } from './../services/DbManager';

export const renterRouter = Router();

renterRouter.post('/getRenters', async (req: Request, res: Response) => {
    let response: any = {
        success: false,
    };
    let { keyWord } = req.body;
    let queryString: string = '';
    if (keyWord && isNaN(parseInt(keyWord))) {
        queryString = `SELECT * FROM renter WHERE name LIKE '%${keyWord}%' OR address LIKE '%${keyWord}%' `;
    } else if (keyWord && !isNaN(parseInt(keyWord))) {
        queryString = `SELECT * FROM renter WHERE id = ${parseInt(keyWord)} `;
    } else {
        queryString = 'SELECT * FROM renter';
    }
    let renterList = await new DbManager().exec(queryString);
    if (renterList) {
        response.success = true;
        response.renters = renterList;
    } else {
        response.success = false;
        response.message = 'Error :';
    }
    res.json(response);
});

renterRouter.get('/deleteRenter/:id', async (req: Request, res: Response) => {
    let response: any = {
        success: false,
    };
    let qr = await new DbManager().exec(`DELETE FROM renter WHERE id = ${parseInt(req.params.id)}`);
    if (qr) {
        response.success = true;
    } else {
        response.success = false;
        response.message = 'Error :';
    }
    res.json(response);
});

renterRouter.post('/updateRenter', async (req: Request, res: Response) => {
    let { id, name, address } = req.body;
    let response: any = {
        success: false,
    };
    let qr: any = await new DbManager().exec(`UPDATE renter
    SET name = '${name}', address = '${address}'
    WHERE id = ${parseInt(id)}`);
    if (qr) {
        response.success = true;
    } else {
        response.success = false;
        response.message = 'Error :';
    }
    res.json(response);
});

renterRouter.post('/addRenter', async (req: Request, res: Response) => {
    let { name, address } = req.body;
    let response: any = {
        success: false,
    };
    let qr: any = await new DbManager().exec(`INSERT INTO renter (name, address)
VALUES ( '${name}', '${address}' )`);
    if (qr) {
        response.success = true;
        response.id = qr.insertId;
    } else {
        response.success = false;
        response.message = 'Error :';
    }
    res.json(response);
});
