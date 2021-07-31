import { Barcode } from './barcode'

export type Product = {
  SupplierID: string
  SKU: string
  Barcodes: string[]
}

export type Products = {
  [key: string]: Product
}

export const toProductKey = (barcode: Barcode): string => `${barcode.SKU}`

/**
 * Group barcodes to products by product key
 * @param barcodes
 * @returns Products with barcodes grouped by product key
 */
export const toProducts = (barcodes: Barcode[]): Products => {
  const products: Products = {}
  barcodes.forEach(b => {
    const key = toProductKey(b)
    const product = products[key]

    if (!product) products[key] = { SupplierID: b.SupplierID, SKU: b.SKU, Barcodes: [b.Barcode] }
    else product.Barcodes.push(b.Barcode)
  })

  return products
}
