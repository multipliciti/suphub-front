import { ImageType } from '@/types/products/image';
import { RfqFile } from '@/types/services/rfq';

export type plansFetchedStatus = 'loading' | 'success' | 'error';
export type SubscriptionType = 'none' | 'trial' | 'full';

export interface Subscription {
	id: number;
	type: SubscriptionType;
	trialCountProduct: null | number;
	stripeSubscriptionId: null | string;
	paid: boolean;
	sellerCompanyId: number;
	planId: number;
	createdAt: string;
	updatedAt: string;
}

export interface BuyerCompany {
	id: number;
	name: string;

	website?: string;
	EIN?: string;

	addressId?: number;
	address?: Address | null;

	logoId?: number;
	logo?: ImageType | null;

	updatedAt: string;
	createdAt: string;
}

export interface SellerCompany {
	id: number;
	name: string;
	abbreviation: string;
	website: string;
	status: SellerCompanyStatus;
	subscription: Subscription;
	statistics: SellerCompanyStatistics;

	countryProductsCertifiedFor?: string;
	productCertifications?: string;
	businessCertifications?: string[];
	factoryCertifications?: string[];

	planId?: number;

	companyAddressId?: number;
	companyAddress?: Address;

	factoryAddressId?: number;
	factoryAddress?: Address;

	logoId?: number;
	logo?: Logo;

	updatedAt: string;
	createdAt: string;
}

interface User {
	email: string;
	firstName: string;
	lastName: string;
}

export interface SellerPublicInfo {
	id: number;
	name: string;
	description: string | null;
	abbreviation: string;
	website: string;
	status: string;
	productCertifications: string;
	countryProductsCertifiedFor: string;
	businessCertifications: RfqFile[];
	factoryCertifications: RfqFile[];
	companyAddressId: number | null;
	factoryAddressId: number | null;
	logoId: number | null;
	updatedAt: string;
	createdAt: string;
	companyAddress: string | null;
	factoryAddress: string | null;
	users: User[];
	supplierId: number | null;
}

interface SellerCompanyStatistics {
	orders: SellerCompanyStatisticsItem;
	GMV: SellerCompanyStatisticsItem;
	RFQ: SellerCompanyStatisticsItem;
	feedbacks: {
		value: number | null;
		reviews: number;
	};
}

interface SellerCompanyStatisticsItem {
	value: number;
	progress: null;
}

export type SellerCompanyStatus =
	| 'notVerified'
	| 'businessVerified'
	| 'declined'
	| 'verified';

interface Logo {
	id: number;
	url: string;
	name: string;
}

interface Address {
	street: string;
	city: string;
	state: string;
	country: string;
	zipcode: string;
}

export interface RegisterBuyerCompany {
	name: string;
	website?: string;
	EIN?: string;
	userEmail: string;
	address: Address;
	confirmUrl: string;
}

export interface RegisterSellerCompany {
	name: string;
	abbreviation?: string;
	website?: string;
	productCertifications: string;
	businessCertifications?: string[];
	factoryCertifications?: string[];
	countryProductsCertifiedFor: string;
	userEmail: string;
	companyAddress: Address;
	factoryAddress: Address;
	confirmUrl: string;
}

export interface UpdateBuyerCompany {
	logoId?: number;
	addressId?: number;
	name?: string;
	website?: string;
	EIN?: string;
	address?: {
		street: string;
		city: string;
		state: string;
		country: string;
		zipcode: string;
	};
}

export interface UpdateSellerCompany {
	name?: string;
	abbreviation?: string;
	website?: string;
	productCertifications?: string;
	businessCertifications?: string[];
	factoryCertifications?: string[];
	countryProductsCertifiedFor?: string;
	companyAddress?: Address;
	factoryAddress?: Address;
}

export interface RemoveCertification {
	type?: 'business' | 'factory';
	fileIds?: number[];
}

export interface CompanyAdminAccountApplicationData {
	id: number;
	params: CompanyAdminAccountApplicationParams;
}

interface CompanyAdminAccountApplicationParams {
	url: string;
	adminId: string;
}
