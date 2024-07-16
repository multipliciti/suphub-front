interface Button {
	id: number;
	label: string;
	href: string;
}

const marketPlaceButton: Button = {
	id: 3,
	label: 'Marketplace',
	href: '/marketplace',
};

export const buttonsSeller: Button[] = [
	{
		id: 1,
		label: 'My Storefront',
		href: '/storefront/get-started',
	},
	marketPlaceButton,
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
	marketPlaceButton,
];

export const regularUser: Button[] = buttonsBuyer;

export const logOutUser: Button[] = buttonsBuyer;
