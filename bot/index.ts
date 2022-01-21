import { Product } from '../models/Product'
import { downloadSearchResultPDFs } from './methods/downloadSearchResultPDFs'
import { generateSearchJSON } from './methods/generateSearchJSON'
import { deleteCorruptedFiles } from './methods/deleteCorruptedFiles'
import { exportDownloadedFiles } from './methods/exportDownloadedFiles'

export const bot = {
  generateSearchJSON: async (products: Product[], isTest: boolean | string) => await generateSearchJSON(products, isTest),
  downloadSearchResultPDFs: async (isTest: boolean | string) => await downloadSearchResultPDFs(isTest),
  deleteCorruptedFiles: async (isTest: boolean | string) => await deleteCorruptedFiles(isTest),
  exportDownloadedFiles: async () => await exportDownloadedFiles()
}
