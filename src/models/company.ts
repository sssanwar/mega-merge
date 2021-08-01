import { CatalogItem } from './catalog'
import { Products } from './product'
import { Supplier } from './supplier'

export type Company = {
  name: string
  products: Products
  catalog: CatalogItem[]
  suppliers: Supplier[]
}

export type CompanyDataSource = {
  load: (companyName: string) => Promise<Company>
}
