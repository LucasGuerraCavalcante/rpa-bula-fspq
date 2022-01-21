import fs from 'fs'
import http from 'http'
import https from 'https'

import { SearchResult } from '../../../models/SearchResult'

export const downloadPDFs = async () => {
  fs.readFile('./finalSearchResult.json', 'utf8', async (err, data) => {
    if (err) {
      console.log(`Error reading file from disk: ${err}`)
    } else {
      const dataset = JSON.parse(data)
      const finalSearchResult: SearchResult[] = dataset.finalSearchResult

      for (let i = 0; i < finalSearchResult.length; i++) {
        const searchResult = finalSearchResult[i]

        if (searchResult.bulaSearchResult?.includes('.pdf')) {
          const file = fs.createWriteStream(`./data/pdfsBulls/${searchResult.cod}_1.pdf`)

          if (searchResult.bulaSearchResult.includes('https://')) {
            https.get(searchResult.bulaSearchResult, (response) => {
              response.pipe(file)
            }).on('error', (err) => {
              console.log(`${i + 1} of ${finalSearchResult.length} - Starting download process for: Bull ${searchResult.cod}  ${searchResult.name}: `, err)
            }).on('finish', () => {
              console.log(`${i + 1} of ${finalSearchResult.length} - Download process finished for: Bull ${searchResult.cod}  ${searchResult.name}`)
            })
          } else {
            http.get(searchResult.bulaSearchResult, (response) => {
              response.pipe(file)
            }).on('error', (err) => {
              console.log(`${i + 1} of ${finalSearchResult.length} - Download failed for: Bull ${searchResult.cod}  ${searchResult.name}: `, err)
            }).on('finish', () => {
              console.log(`${i + 1} of ${finalSearchResult.length} - Download process finished for: Bull ${searchResult.cod}  ${searchResult.name}`)
            })
          }
        } else {
          console.log(`Cannot download PDF for ${searchResult.name}: Bull .pdf URL not available`)
        }

        if (searchResult.fispqSearchResult?.includes('.pdf')) {
          const file = fs.createWriteStream(`./data/pdfsFispqs/${searchResult.cod}_2.pdf`)

          if (searchResult.fispqSearchResult.includes('https://')) {
            https.get(searchResult.fispqSearchResult, (response) => {
              response.pipe(file)
            }).on('error', (err) => {
              console.log(`${i + 1} of ${finalSearchResult.length} - Download failed for: FISPQ ${searchResult.cod}  ${searchResult.name}: `, err)
            }).on('finish', () => {
              console.log(`${i + 1} of ${finalSearchResult.length} - Download process finished for: FISPQ ${searchResult.cod}  ${searchResult.name}`)
            })
          } else {
            http.get(searchResult.fispqSearchResult, (response) => {
              response.pipe(file)
            }).on('error', (err) => {
              console.log(`${i + 1} of ${finalSearchResult.length} - Starting download process for: FISPQ ${searchResult.cod}  ${searchResult.name}: `, err)
            }).on('finish', () => {
              console.log(`${i + 1} of ${finalSearchResult.length} - Download process finished for: FISPQ ${searchResult.cod}  ${searchResult.name}`)
            })
          }
        } else {
          console.log(`Cannot downloaded PDF for ${searchResult.name}: FISPQ .pdf URL not available`)
        }
      }
    }
  })
}
