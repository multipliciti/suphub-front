import { FC } from 'react';
import Image from 'next/image';

import { classNames } from '@/utils/classNames';

import s from './BoxItem.module.scss';

import trendDown from '@/imgs/Buyer&Seller/trend-down.svg';
import trendUp from '@/imgs/Buyer&Seller/trend-up.svg';
import trendZero from '@/imgs/Buyer&Seller/trend-zero.svg';

interface Props {
	title: string;
	value: string | number;
	trend: number | null;
}

export const BoxItem: FC<Props> = ({ title, value, trend }) => {
	const getTrendIcon = () => {
		if (!trend || trend === 0) {
			return trendZero;
		} else if (trend > 0) {
			return trendUp;
		} else {
			return trendDown;
		}
	};

	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<span className={s.header_title}>{title}</span>
				<span className={s.header_days}>last 30 days</span>
			</div>
			<div className={s.rating}>
				<span className={s.rating_number}>{value}</span>

				<Image
					src={getTrendIcon()}
					alt={trend ? 'trend_up_icon' : 'trend_down_icon_'}
					width={12}
					height={12}
				/>
				<span
					className={classNames(
						s.rating_interest,
						trend === 0 && s.rating_interest_gray,
						!!trend && trend > 0 && s.rating_interest_green,
						!!trend && trend < 0 && s.rating_interest_red
					)}
				>
					{Math.abs(Math.round(trend || 0))}%
				</span>
			</div>
		</div>
	);
};
