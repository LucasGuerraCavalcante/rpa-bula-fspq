import reader from 'xlsx'
import readlineSync from 'readline-sync'

import { bot } from './bot'
import { Product } from './models/Product'
import { formatDataSet } from './utils/formatDataSet'

const file = reader.readFile('./data/Produto_BULA_FISPQ.xlsx')

const products: Product[] = formatDataSet(file)

const runBot = async () => {
  const isTest = readlineSync.keyInYN('Are you just testing?: ')

  if (readlineSync.keyInYN('Generate a new search result JSON file?: ')) {
    await bot.generateSearchJSON(products, isTest)
  }

  if (readlineSync.keyInYN('Download PDFs files?: ')) {
    await bot.downloadSearchResultPDFs(isTest)
  }

  if (readlineSync.keyInYN('Verify corrupted files and delete them?: ')) {
    await bot.deleteCorruptedFiles(isTest)
  }

  if (readlineSync.keyInYN('Export downloaded files (.zip)?: ')) {
    await bot.exportDownloadedFiles()
  }

  /* if (readlineSync.keyInYN('Mark downloaded PDFs as "ok"?: ')) {
    await bot.markOkDownloadedPDFs(isTest)
  } */

  process.exit(0)
}

runBot()
