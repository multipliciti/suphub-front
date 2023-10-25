export interface InternationalBankDetails {
	swiftCode: string;
	businessName: string;
	accountNumber: string;
	beneficiaryCountry: string;
	addressLine1: string;
	addressLine2: string;
}

export interface DomesticBankDetails {
	vendorType: 'business' | 'individual';
	businessName: string;
	routingNumber: string;
	accountNumber: string;
}
