'use client';
import Image from 'next/image';
import s from './Info.module.scss';
import { Payment } from '@/types/services/orders';
import { formatDateString } from '@/utils/formatDateString';
import { classNames } from '@/utils/classNames';
import remainig_icon from '@/imgs/Buyer&Seller/remaining.svg';
import delivery_icon from '@/imgs/Buyer&Seller/delivery.svg';
import paid_icon from '@/imgs/Buyer&Seller/paid.svg';
import total_icon from '@/imgs/Buyer&Seller/total.svg';
import { formatNumber } from '@/utils/formatNumber';

interface TypeProps {
	date: string;
	price: number;
	payments: Payment[] | null;
}

export const Info = ({ price, payments, date }: TypeProps) => {
	const paidTotal =
		payments?.reduce((accumulator, payment) => accumulator + payment.sum, 0) ?? 0;
	const remainingTotal = price - paidTotal;
	return (
		<div className={s.wrapper}>
			<div className={s.item}>
				<span className={classNames(s.icon, s.icon_remainig)}>
					<Image src={remainig_icon} alt="icon_process" width={24} height={24} />
				</span>
				<div className={s.item_info}>
					<span className={s.item_info_title}>Remaining</span>
					<span className={s.item_info_value}>${formatNumber(remainingTotal)}</span>
				</div>
			</div>
			{/* //  */}
			<div className={s.item}>
				<span className={classNames(s.icon, s.icon_paid)}>
					<Image src={paid_icon} alt="icon_process" width={24} height={24} />
				</span>
				<div className={s.item_info}>
					<span className={s.item_info_title}>Paid</span>
					<span className={s.item_info_value}>${formatNumber(paidTotal)}</span>
				</div>
			</div>
			{/* //  */}
			<div className={s.item}>
				<span className={classNames(s.icon, s.icon_total)}>
					<Image src={total_icon} alt="icon_process" width={24} height={24} />
				</span>
				<div className={s.item_info}>
					<span className={s.item_info_title}>Total</span>
					<span className={s.item_info_value}>${formatNumber(price)}</span>
				</div>
			</div>
			{/* //  */}
			<div className={s.item}>
				<span className={classNames(s.icon, s.icon_delivey)}>
					<Image src={delivery_icon} alt="icon_process" width={24} height={24} />
				</span>
				<div className={s.item_info}>
					<span className={s.item_info_title}>Estimated Delivery</span>
					<span className={s.item_info_value}>{formatDateString(date)}</span>
				</div>
			</div>
		</div>
	);
};
