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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.__esModule = true;
exports.authController = void 0;
var User_1 = require("../models/User");
var bcrypt_1 = require("bcrypt");
var jsonwebtoken_1 = require("jsonwebtoken");
var express_validator_1 = require("express-validator");
var authController_ = /** @class */ (function () {
    function authController_() {
    }
    authController_.prototype.registration = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, _a, email, password, candidate, hashPassword, user, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        errors = (0, express_validator_1.validationResult)(req);
                        if (!errors.isEmpty()) {
                            return [2 /*return*/, res.status(400).json({ message: "Signup error", errors: errors["errors"] })];
                        }
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, User_1.User.findOne({ email: email })];
                    case 1:
                        candidate = _b.sent();
                        if (candidate) {
                            return [2 /*return*/, res.status(400).json({ message: "User with this email already exists" })];
                        }
                        hashPassword = (0, bcrypt_1.hashSync)(password, 8);
                        user = new User_1.User({ email: email, password: hashPassword });
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, res.json({ message: 'User inserted successfully' })];
                    case 3:
                        e_1 = _b.sent();
                        console.log(e_1);
                        res.status(400).json({ message: "Signup error" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    authController_.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user, result, token, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, User_1.User.findOne({ email: email })];
                    case 1:
                        user = _b.sent();
                        if (user) {
                            result = (0, bcrypt_1.compareSync)(password, user.password);
                            if (result) {
                                token = (0, jsonwebtoken_1.sign)({ email: email }, process.env.JWTSECRET, { expiresIn: '1h' });
                                res.json({ token: token });
                            }
                            else {
                                res.status(400).json({ error: "password doesn't match" });
                            }
                        }
                        else {
                            res.status(400).json({ error: "User doesn't exist" });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        res.status(400).json({ error: error_1 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    authController_.prototype.getUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    res.json({ message: 'ALL WORK' });
                }
                catch (e) {
                }
                return [2 /*return*/];
            });
        });
    };
    return authController_;
}());
exports.authController = new authController_();
