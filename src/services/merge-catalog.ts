import { intersection } from 'lodash'
import { CompanyDb } from '../db/company'
import { SourcedCatalogItem } from '../models/catalog'
import { Company } from '../models/company'

const toSourcedCatalogItem = (productKey: string, company: Company): SourcedCatalogItem => {
  const SKU = company.products[productKey].SKU
  const Description = company.catalog.find(c => c.SKU === SKU)?.Description || '[Not Found]'
  return { SKU, Description, Source: company.name }
}

const merge = (companyA: Company, companyB: Company): SourcedCatalogItem[] => {
  const merged: SourcedCatalogItem[] = []

  // add catalog from company A first
  Object.keys(companyA.products).forEach(pkA => merged.push(toSourcedCatalogItem(pkA, companyA)))

  // add catalog from company B that has barcodes intersecting with barcodes from company A
  for (const pkB of Object.keys(companyB.products)) {
    let hasIntersection = false

    for (const pkA of Object.keys(companyA.products)) {
      const intersected = intersection(companyA.products[pkA].Barcodes, companyB.products[pkB].Barcodes)
      if (intersected.length) {
        hasIntersection = true
        break
      }
    }

    if (!hasIntersection) merged.push(toSourcedCatalogItem(pkB, companyB))
  }

  return merged
}

export const MergeCatalog = (companyDb: CompanyDb) => {
  return async (companyNameA: string, companyNameB: string) => {
    const [companyA, companyB] = await Promise.all([companyNameA, companyNameB].map(n => companyDb.load(n)))
    return merge(companyA, companyB)
  }
}
