import path from 'path'
import { CompanyDb } from './db/company'
import { MergeCatalog } from './services/merge-catalog'
import { Csv } from './utils/csv'

const companyDb = CompanyDb.create('input')
const outputPath = path.resolve('output', 'result_output.csv')
const mergeCatalog = MergeCatalog(companyDb)

mergeCatalog('A', 'B').then(async merged => {
  console.log({ merged })
  await Csv.write(merged, outputPath)
  console.log(`\nOutput file written to: ${outputPath}\n`)
})
