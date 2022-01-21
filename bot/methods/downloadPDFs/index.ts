import fs from 'fs'

import { DocumentType } from '../../../models/DocumentType'
import { SearchResult } from '../../../models/SearchResult'

import { downloadPDF } from '../../services'

export const downloadPDFs = async () => {
  fs.readFile('./finalSearchResult.json', 'utf8', async (err, data) => {
    if (err) {
      console.log(`Error reading file from disk: ${err}`)
    } else {
      const dataset = JSON.parse(data)
      const finalSearchResult: SearchResult[] = dataset.finalSearchResult

      for (let i = 0; i < 3/* finalSearchResult.length */; i++) {
        const searchResult = finalSearchResult[i]

        await downloadPDF(searchResult, DocumentType.BULA)
        await downloadPDF(searchResult, DocumentType.FISPQ)
      }
    }
  })
}
