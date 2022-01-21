import { Product } from '../models/Product'
import { downloadPDFs } from './methods/downloadPDFs'
import { generateSearchJSON } from './methods/generateSearchJSON'

export const bot = {
  generateSearchJSON: async (products: Product[]) => await generateSearchJSON(products),
  downloadPDFs: async () => await downloadPDFs()
}
