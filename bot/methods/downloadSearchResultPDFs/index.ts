import fs from 'fs'

import { DocumentType } from '../../../models/DocumentType'
import { SearchResult } from '../../../models/SearchResult'

import { downloadSearchResultPDF } from '../../services'

export const downloadSearchResultPDFs = async (isTest: boolean | string) => {
  await fs.promises.readFile('./searchResult.json', 'utf8')
    .then(async (data) => {
      const dataset = JSON.parse(data)
      const finalSearchResult: SearchResult[] = dataset.finalSearchResult

      const itemToProcess = isTest ? 3 : finalSearchResult.length

      for (let i = 0; i < itemToProcess; i++) {
        const searchResult = finalSearchResult[i]

        await downloadSearchResultPDF(searchResult, DocumentType.BULA)
        await downloadSearchResultPDF(searchResult, DocumentType.FISPQ)
      }
    })
    .catch((err) => {
      console.log(`Error reading file from disk: ${err}`)
    })
}
