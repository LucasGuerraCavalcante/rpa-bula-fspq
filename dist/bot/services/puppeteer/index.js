"use strict";
/* import puppeteer from 'puppeteer' */
/* export const launchPuppeteer = async () => {
  return await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ],
    ignoreHTTPSErrors: true,
    headless: true
  })
} */
/* export const closeBrowser = async (browser: puppeteer.Browser) => {
  await browser.close()
} */
/* export const searchOnGoogle = async (browser: puppeteer.Browser, searchQuery: string) => {
  const [page] = await browser.pages()
    .catch(error => {
      console.log('Something went wrong during browser.pages: ', error)
    })

  await page.goto('https://www.google.com/')
  await page.waitForSelector('input[aria-label="Search"]', { visible: true })

  await page.type('input[aria-label="Search"]', searchQuery)
  await Promise.all([
    page.waitForNavigation(),
    page.keyboard.press('Enter')
  ])
  await page.waitForSelector('.LC20lb', { visible: true })
} */
