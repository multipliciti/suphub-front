'use client';
import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { classNames } from '@/utils/classNames';

import s from './StorefrontTabSwitcher.module.scss';

export interface TabSwitcherItem {
	href: string;
	title: string;
}

interface Props {
	tabs: TabSwitcherItem[];
}

export const TabSwitcher: FC<Props> = ({ tabs }) => {
	const pathname = usePathname();

	return (
		<div className={s.wrapper}>
			{tabs.map((item) => (
				<Link
					key={item.href}
					href={item.href}
					className={classNames(s.link, pathname === item.href && s.link_active)}
				>
					{item.title}
				</Link>
			))}
		</div>
	);
};
