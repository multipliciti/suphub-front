interface Button {
	id: number;
	label: string;
	href: string;
}

const baseButtons: Button[] = [
	{
		id: 1,
		label: 'Marketplace',
		href: '/marketplace',
	},
];

export const regularUser: Button[] = [...baseButtons];

export const buttonsSeller: Button[] = [
	{
		id: 1,
		label: 'My Storefront',
		href: '/storefront/get-started',
	},
	{
		id: 2,
		label: 'My Suppliers',
		href: '/suppliers',
	},
	{
		id: 3,
		label: 'Marketplace',
		href: '/marketplace',
	},
];

export const buttonsBuyer: Button[] = [
	{
		id: 1,
		label: 'My Projects',
		href: '/projects',
	},
	{
		id: 2,
		label: 'My Suppliers',
		href: '/suppliers',
	},
	{
		id: 3,
		label: 'Marketplace',
		href: '/marketplace',
	},
];

export const logOutUser: Button[] = [...baseButtons];
