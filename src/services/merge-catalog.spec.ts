import isEqual from 'lodash/isEqual'
import { MergeCatalog } from './merge-catalog'
import { CompanyDb } from '../db/company'
import { Csv } from '../utils/csv'
import { SourcedCatalogItem } from '../models/catalog'

describe('Merge tests', () => {
  const companyDb = CompanyDb.create('input')
  const mergeCatalog = MergeCatalog(companyDb)

  test('merged result matches reference data', async () => {
    const merged = await mergeCatalog('A', 'B')
    const reference = await Csv.read<SourcedCatalogItem>(__dirname + '/_fixtures/result_output.csv')

    expect(merged.length).toEqual(reference.length)

    merged.forEach(m => expect(m).toEqual(reference.find(r => isEqual(r, m))))
  })
})
