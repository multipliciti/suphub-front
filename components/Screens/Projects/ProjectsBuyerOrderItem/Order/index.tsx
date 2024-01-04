'use client';
import s from './Order.module.scss';
import { StatusOrder } from './StatusOrder';
import { Info } from './Info';
import Image from 'next/image';
import { BackButton } from '@/components/UI/BackButton';
import { ProgressOrder } from './ProgressOrder';
import { OrderInterface } from '@/types/services/orders';

interface TypeProps {
	order: OrderInterface;
}

export const Order = ({ order }: TypeProps) => {
	return (
		<div className={s.wrapper}>
			{/* hardcode  */}
			<BackButton href="/projects/1/orders" />

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
