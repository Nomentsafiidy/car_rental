"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRouter = void 0;
var express_1 = require("express");
var DbManager_1 = require("./../services/DbManager");
exports.carRouter = express_1.Router();
exports.carRouter.post('/getCars', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, keyWord, queryString, carList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                response = {
                    success: false,
                };
                keyWord = req.body.keyWord;
                queryString = '';
                if (keyWord && isNaN(parseInt(keyWord))) {
                    queryString = "SELECT * FROM car WHERE designation LIKE '%" + keyWord + "%' ";
                }
                else if (keyWord && !isNaN(parseInt(keyWord))) {
                    queryString = "SELECT * FROM car WHERE id = " + parseInt(keyWord) + " ";
                }
                else {
                    queryString = 'SELECT * FROM car';
                }
                return [4 /*yield*/, new DbManager_1.DbManager().exec(queryString)];
            case 1:
                carList = _a.sent();
                if (carList) {
                    response.success = true;
                    response.cars = carList;
                }
                else {
                    response.success = false;
                    response.message = 'Error :';
                }
                res.json(response);
                return [2 /*return*/];
        }
    });
}); });
exports.carRouter.post('/getCarRentInfo', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, _a, id, startDate, endDate, queryString, carList;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                response = {
                    success: false,
                };
                _a = req.body, id = _a.id, startDate = _a.startDate, endDate = _a.endDate;
                if (!(id && startDate && endDate)) return [3 /*break*/, 2];
                queryString = '';
                queryString = "SELECT car.id as id, carId, renterId, daysNumber, date, \n                    designation, dailyRent,\n                    name, address\n                    FROM car \n                   INNER JOIN rent ON rent.carId = car.id AND date >= " + parseInt(startDate) + " AND \n                   date <= " + parseInt(endDate) + " \n                   INNER JOIN renter ON renter.id = rent.renterId\n                   WHERE car.id = " + parseInt(id) + " ";
                return [4 /*yield*/, new DbManager_1.DbManager().exec(queryString)];
            case 1:
                carList = _b.sent();
                if (carList) {
                    response.success = true;
                    response.cars = carList;
                }
                else {
                    response.success = false;
                    response.message = 'Error :';
                }
                _b.label = 2;
            case 2:
                res.json(response);
                return [2 /*return*/];
        }
    });
}); });
exports.carRouter.get('/deleteCar/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, carList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                response = {
                    success: false,
                };
                return [4 /*yield*/, new DbManager_1.DbManager().exec("DELETE FROM car WHERE id = " + parseInt(req.params.id))];
            case 1:
                carList = _a.sent();
                if (carList) {
                    response.success = true;
                }
                else {
                    response.success = false;
                    response.message = 'Error :';
                }
                res.json(response);
                return [2 /*return*/];
        }
    });
}); });
exports.carRouter.post('/updateCar', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, designation, dailyRent, response, car;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id = _a.id, designation = _a.designation, dailyRent = _a.dailyRent;
                response = {
                    success: false,
                };
                return [4 /*yield*/, new DbManager_1.DbManager().exec("UPDATE car\n    SET designation = '" + designation.toString() + "', dailyRent = " + parseInt(dailyRent) + "\n    WHERE id = " + parseInt(id))];
            case 1:
                car = _b.sent();
                if (car) {
                    response.success = true;
                }
                else {
                    response.success = false;
                    response.message = 'Error :';
                }
                res.json(response);
                return [2 /*return*/];
        }
    });
}); });
exports.carRouter.post('/addCar', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, designation, dailyRent, response, car;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, designation = _a.designation, dailyRent = _a.dailyRent;
                response = {
                    success: false,
                };
                return [4 /*yield*/, new DbManager_1.DbManager().exec("INSERT INTO car (designation, dailyRent)\nVALUES ( '" + designation.toString() + "', " + parseInt(dailyRent) + " )")];
            case 1:
                car = _b.sent();
                if (car) {
                    response.success = true;
                    response.id = car.insertId;
                }
                else {
                    response.success = false;
                    response.message = 'Error :';
                }
                res.json(response);
                return [2 /*return*/];
        }
    });
}); });
