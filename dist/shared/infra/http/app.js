"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var routes_1 = __importDefault(require("@shared/infra/http/routes"));
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
var typeorm_1 = __importDefault(require("@shared/infra/typeorm"));
var upload_1 = __importDefault(require("@config/upload"));
typeorm_1.default();
var app = express_1.default();
app.use(express_1.default.json());
app.use('/files', express_1.default.static(upload_1.default.tmpFolder));
app.use(routes_1.default);
app.use(function (err, request, response, _) {
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    console.error(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
exports.default = app;
