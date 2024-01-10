'use client';
import { classNames } from '@/utils/classNames';
import s from './OrderDelivered.module.scss';
import { formatDateString } from '@/utils/formatDateString';

interface PropsType {
	date: string;
	activeDisplay: number[];
	index: number;
	activeStep: number;
}

export const OrderDelivered = ({
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
				{formatDateString(date)}
			</div>

			<div
				className={classNames(
					s.wrapper,
					activeDisplay.includes(index) && s.wrapper_active
				)}
			>
				{activeStep <= 7 && (
					<div className={s.info}>
						<span className={s.info_data}>{formatDateString(date)}</span>
						<span className={s.info_title}>Order is delivering...</span>
					</div>
				)}

				{activeStep > 7 && (
					<div className={s.info}>
						<span className={s.info_data}>{formatDateString(date)}</span>
						<span className={s.info_title}>Order is delivered</span>
					</div>
				)}
			</div>
		</>
	);
};
