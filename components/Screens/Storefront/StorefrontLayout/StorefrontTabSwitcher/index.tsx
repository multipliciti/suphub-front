'use client';
import { useAppSelector } from '@/redux/hooks';
import { TabSwitcher, TabSwitcherItem } from '@/components/UI/TabSwitcher';

const tabList: TabSwitcherItem[] = [
	{
		href: '/storefront/get-started',
		title: 'Get Started',
		isBlocked: false,
	},
	{
		href: '/storefront/products',
		title: 'My Products',
		isBlocked: true,
	},
	{
		href: '/storefront/orders',
		title: 'Orders',
		isBlocked: true,
	},
	{
		href: '/storefront/requests',
		title: 'Requests',
		isBlocked: true,
	},
];

export const StorefrontTabSwitcher = () => {
	const sellerCompany = useAppSelector((state) => state.authSlice.sellerCompany);

	const tabs =
		!sellerCompany ||
		sellerCompany.status !== 'verified' ||
		!sellerCompany.subscription
			? tabList
			: tabList.map((item) => ({ ...item, isBlocked: false }));

	return <TabSwitcher tabs={tabs} />;
};
