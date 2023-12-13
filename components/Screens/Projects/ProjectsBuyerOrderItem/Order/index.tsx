'use client';
import s from './Order.module.scss';
import { StatusOrder } from './StatusOrder';
import { Info } from './Info';
import Image from 'next/image';
import back_btn from '@/imgs/Buyer&Seller/back_btn.svg';
import { ProgressOrder } from './ProgressOrder';
import { OrderInterface } from '@/types/services/orders';

interface TypeProps {
	order: OrderInterface;
}

export const Order = ({ order }: TypeProps) => {
	return (
		<div className={s.wrapper}>
			<button className={s.btn_back}>
				<Image src={back_btn} alt="back_btn" width={20} height={20} />
				<span className={s.btn_text}>Back</span>
			</button>

			<StatusOrder code={order.PO} status={order.status} />
			<Info
				date={order.estDate}
				payments={order.payments ?? null}
				price={order.amount}
			/>
			<ProgressOrder order={order} />
		</div>
	);
};
