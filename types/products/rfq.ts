import { ProductItemType } from '@/types/products/product';

type RfqStatuses =
	| 'draft'
	| 'requested'
	| 'responded'
	| 'sampling'
	| 'purchase'
	| 'closed'
	| 'archived';

export interface RfqItem {
	id: number;
	subCategoryId: number;
	projectId: number;

	productName: string;
	quantity?: number;
	budget?: number;
	size?: string;
	certifications?: string;
	additionalComments?: string;

	status: RfqStatuses;
	images: string;
	documents: string;

	option: RfqOption[];

	updatedAt: string;
	createdAt: string;
}

type RfqOptionType = 'own' | 'external';
type RfqOptionStatus = 'new' | 'declined';

export interface RfqOption {
	id: number;

	size?: string;
	quantity?: number;
	unit?: string;
	price?: number;

	type: RfqOptionType;
	status: RfqOptionStatus;

	productId: number;
	product?: ProductItemType;

	rfqId: number;

	updatedAt: string;
	createdAt: string;
}
