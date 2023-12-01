'use client';
import s from './PaymentDue.module.scss';
import { classNames } from '@/utils/classNames';
import { useRouter } from 'next/navigation';
import { Api } from '@/services';

interface PropsType {
	activeDisplay: number[];
	index: number;
	orderId: number;
	activeStep: number;
}

export const PaymentDue = ({
	activeDisplay,
	index,
	orderId,
	activeStep,
}: PropsType) => {
	const { push } = useRouter();
	const api = Api();

	const fetchOrderPay = async () => {
		const data = {
			orderId,
			amount: 1000,
			type: 'remaining',
			//hardcode
			successUrl: 'http://localhost:8080/testBuyerOrder',
			cancelUrl: 'http://localhost:8080/testBuyerOrder',
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
				<p>01/05/2023</p>
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
							Pay $3,244.50
						</button>
					</>
				)}
				{activeStep > 5 && <p className={s.paid}>Paid</p>}
			</div>
		</>
	);
};
