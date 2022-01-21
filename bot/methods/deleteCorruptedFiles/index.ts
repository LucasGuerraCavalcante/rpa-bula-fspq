import fs from 'fs'

import { PDFsFolderPath } from '../../../constants'

export const deleteCorruptedFiles = async (isTest: boolean | string) => {
  await fs.promises.readdir(PDFsFolderPath)
    .then(async (files) => {
      const itemToProcess = isTest ? 6 : files.length

      for (let i = 0; i < itemToProcess; i++) {
        const file = files[i]

        const stats = fs.statSync(`${PDFsFolderPath}/${file}`)
        const fileSizeInBytes = stats.size

        if (fileSizeInBytes < 100000) {
          console.error(`${file} has less than 1MB (${fileSizeInBytes}B) so its probably a corrupted file`)

          await fs.promises.unlink(`${PDFsFolderPath}/${file}`)
            .then(() => {
              console.error(`${file} was deleted`)
            })
            .catch((err) => {
              console.log(`Something went wrong while deleting ${file}`, err)
            })
        }
      }
    })
    .catch((err) => {
      console.error(`Could not list ${PDFsFolderPath}: `, err)
    })
}
