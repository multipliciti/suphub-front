'use client';
import s from './PaymentDue.module.scss';
import { classNames } from '@/utils/classNames';

interface PropsType {
	activeDisplay: number[];
	activeStep: number;
	index: number;
}

export const PaymentDue = ({ activeDisplay, index, activeStep }: PropsType) => {
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
				{activeStep <= 5 && <p className={s.status}>Payment pending</p>}
				{activeStep > 5 && <p className={s.status_paid}>Paid</p>}
			</div>
		</>
	);
};
