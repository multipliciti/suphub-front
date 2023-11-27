'use client';
import Image from 'next/image';
import { classNames } from '@/utils/classNames';
import remainig_icon from '@/imgs/Buyer&Seller/remaining.svg';
import delivery_icon from '@/imgs/Buyer&Seller/delivery.svg';
import paid_icon from '@/imgs/Buyer&Seller/paid.svg';
import total_icon from '@/imgs/Buyer&Seller/total.svg';
import s from './Info.module.scss';

interface TypeProps {
	price: number;
}

export const Info = ({ price }: TypeProps) => {
	return (
		<div className={s.wrapper}>
			<div className={s.item}>
				<span className={classNames(s.icon, s.icon_remainig)}>
					<Image src={remainig_icon} alt="icon_process" width={24} height={24} />
				</span>
				<div className={s.item_info}>
					<span className={s.item_info_title}>Remaining</span>
					<span className={s.item_info_value}>${price}</span>
				</div>
			</div>
			{/* //  */}
			<div className={s.item}>
				<span className={classNames(s.icon, s.icon_paid)}>
					<Image src={paid_icon} alt="icon_process" width={24} height={24} />
				</span>
				<div className={s.item_info}>
					<span className={s.item_info_title}>Paid</span>
					<span className={s.item_info_value}>$0</span>
				</div>
			</div>
			{/* //  */}
			<div className={s.item}>
				<span className={classNames(s.icon, s.icon_total)}>
					<Image src={total_icon} alt="icon_process" width={24} height={24} />
				</span>
				<div className={s.item_info}>
					<span className={s.item_info_title}>Total</span>
					<span className={s.item_info_value}>${price}</span>
				</div>
			</div>
			{/* //  */}
			<div className={s.item}>
				<span className={classNames(s.icon, s.icon_delivey)}>
					<Image src={delivery_icon} alt="icon_process" width={24} height={24} />
				</span>
				<div className={s.item_info}>
					<span className={s.item_info_title}>Estimated Delivery</span>
					<span className={s.item_info_value}>02/26/2022 (Exmpl)</span>
				</div>
			</div>
		</div>
	);
};
