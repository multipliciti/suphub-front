'use client';
import s from './Order.module.scss';
import { StatusOrder } from './StatusOrder';
import { useRouter } from 'next/navigation';

import { Info } from './Info';
import { BackButton } from '@/components/UI/BackButton';
import { ProgressOrder } from './ProgressOrder';
import { OrderInterface } from '@/types/services/orders';

interface TypeProps {
	rerender: boolean;
	setRerender: (b: boolean) => void;
	projectId: number;
	order: OrderInterface;
}

export const Order = ({ projectId, order, rerender, setRerender }: TypeProps) => {
	const router = useRouter();
	return (
		<div className={s.wrapper}>
			{/* href from BackButton dosn't work. We can don't use projectId. can use  only BackButton without href */}
			<span onClick={() => router.push(`projects/${projectId}/orders`)}>
				<BackButton />
			</span>

			<StatusOrder code={order.PO} status={order.status} />
			<Info
				date={order.delivery?.estDate || 'Not Available'}
				payments={order.payments ?? null}
				price={order.amount}
			/>
			<ProgressOrder rerender={rerender} setRerender={setRerender} order={order} />
		</div>
	);
};
