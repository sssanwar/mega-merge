import { toProducts } from './product'

describe('Product model tests', () => {
  const barcodes = [
    { SupplierID: 's01', SKU: 'sku01', Barcode: '001' },
    { SupplierID: 's01', SKU: 'sku01', Barcode: '002' },
    { SupplierID: 's02', SKU: 'sku02', Barcode: '003' }
  ]

  it('converts barcodes to product map', async () => {
    const productMap = toProducts(barcodes)
    expect(productMap['sku01'].Barcodes.length).toBe(2)
    expect(productMap['sku02'].Barcodes.length).toBe(1)

    expect(productMap['sku01'].Barcodes[1]).toBe('002')
    expect(productMap['sku02'].Barcodes[0]).toBe('003')
  })
})
