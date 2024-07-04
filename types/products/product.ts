import { ImageType } from '@/types/products/image';
import { ProductItemStatus } from '@/types/products/productStatus';

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
	cutsheets: ProductFile[];
	manuals: ProductFile[];
	certifications: ProductFile[];
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

export const dummyProductItems = [
	{
		id: 315,
		name: 'Horizontal Sliding Window',
		sku: null,
		warranty: 2,
		countryOfOrigin: '',
		leadTime: 4,
		status: 'published',
		unitOfMeasurement: 'Sq.ft',
		views: 13,
		favorites: 0,
		projects: 3,
		cutsheets: [],
		certifications: [],
		manuals: [],
		seller: {
			name: 'Suphub Seller Demo',
		},
		subCategory: {
			id: 1,
			name: 'Windows',
			platformCommission: 0.15,
		},
		prices: [
			{
				id: 151,
				minCount: 1000,
				value: 95,
				productId: 315,
				updatedAt: '2024-03-04T18:10:37.984Z',
				createdAt: '2024-01-02T17:49:11.684Z',
			},
			{
				id: 180,
				minCount: 2000,
				value: 85,
				productId: 315,
				updatedAt: '2024-03-04T18:10:44.129Z',
				createdAt: '2024-03-04T18:10:18.491Z',
			},
		],
		images: [
			{
				id: 180,
				name: 'Screenshot 2023-10-01 at 5.55.35 PM.png',
				key: 'products/315/43d87602-5a5f-4116-ac37-d5686c17d082.png',
				bucket: 'suphub-dev',
				url: 'https://suphub-dev.s3.amazonaws.com/products/315/43d87602-5a5f-4116-ac37-d5686c17d082.png',
				mime: 'image/png',
				updatedAt: '2024-03-04T18:10:06.582Z',
				createdAt: '2024-03-04T18:10:06.582Z',
			},
		],
		favorite: false,
		dynamic_attr: [
			{
				attributeId: 10,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Certification',
				order: 1,
				value: 'AAMA',
			},
			{
				attributeId: 1,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Frame Material',
				order: 2,
				value: 'Vinyl',
			},
			{
				attributeId: 2,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Opening Style',
				order: 3,
				value: 'Fixed',
			},
			{
				attributeId: 3,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Glazing Type',
				order: 4,
				value: 'Triple Pane',
			},
			{
				attributeId: 4,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Glass Type',
				order: 5,
				value: 'Obscured Glass',
			},
			{
				attributeId: 6,
				attributeDescription: '',
				type: 'numeric',
				formType: 'input',
				label: 'SHGC',
				order: null,
				value: '0.28',
			},
			{
				attributeId: 5,
				attributeDescription: 'BTU/h∙ft∙°F',
				type: 'numeric',
				formType: 'input',
				label: 'U-Factor',
				order: null,
				value: '0.23',
			},
			{
				attributeId: 8,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Accessories',
				order: null,
				value: 'Couplers',
			},
			{
				attributeId: 11,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Screens',
				order: null,
				value: 'No Screen',
			},
		],
	},
	{
		id: 334,
		name: 'Test product',
		sku: null,
		warranty: 10,
		countryOfOrigin: 'China',
		leadTime: null,
		status: 'published',
		unitOfMeasurement: 'unit',
		views: 56,
		favorites: 0,
		projects: 8,
		cutsheets: [],
		certifications: [],
		manuals: [],
		seller: {
			name: 'Softliker',
		},
		subCategory: {
			id: 1,
			name: 'Windows',
			platformCommission: 0.15,
		},
		prices: [
			{
				id: 173,
				minCount: 1,
				value: 12,
				productId: 334,
				updatedAt: '2024-01-17T14:27:14.127Z',
				createdAt: '2024-01-17T14:27:02.696Z',
			},
		],
		images: [
			{
				id: 172,
				name: 'ÐÐ½ÑÐ¼Ð¾Ðº ÐµÐºÑÐ°Ð½Ð° 2024-01-14 202457.png',
				key: 'products/334/15cb6452-0969-44eb-8cde-dbe6d63d4fc3.png',
				bucket: 'suphub-dev',
				url: 'https://suphub-dev.s3.amazonaws.com/products/334/15cb6452-0969-44eb-8cde-dbe6d63d4fc3.png',
				mime: 'image/png',
				updatedAt: '2024-01-23T12:12:40.459Z',
				createdAt: '2024-01-23T12:12:40.459Z',
			},
		],
		favorite: false,
		dynamic_attr: [
			{
				attributeId: 10,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Certification',
				order: 1,
				value: 'AAMA',
			},
			{
				attributeId: 1,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Frame Material',
				order: 2,
				value: 'Vinyl',
			},
			{
				attributeId: 2,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Opening Style',
				order: 3,
				value: '',
			},
			{
				attributeId: 3,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Glazing Type',
				order: 4,
				value: 'Double Pane',
			},
			{
				attributeId: 4,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Glass Type',
				order: 5,
				value: '',
			},
			{
				attributeId: 6,
				attributeDescription: '',
				type: 'numeric',
				formType: 'input',
				label: 'SHGC',
				order: null,
				value: '',
			},
			{
				attributeId: 5,
				attributeDescription: 'BTU/h∙ft∙°F',
				type: 'numeric',
				formType: 'input',
				label: 'U-Factor',
				order: null,
				value: '',
			},
			{
				attributeId: 8,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Accessories',
				order: null,
				value: 'Couplers',
			},
			{
				attributeId: 11,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Screens',
				order: null,
				value: '',
			},
		],
	},
	{
		id: 323,
		name: 'Product 1 name BULK',
		sku: null,
		warranty: 5,
		countryOfOrigin: 'China',
		leadTime: null,
		status: 'published',
		unitOfMeasurement: null,
		views: 25,
		favorites: 0,
		projects: 6,
		cutsheets: [],
		certifications: [],
		manuals: [],
		seller: {
			name: 'sellerBULK2 company',
		},
		subCategory: {
			id: 1,
			name: 'Windows',
			platformCommission: 0.15,
		},
		prices: [
			{
				id: 159,
				minCount: 10,
				value: 100,
				productId: 323,
				updatedAt: '2024-01-04T15:13:29.533Z',
				createdAt: '2024-01-04T14:11:42.550Z',
			},
		],
		images: [
			{
				id: 163,
				name: '0ebd262c4b7f69f7ec915dbd8509328f.jpg',
				key: 'products/323/7f33e457-f47c-416e-9838-ff9c2d16bc0b.jpg',
				bucket: 'suphub-dev',
				url: 'https://suphub-dev.s3.amazonaws.com/products/323/7f33e457-f47c-416e-9838-ff9c2d16bc0b.jpg',
				mime: 'image/jpeg',
				updatedAt: '2024-01-04T15:13:23.550Z',
				createdAt: '2024-01-04T15:13:23.550Z',
			},
		],
		favorite: false,
		dynamic_attr: [
			{
				attributeId: 10,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Certification',
				order: 1,
				value: '',
			},
			{
				attributeId: 1,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Frame Material',
				order: 2,
				value: 'Vinyl',
			},
			{
				attributeId: 2,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Opening Style',
				order: 3,
				value: 'Fixed',
			},
			{
				attributeId: 3,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Glazing Type',
				order: 4,
				value: 'Single Pane',
			},
			{
				attributeId: 4,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Glass Type',
				order: 5,
				value: 'Float Glass',
			},
			{
				attributeId: 6,
				attributeDescription: '',
				type: 'numeric',
				formType: 'input',
				label: 'SHGC',
				order: null,
				value: '16',
			},
			{
				attributeId: 5,
				attributeDescription: 'BTU/h∙ft∙°F',
				type: 'numeric',
				formType: 'input',
				label: 'U-Factor',
				order: null,
				value: '0.35',
			},
			{
				attributeId: 8,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Accessories',
				order: null,
				value: 'Couplers',
			},
			{
				attributeId: 11,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Screens',
				order: null,
				value: 'Fiberglass Screen',
			},
		],
	},
	{
		id: 284,
		name: 'test cart',
		sku: null,
		warranty: null,
		countryOfOrigin: null,
		leadTime: null,
		status: 'published',
		unitOfMeasurement: null,
		views: 7,
		favorites: 0,
		projects: 2,
		cutsheets: [],
		certifications: [],
		manuals: [],
		seller: {
			name: 'SL test',
		},
		subCategory: {
			id: 1,
			name: 'Windows',
			platformCommission: 0.15,
		},
		prices: [
			{
				id: 113,
				minCount: 0,
				value: 0,
				productId: 284,
				updatedAt: '2023-12-15T12:42:25.245Z',
				createdAt: '2023-12-15T12:42:25.245Z',
			},
		],
		images: [
			{
				id: 161,
				name: '1651876161_1-pibig-info-p-oboi-na-rabochii-stol-estetika-krasivo-1.jpeg',
				key: 'products/284/b402af39-9113-447c-b7ac-daf4ba5a8f7b.jpeg',
				bucket: 'suphub-dev',
				url: 'https://suphub-dev.s3.amazonaws.com/products/284/b402af39-9113-447c-b7ac-daf4ba5a8f7b.jpeg',
				mime: 'image/jpeg',
				updatedAt: '2024-01-04T09:43:56.564Z',
				createdAt: '2024-01-04T09:43:56.564Z',
			},
		],
		favorite: false,
		dynamic_attr: [
			{
				attributeId: 10,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Certification',
				order: 1,
				value: '',
			},
			{
				attributeId: 1,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Frame Material',
				order: 2,
				value: '',
			},
			{
				attributeId: 2,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Opening Style',
				order: 3,
				value: '',
			},
			{
				attributeId: 3,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Glazing Type',
				order: 4,
				value: '',
			},
			{
				attributeId: 4,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Glass Type',
				order: 5,
				value: '',
			},
			{
				attributeId: 6,
				attributeDescription: '',
				type: 'numeric',
				formType: 'input',
				label: 'SHGC',
				order: null,
				value: '',
			},
			{
				attributeId: 5,
				attributeDescription: 'BTU/h∙ft∙°F',
				type: 'numeric',
				formType: 'input',
				label: 'U-Factor',
				order: null,
				value: '',
			},
			{
				attributeId: 8,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Accessories',
				order: null,
				value: '',
			},
			{
				attributeId: 11,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Screens',
				order: null,
				value: '',
			},
		],
	},
	{
		id: 283,
		name: 'Product 1 name',
		sku: null,
		warranty: null,
		countryOfOrigin: 'China',
		leadTime: null,
		status: 'published',
		unitOfMeasurement: null,
		views: 29,
		favorites: 1,
		projects: 2,
		cutsheets: [
			{
				key: 'products/283/cutsheets/40bea8bb-5a81-4ef2-8371-76f45dfdf993.pdf',
				url: 'https://suphub-dev.s3.amazonaws.com/products/283/cutsheets/40bea8bb-5a81-4ef2-8371-76f45dfdf993.pdf',
				mime: 'application/pdf',
				name: 'Online Gantt 20240206.pdf',
				bucket: 'suphub-dev',
			},
		],
		certifications: [],
		manuals: [
			{
				key: 'products/283/manuals/3e284270-63bc-4a72-883f-991b685e88a7.png',
				url: 'https://suphub-dev.s3.amazonaws.com/products/283/manuals/3e284270-63bc-4a72-883f-991b685e88a7.png',
				mime: 'image/png',
				name: 'dont set id.png',
				bucket: 'suphub-dev',
			},
		],
		seller: {
			name: 'SL test',
		},
		subCategory: {
			id: 1,
			name: 'Windows',
			platformCommission: 0.15,
		},
		prices: [
			{
				id: 112,
				minCount: 1,
				value: 125,
				productId: 283,
				updatedAt: '2023-12-15T12:42:59.898Z',
				createdAt: '2023-12-15T12:42:25.226Z',
			},
		],
		images: [
			{
				id: 149,
				name: 'wp8302910-1920x600-aesthetic-wallpapers.jpg',
				key: 'products/283/c8d90803-2f97-4530-9c64-05ac2bca14de.jpg',
				bucket: 'suphub-dev',
				url: 'https://suphub-dev.s3.amazonaws.com/products/283/c8d90803-2f97-4530-9c64-05ac2bca14de.jpg',
				mime: 'image/jpeg',
				updatedAt: '2023-12-15T12:42:51.292Z',
				createdAt: '2023-12-15T12:42:51.292Z',
			},
			{
				id: 156,
				name: '1651876161_1-pibig-info-p-oboi-na-rabochii-stol-estetika-krasivo-1.jpeg',
				key: 'products/283/d5fc0486-547d-4d48-a907-edd18dec4727.jpeg',
				bucket: 'suphub-dev',
				url: 'https://suphub-dev.s3.amazonaws.com/products/283/d5fc0486-547d-4d48-a907-edd18dec4727.jpeg',
				mime: 'image/jpeg',
				updatedAt: '2023-12-28T14:05:36.735Z',
				createdAt: '2023-12-28T14:05:36.735Z',
			},
		],
		favorite: false,
		dynamic_attr: [
			{
				attributeId: 10,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Certification',
				order: 1,
				value: 'AAMA',
			},
			{
				attributeId: 1,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Frame Material',
				order: 2,
				value: 'Wood',
			},
			{
				attributeId: 2,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Opening Style',
				order: 3,
				value: 'Casement',
			},
			{
				attributeId: 3,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Glazing Type',
				order: 4,
				value: '',
			},
			{
				attributeId: 4,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Glass Type',
				order: 5,
				value: 'Obscured Glass',
			},
			{
				attributeId: 6,
				attributeDescription: '',
				type: 'numeric',
				formType: 'input',
				label: 'SHGC',
				order: null,
				value: '1',
			},
			{
				attributeId: 5,
				attributeDescription: 'BTU/h∙ft∙°F',
				type: 'numeric',
				formType: 'input',
				label: 'U-Factor',
				order: null,
				value: '',
			},
			{
				attributeId: 8,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Accessories',
				order: null,
				value: '',
			},
			{
				attributeId: 11,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Screens',
				order: null,
				value: '',
			},
		],
	},
	{
		id: 279,
		name: 'New product name ',
		sku: null,
		warranty: 0,
		countryOfOrigin: '',
		leadTime: 0,
		status: 'published',
		unitOfMeasurement: null,
		views: 2,
		favorites: 2,
		projects: 3,
		cutsheets: [],
		certifications: [],
		manuals: [],
		seller: {
			name: 'sellerRFQ Company name',
		},
		subCategory: {
			id: 1,
			name: 'Windows',
			platformCommission: 0.15,
		},
		prices: [
			{
				id: 103,
				minCount: 5,
				value: 15,
				productId: 279,
				updatedAt: '2023-12-13T12:51:29.966Z',
				createdAt: '2023-12-13T08:30:31.254Z',
			},
			{
				id: 104,
				minCount: 10,
				value: 10,
				productId: 279,
				updatedAt: '2023-12-13T12:51:46.401Z',
				createdAt: '2023-12-13T08:30:42.459Z',
			},
		],
		images: [
			{
				id: 142,
				name: 'Ð¿ÐµÑÑÐ¾Ñ-Ð·-ÑÐ±Ð»ÑÐ½Ð¸ÑÑ.jpeg',
				key: 'products/279/e28020d2-9327-4a92-afd1-f27f493c80b2.jpeg',
				bucket: 'suphub-dev',
				url: 'https://suphub-dev.s3.amazonaws.com/products/279/e28020d2-9327-4a92-afd1-f27f493c80b2.jpeg',
				mime: 'image/jpeg',
				updatedAt: '2023-12-12T14:42:58.538Z',
				createdAt: '2023-12-12T14:42:58.538Z',
			},
			{
				id: 146,
				name: 'testpng.png',
				key: 'products/279/a51cec69-2d58-4de7-8ac7-612cc390a1df.png',
				bucket: 'suphub-dev',
				url: 'https://suphub-dev.s3.amazonaws.com/products/279/a51cec69-2d58-4de7-8ac7-612cc390a1df.png',
				mime: 'image/png',
				updatedAt: '2023-12-13T12:57:49.265Z',
				createdAt: '2023-12-13T12:57:49.265Z',
			},
		],
		favorite: false,
		dynamic_attr: [
			{
				attributeId: 10,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Certification',
				order: 1,
				value: '',
			},
			{
				attributeId: 1,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Frame Material',
				order: 2,
				value: '',
			},
			{
				attributeId: 2,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Opening Style',
				order: 3,
				value: '',
			},
			{
				attributeId: 3,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Glazing Type',
				order: 4,
				value: '',
			},
			{
				attributeId: 4,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Glass Type',
				order: 5,
				value: '',
			},
			{
				attributeId: 6,
				attributeDescription: '',
				type: 'numeric',
				formType: 'input',
				label: 'SHGC',
				order: null,
				value: '',
			},
			{
				attributeId: 5,
				attributeDescription: 'BTU/h∙ft∙°F',
				type: 'numeric',
				formType: 'input',
				label: 'U-Factor',
				order: null,
				value: '',
			},
			{
				attributeId: 8,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Accessories',
				order: null,
				value: '',
			},
			{
				attributeId: 11,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Screens',
				order: null,
				value: '',
			},
		],
	},
	{
		id: 262,
		name: 'Window',
		sku: null,
		warranty: 5,
		countryOfOrigin: 'China',
		leadTime: 7,
		status: 'published',
		unitOfMeasurement: 'Sq.ft',
		views: 31,
		favorites: 0,
		projects: 2,
		cutsheets: [],
		certifications: [],
		manuals: [],
		seller: {
			name: 'Suphub Seller Demo',
		},
		subCategory: {
			id: 1,
			name: 'Windows',
			platformCommission: 0.15,
		},
		prices: [
			{
				id: 90,
				minCount: 10,
				value: 100,
				productId: 262,
				updatedAt: '2023-12-08T00:14:06.028Z',
				createdAt: '2023-11-27T11:38:58.260Z',
			},
			{
				id: 125,
				minCount: 50,
				value: 80,
				productId: 262,
				updatedAt: '2023-12-21T00:17:04.210Z',
				createdAt: '2023-12-21T00:16:53.339Z',
			},
			{
				id: 172,
				minCount: 100,
				value: 60,
				productId: 262,
				updatedAt: '2024-01-12T19:23:48.017Z',
				createdAt: '2024-01-12T19:23:43.900Z',
			},
		],
		images: [
			{
				id: 178,
				name: '140 series 05.png',
				key: 'products/262/fff52fd2-0cb3-4b99-b9c0-39cbce076fe7.png',
				bucket: 'suphub-dev',
				url: 'https://suphub-dev.s3.amazonaws.com/products/262/fff52fd2-0cb3-4b99-b9c0-39cbce076fe7.png',
				mime: 'image/png',
				updatedAt: '2024-03-04T18:04:39.459Z',
				createdAt: '2024-03-04T18:04:39.459Z',
			},
		],
		favorite: false,
		dynamic_attr: [
			{
				attributeId: 10,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Certification',
				order: 1,
				value: 'Title 24 Compliant, AAMA, NFRC',
			},
			{
				attributeId: 1,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Frame Material',
				order: 2,
				value: 'Vinyl',
			},
			{
				attributeId: 2,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Opening Style',
				order: 3,
				value: 'Horizontal Sliding',
			},
			{
				attributeId: 3,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Glazing Type',
				order: 4,
				value: 'Double Pane',
			},
			{
				attributeId: 4,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Glass Type',
				order: 5,
				value: 'Tempered Glass, Low-E Glass',
			},
			{
				attributeId: 6,
				attributeDescription: '',
				type: 'numeric',
				formType: 'input',
				label: 'SHGC',
				order: null,
				value: '0.23',
			},
			{
				attributeId: 5,
				attributeDescription: 'BTU/h∙ft∙°F',
				type: 'numeric',
				formType: 'input',
				label: 'U-Factor',
				order: null,
				value: '0.27',
			},
			{
				attributeId: 8,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Accessories',
				order: null,
				value: 'Nailing Fin, Brick Molds',
			},
			{
				attributeId: 11,
				attributeDescription: '',
				type: 'char',
				formType: 'select',
				label: 'Screens',
				order: null,
				value: 'Fiberglass Screen',
			},
		],
	},
];
