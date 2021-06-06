"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// routes import
var car_1 = require("./routes/car");
var renter_1 = require("./routes/renter");
var rent_1 = require("./routes/rent");
var app = express_1.default();
var port = 3000;
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(express_1.default.json());
app.use(car_1.carRouter);
app.use(renter_1.renterRouter);
app.use(rent_1.rentRouter);
app.listen(port, function () { return console.log("Example app listening at http://localhost:" + port); });
