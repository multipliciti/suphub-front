'use client';
import { classNames } from '@/utils/classNames';
import s from './OrderDelivered.module.scss';

interface PropsType {
	activeDisplay: number[];
	index: number;
	activeStep: number;
}

export const OrderDelivered = ({ activeDisplay, index, activeStep }: PropsType) => {
	return (
		<>
			<div
				className={classNames(
					s.data_wrapper,
					!activeDisplay.includes(index) && s.data_active
				)}
			>
				<p>In transit</p>
			</div>

			<div
				className={classNames(
					s.wrapper,
					activeDisplay.includes(index) && s.wrapper_active
				)}
			>
				{activeStep <= 7 && (
					<div className={s.info}>
						<span className={s.info_data}>01/05/2023</span>
						<span className={s.info_title}>Order is delivering...</span>
					</div>
				)}

				{activeStep > 7 && (
					<div className={s.info}>
						<span className={s.info_data}>01/05/2023</span>
						<span className={s.info_title}>Order is delivered</span>
					</div>
				)}
			</div>
		</>
	);
};
