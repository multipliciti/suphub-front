'use client';
import s from './ProjectsBuyerOrderItem.module.scss';
import { useEffect, useState } from 'react';
import { InvoiceComponent } from './InvoiceComponent';
import { Order } from './Order';
import { Api } from '@/services';
import { OrderInterface } from '@/types/services/orders';

interface TypeProps {
	projectId: number;
	orderId: number;
}

export const ProjectsBuyerOrderItem = ({ orderId, projectId }: TypeProps) => {
	const api = Api();
	const [order, setOrder] = useState<OrderInterface | null>(null);

	const getOrderById = async (id: number) => {
		try {
			const order: OrderInterface = await api.buyerOrder.getOrderById(id);
			setOrder(order);
		} catch (error) {
			console.error('getOrderById buyer error', error);
		}
	};

	useEffect(() => {
		getOrderById(orderId);
	}, []);

	return (
		<div className={s.wrapper}>
			{order && (
				<>
					<Order projectId={projectId} order={order} />
					<InvoiceComponent order={order} />
				</>
			)}
		</div>
	);
};
