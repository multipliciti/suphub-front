'use client';
import s from './BoxItem.module.scss';
import Image from 'next/image';
import trend_down from '@/imgs/Buyer&Seller/trend-down.svg';
import trend_up from '@/imgs/Buyer&Seller/trend-up.svg';
import { classNames } from '@/utils/classNames';

interface TypeProps {
	title: string;
	rating_number: string;
	trend?: 'up' | 'down';
	days?: string;
	interest?: string;
	disable?: boolean
}
export const BoxItem = ({
	title,
	days,
	rating_number,
	trend,
	interest,
	disable = false
}: TypeProps) => {
	return (
		<div className={classNames(s.wrapper, disable && s.wrapper_disable)}>
			<div className={s.header}>
				<span className={s.header_title}>{title}</span>
				{days && <span className={s.header_days}>{days}</span>}

			</div>
			<div className={s.rating}>
				<span className={s.rating_number}>{rating_number}</span>
				{trend && (
					<Image
						src={trend === 'up' ? trend_up : trend_down}
						alt="trend_down"
						width={12}
						height={12}
					/>
				)}
				{trend && interest && (
					<span
						className={classNames(
							s.rating_interest,
							trend === 'up' ? s.rating_interest_green : s.rating_interest_red
						)}
					>
					{interest}
				</span>
				)}
			</div>
		</div>
	);
};
