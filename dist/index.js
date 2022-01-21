"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* import reader from 'xlsx' */
var bot_1 = require("./bot");
/* import { Product } from './models/xlsxData'
import { formatDataSet } from './utils/formatDataSet' */
/* const file = reader.readFile('./data/Produto_BULA_FISPQ.xlsx')

const products: Product[] = formatDataSet(file)

bot.generateSearchJSON(products) */
bot_1.bot.downloadPDFs();
