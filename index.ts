/* import reader from 'xlsx' */
import { bot } from './bot'
/* import { Product } from './models/xlsxData'
import { formatDataSet } from './utils/formatDataSet' */

/* const file = reader.readFile('./data/Produto_BULA_FISPQ.xlsx')

const products: Product[] = formatDataSet(file)

bot.generateSearchJSON(products) */
bot.downloadPDFs()
