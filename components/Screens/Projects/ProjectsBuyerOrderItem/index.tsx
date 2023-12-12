'use client';
import s from './ProjectsBuyerOrderItem.module.scss';
import { useEffect, useState } from 'react';
import { InvoiceComponent } from './InvoiceComponent';
import { useAppSelector } from '@/redux/hooks';
import { Order } from './Order';
import { Api } from '@/services';
import { OrderInterface } from '@/types/services/orders';

interface TypeProps {
	id: number;
}

export const ProjectsBuyerOrderItem = ({ id }: TypeProps) => {
	const api = Api();
	const img = useAppSelector((state) => state.orderSlice.img);
	const [order, setOrder] = useState<OrderInterface | null>(null);
	//using id we will must make fetch

	const getOrderById = async (id: number) => {
		try {
			const order: OrderInterface = await api.buyerOrder.getOrderById(id);
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
					<InvoiceComponent data={order.elements || null} />
				</>
			)}
		</div>
	);
};
