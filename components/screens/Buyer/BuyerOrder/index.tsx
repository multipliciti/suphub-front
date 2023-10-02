'use client';
import s from './BuyerOrder.module.scss';
import { Invoice } from './Invoice';
import { Order } from './Order';

interface TypeProps {
	id: number;
}

export const BuyerOrder = ({ id }: TypeProps) => {
	//using id we will must make fetch

	const product = {
		status: 'Payment pending',
		code: 'Order PO#S0983',
	};

	return (
		<div className={s.wrapper}>
			<Order product={product} />
			<Invoice />
		</div>
	);
};
