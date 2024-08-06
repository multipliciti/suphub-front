import { ImageType } from '@/types/products/image';
import { ProductItemStatus } from '@/types/products/productStatus';
import { RfqFile } from '@/types/services/rfq';

export interface ProductFile {
	id: number;
	name: string;
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

export interface Subcategory {
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

export interface Sample {
	id: number;
	name: string;
	price: number;
	quantity: number;
	images: {
		id: number;
		url: string;
		name: string;
	}[];

	description: string;
	productId: number;
	updatedAt: string;
	createdAt: string;
}

export interface SampleProps extends Pick<Sample, 'id' | 'quantity' | 'price'> {}

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
	samples: Sample[];
	status: ProductItemStatus;
	subCategory: Subcategory;
	prices: Price[];
	images: ImageType[];
	cutsheets: RfqFile[];
	manuals: RfqFile[];
	certifications: RfqFile[];
	dynamic_attr: DynamicAttribute[];
	seller: {
		id: number;
		name: string;
	};
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
