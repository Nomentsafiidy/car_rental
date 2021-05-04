"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRouter = void 0;
var express_1 = require("express");
exports.carRouter = express_1.Router();
exports.carRouter.get('/getCars', function (req, res) {
    res.send('/getCars');
});
exports.carRouter.get('/deleteCar/:id', function (req, res) {
    res.send('/deleteCar/' + req.params.id);
});
exports.carRouter.post('/updateCar/:id', function (req, res) {
    res.send('/updateCar/:id' + req.params.id);
});
exports.carRouter.post('/addCar', function (req, res) {
    res.send('/addCar');
});
