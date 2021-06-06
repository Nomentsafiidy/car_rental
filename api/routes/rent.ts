import { Request, Response, Router } from 'express';
import { DbManager } from './../services/DbManager';

export const rentRouter = Router();

rentRouter.post('/getRents', async (req: Request, res: Response) => {
    let response: any = {
        success: false,
    };
    let queryString: string = '';
    let rentList: any;
    let { keyWord, startDate, endDate } = req.body;
    if (keyWord && startDate && endDate && !isNaN(parseInt(keyWord)) && !isNaN(parseInt(startDate)) && !isNaN(parseInt(endDate))) {
        queryString = `SELECT rent.id as id, carId, renterId, daysNumber, date, 
                        designation, dailyRent,
                        name, address                        
                        FROM rent 
                        INNER JOIN car ON car.id = carId
                        INNER JOIN renter ON renter.id = renterId
                        where (
                        id = ${parseInt(keyWord)} OR
                        carId = ${parseInt(keyWord)} OR 
                        renterId = ${parseInt(keyWord)} 
                        ) 
                            AND 
                        (  
                            date >= ${parseInt(startDate)} AND 
                            date <= ${parseInt(endDate)}  
                        ) `;
    } else if (keyWord && !isNaN(parseInt(keyWord))) {
        queryString = `SELECT rent.id as id, carId, renterId, daysNumber, date, 
                        designation, dailyRent,
                        name, address                        
                        FROM rent 
                        INNER JOIN car ON car.id = carId
                        INNER JOIN renter ON renter.id = renterId
                        where
                        rent.id = ${parseInt(keyWord)} OR
                        carId = ${parseInt(keyWord)} OR 
                        renterId = ${parseInt(keyWord)} `;
    } else if (startDate && endDate && !isNaN(parseInt(startDate)) && !isNaN(parseInt(endDate))) {
        queryString = `SELECT rent.id as id, carId, renterId, daysNumber, date, 
                        designation, dailyRent,
                        name, address                        
                        FROM rent 
                        INNER JOIN car ON car.id = carId
                        INNER JOIN renter ON renter.id = renterId 
                        where 
                            date >= ${parseInt(startDate)} AND 
                            date <= ${parseInt(endDate)} `;
    } else {
        queryString = ` SELECT rent.id as id, carId, renterId, daysNumber, date, 
                        designation, dailyRent,
                        name, address                        
                        FROM rent 
                        INNER JOIN car ON car.id = carId
                        INNER JOIN renter ON renter.id = renterId `;
    }
    rentList = await new DbManager().exec(queryString);
    if (rentList) {
        response.success = true;
        response.rent = rentList;
    } else {
        response.success = false;
        response.message = 'Error :';
    }
    res.json(response);
});

rentRouter.post('/getRentInfoGroupByCar', async (req: Request, res: Response) => {
    let response: any = {
        success: false,
    };
    let queryString: string = '';
    let rentList: any;
    let { startDate, endDate } = req.body;

    let queryCarString = 'SELECT * FROM car';
    let carList: any = await new DbManager().exec(queryCarString);

    var group: any[] = [];

    for (let i = 0; i < carList.length; i++) {
        if (startDate && endDate && !isNaN(parseInt(startDate)) && !isNaN(parseInt(endDate))) {
            queryString = `SELECT rent.id as id, carId, renterId, daysNumber, date, 
                            designation, dailyRent,
                            name, address, car.id as carGroup                         
                            FROM rent 
                            INNER JOIN car ON car.id = carId
                            INNER JOIN renter ON renter.id = renterId 
                            where 
                                date >= ${parseInt(startDate)} AND 
                                date <= ${parseInt(endDate)} AND
                                carId = ${carList[i].id}
                             `;
        } else {
            queryString = ` SELECT rent.id as id, carId, renterId, daysNumber, date, 
                            designation, dailyRent,
                            name, address                        
                            FROM rent 
                            INNER JOIN car ON car.id = carId
                            INNER JOIN renter ON renter.id = renterId 
                            where carId = ${carList[i].id}
                            `;
        }
        rentList = await new DbManager().exec(queryString);
        if (rentList) {
            group.push({
                car: carList[i],
                rent: rentList,
            } as any);
        }
    }
    if (group && group.length !== 0) {
        response.success = true;
        response.rents = group;
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
