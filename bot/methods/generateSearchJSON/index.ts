import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

import userAgent from 'user-agents'
import fs from 'fs'

import { Product } from '../../../models/Product'
import { SearchResult } from '../../../models/SearchResult'

export const generateSearchJSON = async (products: Product[]) => {
  console.log('Launching puppeteer... ')

  puppeteer
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
          const finalSearchResult: SearchResult[] = []

          for (let i = 0; i < products.length; i++) {
            const nameProduct = products[i].NOME_PROD

            if (nameProduct) {
              const formatedName = nameProduct.replace(' ', '+')

              await page.setUserAgent(userAgent.toString())

              console.log(`${i + 1} de ${products.length} - Searching for ${nameProduct} `)

              await page.goto(`https://duckduckgo.com/?q=${formatedName}+bula+pdf&kl=br-pt&k1=-1`)
              await page.waitForSelector('.result__body', { visible: true })
              const bulaUrl = await page.$$eval('a[data-testid="result-title-a"]', as => as.map(a => a.getAttribute('href')))

              await page.goto(`https://duckduckgo.com/?q=${formatedName}+fispq+pdf&kl=br-pt&k1=-1`)
              await page.waitForSelector('.result__body', { visible: true })
              const fispqUrl = await page.$$eval('a[data-testid="result-title-a"]', as => as.map(a => a.getAttribute('href')))

              const formatResult: SearchResult = {
                cod: products[i]?.COD_PROD,
                name: nameProduct,
                bulaSearchResult: bulaUrl[0],
                fispqSearchResult: fispqUrl[0]
              }

              finalSearchResult.push(formatResult)
            }
          }

          const finalDataResult = JSON.stringify({ finalSearchResult: finalSearchResult })

          fs.writeFile('finalSearchResult.json', finalDataResult, (err: any) => {
            if (err) {
              throw err
            }
            console.log('JSON data is saved.')
          })

          browser.close()
        })
        .catch(error => {
          console.log('Something went wrong during browser.pages: ', error)
        })
    })
    .catch(error => {
      console.log('Something went wrong during puppeteer.launch: ', error)
    })
}
