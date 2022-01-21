import puppeteer from 'puppeteer'
import fs from 'fs'
import http from 'http'
import https from 'https'

import { DocumentType } from '../../models/DocumentType'
import { SearchResult } from '../../models/SearchResult'

const selectToWait = '.result__body'
const selectorResult = 'a[data-testid="result-title-a"]'

export const getUrlFromDuckDuckGoSearch = async (page: puppeteer.Page, productName: string, documentToSearch: DocumentType) => {
  const formatedName = productName.replace(' ', '+')
  const searchUrl = `https://duckduckgo.com/?q=${formatedName}+${documentToSearch}+pdf&kl=br-pt&k1=-1`

  await page.goto(searchUrl)
  await page.waitForSelector(selectToWait, { visible: true })

  const resultURL = await page.$$eval(selectorResult, (as: Element[]) => as.map(a => a.getAttribute('href')))

  return resultURL
}

export const generateSearchResultJSON = async (finalSearchResult: SearchResult[]) => {
  const finalDataResult = JSON.stringify({ finalSearchResult: finalSearchResult })

  fs.writeFile('searchResult.json', finalDataResult, (err: any) => {
    if (err) {
      console.log('Something went wrong during writing the JSON result file.', err)
    }
    console.log('JSON data is saved.')
  })
}

export const downloadPDF = async (searchResult: SearchResult, documentType: DocumentType) => {
  const path = documentType === DocumentType.BULA ? './data/bulas' : './data/fispqs'
  const fileName = documentType === DocumentType.BULA ? `${searchResult.cod}_1.pdf` : `${searchResult.cod}_2.pdf`

  const fileStream = fs.createWriteStream(`${path}/${fileName}`)

  const pdfURL = documentType === DocumentType.BULA ? searchResult.bulaSearchResult : searchResult.fispqSearchResult

  if (pdfURL && pdfURL.includes('.pdf')) {
    if (pdfURL.includes('https://')) {
      https.get(pdfURL, (response) => {
        response.pipe(fileStream)
      }).on('error', (err) => {
        console.log(`Download failed for: ${documentType} ${searchResult.cod}  ${searchResult.name}: `, err)
      }).on('finish', () => {
        console.log(`Download process finished for: ${documentType} ${searchResult.cod}  ${searchResult.name}`)
      })
    } else {
      http.get(pdfURL, (response) => {
        response.pipe(fileStream)
      }).on('error', (err) => {
        console.log(`Download failed for: ${documentType} ${searchResult.cod}  ${searchResult.name}: `, err)
      }).on('finish', () => {
        console.log(`Download process finished for: ${documentType} ${searchResult.cod}  ${searchResult.name}`)
      })
    }
  } else {
    console.log(`Cannot download PDF for ${searchResult.name}: ${documentType} .pdf URL is not available`)
  }
}
