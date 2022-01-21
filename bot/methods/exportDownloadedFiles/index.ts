import fs from 'fs'
import archiver from 'archiver'

import { PDFsFolderPath } from '../../../constants'

export const exportDownloadedFiles = async () => {
  const archive = archiver.create('zip', {})
  const output = fs.createWriteStream('./data/pdfs.zip')

  archive.pipe(output)

  await archive
    .directory(PDFsFolderPath, '')
    .finalize()
    .then(() => {
      console.log('Files exported on ./data/pdfs.zip')
    }).catch((err) => {
      console.log('Something went wrong while creating the zip file', err)
    })
}
