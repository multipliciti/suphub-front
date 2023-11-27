'use client';
import s from './QuoteDetailComponent.module.scss';
import { useState } from 'react';
import { classNames } from '@/utils/classNames';
import { BackButton } from '@/components/UI/BackButton';
import { RequestList } from './RequestList/RequestList';
import { MyQuotation } from './MyQuotation/MyQuotation';

type TypeProps = {
	item: any;
};

export const QuoteDetailComponent = ({ item }: TypeProps) => {
	console.log('item', item);
	const [activeDispale, setActiveDispaly] = useState<number>(1);
	const navList = [
		{
			id: 1,
			title: 'Request List',
		},
		{
			id: 2,
			title: 'My Quotation',
		},
	];

	return (
		<div className={s.wrapper}>
			{/* header  */}
			<div className={s.header}>
				<BackButton href={'/storefront/requests'} />
			</div>
			{/* //content  */}
			<div className={s.content}>
				<div className={s.nav}>
					{navList.map((el) => {
						return (
							<span
								onClick={() => setActiveDispaly(el.id)}
								className={classNames(
									s.nav_item,
									el.id === activeDispale && s.nav_item_active
								)}
							>
								{el.title}
							</span>
						);
					})}
				</div>
				{/* show display  */}
				{activeDispale === 1 && <RequestList item={item} />}
				{activeDispale === 2 && <MyQuotation item={item} />}
			</div>
		</div>
	);
};
