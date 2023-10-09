'use client';
import s from './PaymentDue.module.scss';
import { classNames } from '@/utils/classNames';

interface PropsType {
	activeDisplay: number[];
	index: number;
}

export const PaymentDue = ({ activeDisplay, index }: PropsType) => {
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
				<p className={s.title}>
					To authorize shipment, please pay remaining balance
				</p>

				<button className={s.btn}>Pay $3,244.50</button>
			</div>
		</>
	);
};
