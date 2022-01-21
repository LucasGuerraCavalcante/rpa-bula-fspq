import { Product } from '../models/Product'
import { downloadPDFs } from './methods/downloadPDFs'
import { generateSearchJSON } from './methods/generateSearchJSON'

export const bot = {
  generateSearchJSON: (products: Product[]) => generateSearchJSON(products),
  downloadPDFs: () => downloadPDFs()
}
