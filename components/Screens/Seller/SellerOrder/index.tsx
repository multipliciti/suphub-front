'use client';
import s from './SellerOrder.module.scss';
import { InvoiceChatComponent } from './InvoiceChatComponent';
import { Order } from './Order';

interface TypeProps {
	id: number;
}

export const SellerOrder = ({ id }: TypeProps) => {
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
