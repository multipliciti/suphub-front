interface Button {
	id: number;
	label: string;
	href: string;
}

const isProduction: boolean = process.env.NODE_ENV === 'production';

const baseButtons: Button[] = [
	...(isProduction
		? []
		: [
				{
					id: 2,
					label: 'My Suppliers',
					href: '/suppliers',
				},
		  ]),
	{
		id: 3,
		label: 'Marketplace',
		href: '/marketplace',
	},
];

export const buttonsSeller: Button[] = [
	{
		id: 1,
		label: 'My Storefront',
		href: '/storefront/get-started',
	},
	...baseButtons,
];

export const buttonsBuyer: Button[] = [
	{
		id: 1,
		label: 'My Projects',
		href: '/projects',
	},
	...baseButtons,
];

export const regularUser: Button[] = buttonsBuyer;

export const logOutUser: Button[] = buttonsBuyer;
