"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDataSet = void 0;
var xlsx_1 = __importDefault(require("xlsx"));
var formatDataSet = function (file) {
    var sheets = file.SheetNames;
    var data = xlsx_1.default.utils.sheet_to_json(file.Sheets[sheets[0]]);
    return data;
};
exports.formatDataSet = formatDataSet;
