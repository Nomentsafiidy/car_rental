"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// routes import
var car_1 = require("./routes/car");
var app = express_1.default();
var port = 3000;
app.use(express_1.default.json());
app.use(car_1.carRouter);
app.listen(port, function () { return console.log("Example app listening at http://localhost:" + port); });
