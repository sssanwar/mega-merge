import fs from 'fs/promises'
import { CatalogItem } from '../models/catalog'
import { Csv } from './csv'

describe('CSV utils tests', () => {
  it('can read and write CSV file', async () => {
    // clean up
    const outputPath = 'output/catalogA-test.csv'
    await fs.rm(outputPath, { force: true })

    // read
    const catalogA = await Csv.read<CatalogItem>('input/catalogA.csv')
    expect(catalogA.length).toBe(5)
    expect(catalogA[catalogA.length - 1].Description).toBe('Carbonated Water - Lemon Lime')

    // write
    await fs.mkdir('output', { recursive: true })
    await Csv.write(catalogA, outputPath)

    // check output
    const output = await Csv.read<CatalogItem>(outputPath)
    expect(output.length).toBe(5)
    expect(output[output.length - 1].Description).toBe('Carbonated Water - Lemon Lime')
  })
})
