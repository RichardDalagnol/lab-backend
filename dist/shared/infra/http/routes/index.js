"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_routes_1 = __importDefault(require("@modules/User/infra/http/routes/user.routes"));
var pathogen_routes_1 = __importDefault(require("@modules/Lab/infra/http/routes/pathogen.routes"));
var session_routes_1 = __importDefault(require("@modules/User/infra/http/routes/session.routes"));
var Auth_1 = __importDefault(require("@modules/User/infra/http/middlewares/Auth"));
var routes = express_1.Router();
routes.use('/session', session_routes_1.default);
routes.use(Auth_1.default);
routes.use('/user', user_routes_1.default);
routes.use('/pathogen', pathogen_routes_1.default);
exports.default = routes;
