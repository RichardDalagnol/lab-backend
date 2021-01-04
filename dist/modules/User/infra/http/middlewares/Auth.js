"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var authConfig_1 = __importDefault(require("@config/authConfig"));
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
function ensureAuthenticated(req, res, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new AppError_1.default('O token deve ser informado');
    }
    var _a = authHeader.split(' '), token = _a[1];
    try {
        var decoded = jsonwebtoken_1.verify(token, authConfig_1.default.jwt.secret);
        var _b = decoded, sub = _b.sub, adm = _b.adm;
        req.user = {
            adm: adm,
            id: sub,
        };
        return next();
    }
    catch (_c) {
        throw new Error('Token inválido!');
    }
}
exports.default = ensureAuthenticated;
