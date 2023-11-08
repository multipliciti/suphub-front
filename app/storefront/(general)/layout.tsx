import { ReactNode } from 'react';

import { TabSwitcher, TabSwitcherItem } from '@/components/UI/TabSwitcher';

import s from './StorefrontGeneralLayout.module.scss';


const tabList: TabSwitcherItem[] = [
	{
		href: '/storefront/products',
		title: 'My Products'
	},
	{
		href: '/storefront/orders',
		title: 'Orders'
	},
	{
		href: '/storefront/rfq',
		title: 'RFQ'
	}
]

export default function StorefrontLayout({ children }: { children: ReactNode }) {
	return (
		<div className={s.wrapper}>

			<TabSwitcher
				tabs={tabList}
			/>

			<div className={s.tab}>
				{children}
			</div>
		</div>
	)
}