import fs from 'fs'
/* import readlineSync from 'readline-sync' */

import { bullsPath, fispqsPath } from '../../../constants'
import { unlinkFile } from '../../services'

export const deleteCorruptedFiles = async (isTest: boolean | string) => {
  await readAndDeleteFiles(isTest, bullsPath)
  await readAndDeleteFiles(isTest, fispqsPath)
}

const readAndDeleteFiles = async (isTest: boolean | string, path: string) => {
  await fs.promises.readdir(path)
    .then(async (files) => {
      const itemToProcess = isTest ? 3 : files.length

      for (let i = 0; i < itemToProcess; i++) {
        const fileName = files[i]

        const stats = fs.statSync(`${path}/${fileName}`)
        const fileSizeInBytes = stats.size

        if (fileSizeInBytes < 1000) {
          console.error(`${fileName} has less than 1KB (${fileSizeInBytes}B) so its probably a corrupted file`)

          /* if (readlineSync.keyInYN('Do you want to delete it?: ')) { */
          await unlinkFile(path, fileName)
          /* } */
        }
      }
    })
    .catch((err) => {
      console.error(`Could not list ${path}: `, err)
    })
}
