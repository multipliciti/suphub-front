export interface Supplier {
	id: number;
	contactName: string;
	company: string;
	phoneNumber: string;
	email: string;
	country: string;
	category: string;
}

export const temporaryDataSuppliers: Supplier[] = [
	{
		id: 1,
		contactName: 'Jane Cooper',
		company: 'Microsoft',
		phoneNumber: '(225) 555-0118',
		email: 'jane@microsoft.com',
		country: 'United States',
		category: 'Doors & Window',
	},
	{
		id: 2,
		contactName: 'Floyd Miles',
		company: 'Yahoo',
		phoneNumber: '(225) 555-0100',
		email: 'floyd@yahoo.com',
		country: 'Canada',
		category: 'Doors & Window',
	},
	{
		id: 3,
		contactName: 'Ronald Richards',
		company: 'Adobe',
		phoneNumber: '(225) 555-0107',
		email: 'ronald@adobe.com',
		country: 'Israel',
		category: 'HVAC',
	},
	{
		id: 4,
		contactName: 'Marvin McKinney',
		company: 'Tesla',
		phoneNumber: '(225) 555-0118',
		email: 'marvin@tesla.com',
		country: 'Iran',
		category: 'Interior Finishes',
	},
	{
		id: 5,
		contactName: 'Jerome Bell',
		company: 'Google',
		phoneNumber: '(225) 555-0238',
		email: 'jerome@google.com',
		country: 'France',
		category: 'Doors & Window',
	},
];
