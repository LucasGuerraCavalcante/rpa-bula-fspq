import { Product } from '../models/xlsxData'
import { generateAllBullsAndFisspqSearchJSON } from './methods/generateAllBullsAndFisspqSearchJSON'

export const bot = {
  generateAllBullsAndFisspqSearchJSON: (products: Product[]) => generateAllBullsAndFisspqSearchJSON(products)
}
