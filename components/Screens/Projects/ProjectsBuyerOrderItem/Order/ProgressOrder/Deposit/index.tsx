'use client';
import s from './Deposit.module.scss';
import { classNames } from '@/utils/classNames';
import { formatDateString } from '@/utils/formatDateString';
import { Api } from '@/services';
import { useRouter } from 'next/navigation';

interface PropsType {
	date: string;
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
	status,
	price,
	date,
}: PropsType) => {
	const HOST = process.env.NEXT_PUBLIC_CLIENT_HOST;
	const api = Api();
	const priceInner = Math.floor(price / 4);
	const { push } = useRouter();

	const fetchOrderPay = async () => {
		const data = {
			orderId,
			amount: priceInner,
			type: 'deposit',
			successUrl: `${HOST}/projects/order/${orderId}`,
			cancelUrl: `${HOST}/projects/order/${orderId}`,
		};

		try {
			const response = await api.buyerOrder.orderPay(data);
			push(response.data.url);
		} catch (error) {
			console.error('fetchOrderPay error:', error);
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
				<p>{formatDateString(date)}</p>
			</div>

			<div
				className={classNames(
					s.wrapper,
					activeDisplay.includes(index) && s.wrapper_active
				)}
			>
				{status === 'confirmed' ? (
					<>
						<p className={s.title}>To start production pay Deposit</p>
						<button onClick={() => fetchOrderPay()} className={s.btn}>
							Pay ${priceInner} now
						</button>
					</>
				) : (
					<p className={s.paid}>Paid</p>
				)}
			</div>
		</>
	);
};
