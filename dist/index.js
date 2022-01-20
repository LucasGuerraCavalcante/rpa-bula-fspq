"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var xlsx_1 = __importDefault(require("xlsx"));
var bot_1 = require("./bot");
var formatDataSet_1 = require("./utils/formatDataSet");
var file = xlsx_1.default.readFile('./data/Produto_BULA_FISPQ.xlsx');
var products = (0, formatDataSet_1.formatDataSet)(file);
bot_1.bot.searchAndFillAllBulasAndFispq(products);
