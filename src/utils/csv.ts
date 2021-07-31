import fs from 'fs/promises'
import path from 'path'
import { parseFile, writeToPath } from 'fast-csv'

export namespace Csv {
  export const read = <T>(filename: string) => {
    return new Promise<T[]>((resolve, reject) => {
      const rows: T[] = []
      parseFile(path.resolve(filename), { headers: true })
        .on('error', error => reject(error))
        .on('data', row => rows.push(row))
        .on('end', () => resolve(rows))
    })
  }

  export const write = <T>(rows: T[], outputPath: string) => {
    return new Promise<void>(async (resolve, reject) => {
      await fs.mkdir(path.dirname(outputPath), { recursive: true })
      writeToPath(outputPath, rows, { headers: true })
        .on('error', error => reject(error))
        .on('finish', () => resolve())
    })
  }
}
