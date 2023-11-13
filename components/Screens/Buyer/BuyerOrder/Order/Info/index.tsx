'use client';
import Image from 'next/image';
import { classNames } from '@/utils/classNames';
import remainig_icon from '@/imgs/Buyer&Seller/remaining.svg';
import delivery_icon from '@/imgs/Buyer&Seller/delivery.svg';
import paid_icon from '@/imgs/Buyer&Seller/paid.svg';
import total_icon from '@/imgs/Buyer&Seller/total.svg';
import s from './Info.module.scss';

export const Info = () => {
	const TEST_ITEMS = [
		{
			title: 'Remaining',
			value: '$4,635,00',
		},
		{
			title: 'Paid',
			value: '$0.00',
		},
		{
			title: 'Total',
			value: '$4,635,00',
		},
		{
			title: 'Estimated Delivery',
			value: '02/26/2022',
		},
	];
	return (
		<div className={s.wrapper}>
			{TEST_ITEMS.map((el, ind) => {
				return (
					<div className={s.item} key={ind}>
						<span
							className={classNames(
								s.icon,
								ind === 0 && s.icon_remainig,
								ind === 1 && s.icon_paid,
								ind === 2 && s.icon_total,
								ind === 3 && s.icon_delivey
							)}
						>
							<Image
								src={
									ind === 0
										? remainig_icon
										: ind === 1
										  ? paid_icon
										  : ind === 2
										    ? total_icon
										    : delivery_icon
								}
								alt="icon_process"
								width={24}
								height={24}
							/>
						</span>
						<div className={s.item_info}>
							<span className={s.item_info_title}>{el.title} </span>
							<span className={s.item_info_value}>{el.value}</span>
						</div>
					</div>
				);
			})}
		</div>
	);
};
