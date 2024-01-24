'use client';
import s from './Order.module.scss';
import { StatusOrder } from './StatusOrder';
import { Info } from './Info';
import Image from 'next/image';
import { BackButton } from '@/components/UI/BackButton';
import { ProgressOrder } from './ProgressOrder';
import { OrderInterface } from '@/types/services/orders';
import Link from 'next/link';

interface TypeProps {
	projectId: number;
	order: OrderInterface;
}

export const Order = ({ projectId, order }: TypeProps) => {
	return (
		<div className={s.wrapper}>
			<Link href={`projects/${projectId}/orders`}>
				{/* href from BackButton dosn't work  */}
				<BackButton />
			</Link>

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
