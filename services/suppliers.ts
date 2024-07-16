import { SellerCompanyStatus } from '@/types/services/company';
import { CategoryItem } from '@/types/sideBar';
import { Address } from '@/types/services/orders';

export interface Supplier {
	id: number;
	supplierEmail: string;
	buyerCompanyId: number;
	sellerCompanyId: number;
	sellerCompany: SupplierSellerCompany;
	categories: CategoryItem[];
	updatedAt: string;
	createdAt: string;
}

export interface SupplierSellerCompany {
	name: string;
	companyAddress: Address | null;
	status: SellerCompanyStatus;
	users: SupplierUser[];
}

export interface SupplierUser {
	firstName: string | null;
	lastName: string | null;
	email: string;
	phone: string | null;
	emailVerified: boolean;
}
