import mysql from 'mysql';

export class DbManager {
    private connection: any;

    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'car_rental',
        });
    }

    public exec = (query: string) => {
        return new Promise((resolve) => {
            this.connection.connect();
            this.connection.query(query, function (error: any, results: any, fields: any) {
                if (error) throw error;
                resolve(results);
            });
            this.connection.end();
        });
    };
}
