'use client';
import { useEffect, useState } from 'react';
import s from './SellerOrder.module.scss';
import { InvoiceChatComponent } from './InvoiceChatComponent';
import { Order } from './Order';
import { Api } from '@/services';
import { OrderInterface } from '@/types/services/Orders';

interface TypeProps {
	id: number;
}

export const SellerOrder = ({ id }: TypeProps) => {
	const api = Api();
	const [order, setOrder] = useState<OrderInterface | null>(null);

	const getOrderById = async (id: number) => {
		try {
			const order: OrderInterface = await api.sellerOrder.getOrderById(id);

			setOrder(order);
		} catch (error) {
			console.error('getOrderById buyer error', error);
		}
	};

	useEffect(() => {
		getOrderById(id);
	}, []);

	return (
		<div className={s.wrapper}>
			{order && (
				<>
					<Order order={order} />
					<InvoiceChatComponent />
				</>
			)}
		</div>
	);
};
