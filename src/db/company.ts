import { Barcode } from '../models/barcode'
import { CatalogItem } from '../models/catalog'
import { Company } from '../models/company'
import { toProducts } from '../models/product'
import { Supplier } from '../models/supplier'
import { Csv } from '../utils/csv'

export type CompanyDb = { load: (companyName: string) => Promise<Company> }

export namespace CompanyDb {
  export const create = (inputDir: string): CompanyDb => {
    const load = async (companyName: string): Promise<Company> => {
      const [barcodes, catalog, suppliers] = await Promise.all([
        Csv.read<Barcode>(`${inputDir}/barcodes${companyName}.csv`),
        Csv.read<CatalogItem>(`${inputDir}/catalog${companyName}.csv`),
        Csv.read<Supplier>(`${inputDir}/suppliers${companyName}.csv`)
      ])

      return { name: companyName, products: toProducts(barcodes), catalog, suppliers }
    }

    return { load }
  }
}
