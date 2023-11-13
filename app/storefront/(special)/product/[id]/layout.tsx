import { ReactNode } from 'react';

import { TabSwitcher, TabSwitcherItem } from '@/components/UI/TabSwitcher';
import { BackButton } from '@/components/UI/BackButton';

import s from './StorefrontProductItemLayout.module.scss';

const tabList = (id: number): TabSwitcherItem[] => [
	{
		href: `/storefront/product/${id}/general`,
		title: 'General Info',
	},
	{
		href: `/storefront/product/${id}/samples`,
		title: 'Samples',
	},
];

interface Props {
	children: ReactNode;
	params: {
		id: number;
	};
}

export default function StorefrontProductItemLayout({
	children,
	params: { id },
}: Props) {
	return (
		<div className={s.wrapper}>
			<BackButton href="/storefront/products" />
			<TabSwitcher tabs={tabList(id)} />
			{children}
		</div>
	);
}
