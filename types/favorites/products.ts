interface ProductSubInfo {
    platformOnetimeDiscountedPrice?: null | number;
    sellersUrl?: string;
    packaging?: string;
    packageInclude?: string;
    packageDimension?: string;
    packageWeight?: string;
    status?: number;
    largeQty?: string;
    unitOfMeasurement?: string;
    sellerCompanyId?: number;
    subCategoryId?: number;
    updatedAt?: string;
    createdAt?: string;
}

type  ProductInfo = {
    id: number;
    name: string;
    sku: string;
    unitPrice: number;
    moq: number;
    warranty: number;
    productOverview: string;
    hsCode: string;
    countryOfOrigin: string;
    minOrder: number;
    leadTime: number;
    factoryUnitPriceMinQty: number;
    factoryUnitPriceLargeQty: number;
    factoryUnitPriceContainerQty: number;
    containerQty40ft: string;
    containerQty20ft: string;
    platformCommissionRate: number;
    platformUnitPriceMinQty: number;
    platformUnitPriceLargeQty: number;
    platformUnitPriceContainerQty: number;
    platformOnetimeDiscountedPrice: number | null;
    sellersUrl: string;
    packaging: string;
    packageInclude: string;
    packageDimension: string;
    packageWeight: string;
    status: number;
    largeQty: string;
    unitOfMeasurement: string;
    sellerCompanyId: number;
    subCategoryId: number;
    updatedAt: string;
    createdAt: string;
} & ProductSubInfo

export interface ResultItem {
    id: number;
    productId: number;
    userId: number;
    createdAt: string;
    product: ProductInfo;
}