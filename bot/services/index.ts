import puppeteer from 'puppeteer'
import fs from 'fs'
import http from 'http'
import https from 'https'

import { DocumentType } from '../../models/DocumentType'
import { SearchResult } from '../../models/SearchResult'
import { PDFsFolderPath } from '../../constants'

const selectToWait = '.result__body'
const selectorResult = 'a[data-testid="result-title-a"]'

export const getUrlFromDuckDuckGoSearch = async (page: puppeteer.Page, productName: string, documentToSearch: DocumentType) => {
  const formatedName = productName.replace(' ', '+')
  const searchUrl = `https://duckduckgo.com/?q=${formatedName}+${documentToSearch}+pdf&kl=br-pt&k1=-1`

  await page.goto(searchUrl)

  try {
    await page.waitForSelector(selectToWait, { visible: true })
  } catch (err) {
    console.log(`Something went wrong while acessing ${searchUrl}: .`, err)
    await page.reload()
    await page.waitForSelector(selectToWait, { visible: true })
  }

  const resultURL = await page.$$eval(selectorResult, (as: Element[]) => as.map(a => a.getAttribute('href')))

  return resultURL
}

export const generateSearchResultJSON = async (finalSearchResult: SearchResult[]) => {
  const finalDataResult = JSON.stringify({ finalSearchResult: finalSearchResult })

  fs.writeFile('searchResult.json', finalDataResult, (err: any) => {
    if (err) {
      console.log('Something went wrong while writing the JSON result file.', err)
    }
    console.log('JSON data is saved.')
  })
}

export const downloadSearchResultPDF = async (searchResult: SearchResult, documentType: DocumentType) => {
  const fileName = documentType === DocumentType.BULA ? `${searchResult.cod}_1.pdf` : `${searchResult.cod}_2.pdf`
  const pdfURL = documentType === DocumentType.BULA ? searchResult.bulaSearchResult : searchResult.fispqSearchResult

  const fileStream = fs.createWriteStream(`${PDFsFolderPath}/${fileName}`)

  if (pdfURL && pdfURL.includes('.pdf')) {
    if (pdfURL.includes('https://')) {
      return new Promise((resolve) => {
        https.get(pdfURL, (response) => {
          resolve(response.pipe(fileStream))
        }).on('error', (err) => {
          console.log(`Download failed for: ${documentType} ${searchResult.cod}  ${searchResult.name}: `, err)
        }).on('finish', () => {
          console.log(`Download process finished for: ${documentType} ${searchResult.cod}  ${searchResult.name}`)
        })
      })
    } else {
      return new Promise((resolve) => {
        http.get(pdfURL, (response) => {
          resolve(response.pipe(fileStream))
        }).on('error', (err) => {
          console.log(`Download failed for: ${documentType} ${searchResult.cod}  ${searchResult.name}: `, err)
        }).on('finish', () => {
          console.log(`Download process finished for: ${documentType} ${searchResult.cod}  ${searchResult.name}`)
        })
      })
    }
  } else {
    console.log(`Cannot download PDF for ${searchResult.name}: ${documentType} .pdf URL is not available`)
  }
}
