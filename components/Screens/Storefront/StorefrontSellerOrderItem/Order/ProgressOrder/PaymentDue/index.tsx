'use client';
import s from './PaymentDue.module.scss';
import { classNames } from '@/utils/classNames';
import { formatDateString } from '@/utils/formatDateString';

interface PropsType {
	date: string;
	activeDisplay: number[];
	activeStep: number;
	index: number;
}

export const PaymentDue = ({
	activeDisplay,
	index,
	activeStep,
	date,
}: PropsType) => {
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
				{activeStep <= 5 && <p className={s.status}>Payment pending</p>}
				{activeStep > 5 && <p className={s.status_paid}>Paid</p>}
			</div>
		</>
	);
};
