'use client';
import s from './Order.module.scss';
import { StatusOrder } from './StatusOrder';
import { Info } from './Info';
import { ProgressOrder } from './ProgressOrder';
import { OrderInterface } from '@/types/services/orders';
import { BackButton } from '@/components/UI/BackButton';

interface Product {
	order: OrderInterface;
	setRerender: (b: boolean) => void;
}

export const Order = ({ order, setRerender }: Product) => {
	return (
		<div className={s.wrapper}>
			<BackButton href="/storefront/orders" />

			<StatusOrder code={order.PO} status={order.status} />
			<Info
				date={order.delivery?.estDate || '-'}
				payments={order.payments ?? null}
				price={order.amount}
			/>
			<ProgressOrder order={order} setRerender={setRerender} />
		</div>
	);
};
