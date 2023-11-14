'use client';
import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { usePathname } from 'next/navigation';
import { classNames } from '@/utils/classNames';

import s from './StorefrontTabSwitcher.module.scss';

import lockIcon from '@/imgs/Buyer&Seller/lock.svg';

export interface TabSwitcherItem {
	href: string;
	title: string;
	isBlocked?: boolean;
}

interface Props {
	tabs: TabSwitcherItem[];
}

export const TabSwitcher: FC<Props> = ({ tabs }) => {
	const pathname = usePathname();

	return (
		<div className={s.wrapper}>
			{tabs.map((item, index) => (
				<div
					key={`${index}-${item.href}`}
					className={classNames(s.link, pathname === item.href && s.link_active)}
				>
					{item.isBlocked && (
						<Image
							src={lockIcon}
							alt="tab_lock_icon"
							width={18}
							height={18}
							style={{ marginTop: 3 }}
						/>
					)}
					{item.isBlocked ? (
						<span className={s.link_text_blocked}>{item.title}</span>
					) : (
						<Link key={item.href} href={item.href} className={s.link_text}>
							{item.title}
						</Link>
					)}
				</div>
			))}
		</div>
	);
};
