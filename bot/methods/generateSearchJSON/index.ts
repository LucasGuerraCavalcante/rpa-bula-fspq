import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

import { Product } from '../../../models/Product'
import { SearchResult } from '../../../models/SearchResult'
import { DocumentType } from '../../../models/DocumentType'

import { generateSearchResultJSON, getUrlFromDuckDuckGoSearch } from '../../services'

export const generateSearchJSON = async (products: Product[]) => {
  console.log('Launching puppeteer... ')

  await puppeteer
    .use(StealthPlugin())
    .launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-infobars',
        '--window-position=0,0',
        '--ignore-certifcate-errors',
        '--ignore-certifcate-errors-spki-list'
      ],
      ignoreHTTPSErrors: true,
      headless: false
    })
    .then(async instance => {
      const browser = instance

      await browser.pages()
        .then(async pages => {
          const [page] = pages
          const searchResults: SearchResult[] = []

          for (let i = 0; i < 3/* products.length */; i++) {
            const productName = products[i].NOME_PROD

            if (productName) {
              console.log(`${i + 1} de ${products.length} - Searching for ${productName} `)

              const bulaUrl = await getUrlFromDuckDuckGoSearch(page, productName, DocumentType.BULA)
              const fispqUrl = await getUrlFromDuckDuckGoSearch(page, productName, DocumentType.FISPQ)

              const formatResult: SearchResult = {
                cod: products[i]?.COD_PROD,
                name: productName,
                bulaSearchResult: bulaUrl[0],
                fispqSearchResult: fispqUrl[0]
              }

              searchResults.push(formatResult)
            }
          }

          await generateSearchResultJSON(searchResults)
          await browser.close()
        })
        .catch(error => {
          console.log('Something went wrong during browser.pages: ', error)
        })
    })
    .catch(error => {
      console.log('Something went wrong during puppeteer.launch: ', error)
    })
}
