'use client';
import s from './Deposit.module.scss';
import { classNames } from '@/utils/classNames';
import { OrderPaymentInterface } from '@/types/services/Orders';
import { Api } from '@/services';

interface PropsType {
	activeDisplay: number[];
	index: number;
	price: number;
	orderId: number;
	status: string;
	rerenderProgress: boolean;
	setRerenderProgress: (b: boolean) => void;
}

export const Deposit = ({
	activeDisplay,
	index,
	orderId,
	price,
	status,
	rerenderProgress,
	setRerenderProgress,
}: PropsType) => {
	const api = Api();
	const priceInner = Math.floor(price / 3);

	const fetchPayDeposit = async (id: number, price: number) => {
		if (status === 'confirmed') {
			try {
				await api.buyerOrder.orderPayment({
					orderId: id,
					sum: price,
					type: 'deposit',
				});
				setRerenderProgress(!rerenderProgress);
			} catch (error) {
				console.error('fetchPayDeposit seller error', error);
			}
		}
	};

	return (
		<>
			<div
				className={classNames(
					s.data_wrapper,
					!activeDisplay.includes(index) && s.data_active
				)}
			>
				<p>01/05/2023</p>
			</div>

			<div
				className={classNames(
					s.wrapper,
					activeDisplay.includes(index) && s.wrapper_active
				)}
			>
				<p className={s.title}>To start production pay Deposit</p>
				<button
					onClick={() => fetchPayDeposit(orderId, priceInner)}
					className={s.btn}
				>
					Pay ${priceInner} now
				</button>
			</div>
		</>
	);
};
