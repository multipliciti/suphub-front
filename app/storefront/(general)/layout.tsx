import { ReactNode } from 'react';

import { StorefrontSidebarLayout } from '@/components/Screens/Storefront/StorefrontSidebarLayout';
import { TabSwitcher, TabSwitcherItem } from '@/components/UI/TabSwitcher';

const tabList: TabSwitcherItem[] = [
	{
		href: '/storefront/get-started',
		title: 'Get Started',
	},
	{
		href: '/storefront/products',
		title: 'My Products',
	},
	{
		href: '/storefront/orders',
		title: 'Orders',
	},
	{
		href: '/storefront/requests',
		title: 'Requests',
	},
];

export default function StorefrontLayout({ children }: { children: ReactNode }) {
	return (
		<StorefrontSidebarLayout>
			<div>
				<TabSwitcher tabs={tabList} />

				<div style={{ padding: '24px 0 24px' }}>{children}</div>
			</div>
		</StorefrontSidebarLayout>
	);
}
