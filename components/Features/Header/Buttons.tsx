interface Button {
	id: number;
	label: string;
	href: string;
}

export const buttonsSeller: Button[] = [
	{
		id: 1,
		label: 'Marketplace',
		href: '/marketplace',
	},
	{
		id: 2,
		label: 'My Storefront',
		href: '/storefront/get-started',
	},
];

export const buttonsBuyer: Button[] = [
	{
		id: 1,
		label: 'Marketplace',
		href: '/marketplace',
	},
	{
		id: 2,
		label: 'Projects',
		href: '/projects',
	},
];

export const regularUser: Button[] = [
	{
		id: 1,
		label: 'Marketplace',
		href: '/marketplace',
	},
	{
		id: 2,
		label: 'Projects',
		href: '/projects',
	},
];

export const logOutUser: Button[] = [
	{
		id: 1,
		label: 'Marketplace',
		href: '/marketplace',
	},
	{
		id: 2,
		label: 'Projects',
		href: '/projects',
	},
];
