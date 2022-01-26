import fs from 'fs'
import archiver from 'archiver'

import { exportFile } from '../../services'
import { bullsPath, fispqsPath } from '../../../constants'

const fileExtension = 'zip'

export const exportDownloadedFiles = async () => {
  await writeAndExportFiles(bullsPath)
  await writeAndExportFiles(fispqsPath)
}

const writeAndExportFiles = async (path: string) => {
  const archive = archiver.create(fileExtension, {})
  const output = fs.createWriteStream(`${path}.${fileExtension}`)

  await exportFile(path, archive, output, fileExtension)
}
