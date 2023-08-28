
interface Image {
	id: number;
	key: string;
	bucket: string;
	fileUrl: string;
	mime: string;
	productId: number;
	updatedAt: string;
	createdAt: string;
}

interface CutSheet {
	id: number;
	key: string;
	bucket: string;
	fileUrl: string;
	mime: string;
	productId: number;
	updatedAt: string;
	createdAt: string;
}

interface DynamicAttribute {
	attributeId: number;
	attributeDescription: string;
	label: string;
	order: number | null;
	value: string | number | null;
}

export interface ProductItemType {
	id: number;
	name: string;
	sku: string;
	unitPrice: number;
	moq: number;
	warranty: number;
	countryOfOrigin: string;
	leadTime: number;
	images: Image[];
	cutsheets: CutSheet[];
	dynamic_attr: DynamicAttribute[];
	containerQty20ft: string;
	containerQty40ft: string;
	createdAt: string;
	factoryUnitPriceContainerQty: number;
	factoryUnitPriceLargeQty: number;
	factoryUnitPriceMinQty: number;
	hsCode: string;
	largeQty: string;
	minOrder: number;
	packageDimension: string;
	packageInclude: string;
	packageWeight: string;
	packaging: string;
	platformCommissionRate: number;
	platformOnetimeDiscountedPrice: number;
	platformUnitPriceContainerQty: number;
	platformUnitPriceLargeQty: number;
	platformUnitPriceMinQty: number;
	productOverview: string;
	sellerCompanyId: number;
	sellersUrl: string;
	subCategoryId: number;
	unitOfMeasurement: string;
}


