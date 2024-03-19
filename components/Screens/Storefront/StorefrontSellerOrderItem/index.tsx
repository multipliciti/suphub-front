'use client';
import { useEffect, useState } from 'react';
import s from './StorefrontSellerOrderItem.module.scss';
import { InvoiceComponent } from './InvoiceComponent';
import { Order } from './Order';
import { Api } from '@/services';
import { OrderInterface } from '@/types/services/orders';

interface TypeProps {
	orderId: number;
}

export const StorefrontSellerOrderItem = ({ orderId }: TypeProps) => {
	const api = Api();
	const [order, setOrder] = useState<OrderInterface | null>(null);
	const [rerender, setRerender] = useState<boolean>(false);

	const getOrderById = async (id: number) => {
		try {
			const order: OrderInterface = await api.sellerOrder.getOrderById(id);

			setOrder(order);
		} catch (error) {
			console.error('getOrderById buyer error', error);
		}
	};

	useEffect(() => {
		getOrderById(orderId);
	}, [rerender, setRerender]);

	return (
		<div className={s.wrapper}>
			{order && (
				<>
					<Order order={order} setRerender={setRerender} />
					<InvoiceComponent order={order} />
				</>
			)}
		</div>
	);
};
