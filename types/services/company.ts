export interface SellerCompany {
	id: number;
	name: string;
	abbreviation: string;
	website: string;
	status: SellerCompanyStatus;

	subscription?: string;
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
