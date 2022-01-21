import reader from 'xlsx'
import { bot } from './bot'
import { Product } from './models/Product'
import { formatDataSet } from './utils/formatDataSet'
import readlineSync from 'readline-sync'

const file = reader.readFile('./data/Produto_BULA_FISPQ.xlsx')

const products: Product[] = formatDataSet(file)

const runBot = async () => {
  if (readlineSync.keyInYN('Generate a new search result JSON file?: ')) {
    await bot.generateSearchJSON(products)
  }

  if (readlineSync.keyInYN('Download PDFs files?: ')) {
    await bot.downloadPDFs()
  }
}

runBot()
