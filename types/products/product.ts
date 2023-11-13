interface Image {
	id: number;
	key: string;
	bucket: string;
	url: string | null;
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

export interface Price {
	id: number;
	minCount: number;
	value: number;
	productId: number;
	updatedAt: string;
	createdAt: string;
}

interface Subcategory {
	id: number;
	name: string;
	platformCommission: number;
}

interface OptionDynamicAttribute {
	id: number;
	attributeId: number;
	charValue: string | null;
	numericValue: number | null;
}

export interface DynamicAttribute {
	attributeId: number;
	attributeDescription: string;
	label: string;
	order: number | null;
	value: string;
	formType: 'select' | 'input';
	type: 'char' | 'numeric';
	options: OptionDynamicAttribute[];
}

export type UpdateDynamicAttribute = DynamicAttribute & { attrValueIds: number[] };

export interface ProductItemType {
	id: number;
	name: string;
	sku: string;
	unitPrice: number;
	moq: number;
	warranty: number;
	favorite: boolean;
	countryOfOrigin: string;
	leadTime: number;
	views: number;
	favorites: number;
	projects: number;
	subCategory: Subcategory;
	prices: Price[];
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
	packageDimension: string | null;
	packageInclude: string | null;
	packageWeight: string;
	packaging: string | null;
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
