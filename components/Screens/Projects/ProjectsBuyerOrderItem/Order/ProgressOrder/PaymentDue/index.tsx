'use client';
import s from './PaymentDue.module.scss';
import { classNames } from '@/utils/classNames';
import { useRouter } from 'next/navigation';
import { Api } from '@/services';
import { formatDateString } from '@/utils/formatDateString';

interface PropsType {
	date: string;
	activeDisplay: number[];
	index: number;
	orderId: number;
	activeStep: number;
	price: number;
	projectId: number;
}

export const PaymentDue = ({
	date,
	activeDisplay,
	index,
	orderId,
	projectId,
	activeStep,
	price,
}: PropsType) => {
	const HOST = process.env.NEXT_PUBLIC_CLIENT_HOST;
	const { push } = useRouter();
	const api = Api();
	const fetchOrderPay = async () => {
		const data = {
			orderId,
			amount: Number(((price * 3) / 4).toFixed(2)),
			type: 'remaining',
			successUrl: `${HOST}/projects/${projectId}/order/${orderId}`,
			cancelUrl: `${HOST}/projects/${projectId}/order/${orderId}`,
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
				{activeStep <= 5 && (
					<>
						<p className={s.title}>
							To authorize shipment, please pay remaining balance
						</p>

						<button onClick={() => fetchOrderPay()} className={s.btn}>
							Pay ${((price * 3) / 4).toFixed(2)}
						</button>
					</>
				)}
				{activeStep > 5 && <p className={s.paid}>Paid</p>}
			</div>
		</>
	);
};
