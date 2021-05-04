"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbManager = void 0;
var mysql_1 = __importDefault(require("mysql"));
var DbManager = /** @class */ (function () {
    function DbManager() {
        var _this = this;
        this.exec = function (query) {
            return new Promise(function (resolve) {
                _this.connection.connect();
                _this.connection.query(query, function (error, results, fields) {
                    if (error)
                        throw error;
                    resolve(results);
                });
                _this.connection.end();
            });
        };
        this.connection = mysql_1.default.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'car_rental',
        });
    }
    return DbManager;
}());
exports.DbManager = DbManager;
