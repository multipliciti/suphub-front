import { Supplier } from '@/services/suppliers';

export const columns: { title: string; key: string }[] = [
	{ title: 'Contact Name', key: 'contactName' },
	{ title: 'Company', key: 'company' },
	{ title: 'Phone Number', key: 'phoneNumber' },
	{ title: 'Email', key: 'email' },
	{ title: 'Country', key: 'country' },
	{ title: 'Category', key: 'category' },
];

export const getSupplierUser = (supplier: Supplier) => {
	return supplier.sellerCompany.users.find(
		(user) => user.email === supplier.supplierEmail
	);
};

export const getContactName = (supplier: Supplier) => {
	if (supplier.sellerCompany.users.length > -1) {
		const user = getSupplierUser(supplier);

		if (!user) return supplier.supplierEmail;

		return user.firstName === null && user.lastName === null
			? supplier.supplierEmail
			: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
	}
	return supplier.supplierEmail;
};

export const getCompanyName = (supplier: Supplier | null) => {
	return supplier?.sellerCompany?.name || '-';
};

export const getPhoneNumber = (supplier: Supplier) => {
	const user = getSupplierUser(supplier);
	return user?.phone || '-';
};

export const getCountry = (supplier: Supplier) => {
	return supplier?.sellerCompany?.companyAddress?.country || '-';
};

export const getCategory = (supplier: Supplier) => {
	return supplier?.categories?.[0]?.name || '-';
};
