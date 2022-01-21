import reader from 'xlsx'
import { Product } from '../../models/Product'

export const formatDataSet = (file: reader.WorkBook) => {
  const sheets = file.SheetNames
  const data: Product[] = reader.utils.sheet_to_json(file.Sheets[sheets[0]])

  return data
}
