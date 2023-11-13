'use client';
import s from './BuyerOrder.module.scss';
import Image from 'next/image';
import { useAppSelector } from '@/redux/hooks';
import { InvoiceChatComponent } from './InvoiceChatComponent';
import { Order } from './Order';

interface TypeProps {
	id: number;
}

export const BuyerOrder = ({ id }: TypeProps) => {
	const img = useAppSelector((state) => state.orderSlice.img);
	//using id we will must make fetch
	const product = {
		status: 'Payment pending',
		code: 'Order PO#S0983',
		status_info: 'pending',
	};

	return (
		<div className={s.wrapper}>
			<Order product={product} />
			<InvoiceChatComponent />
		</div>
	);
};
