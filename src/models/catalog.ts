export type CatalogItem = {
  SKU: string
  Description: string
}

export type SourcedCatalogItem = CatalogItem & { Source: string }
