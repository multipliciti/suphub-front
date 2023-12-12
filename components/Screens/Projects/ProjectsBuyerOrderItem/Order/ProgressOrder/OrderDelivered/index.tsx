'use client';
import { classNames } from '@/utils/classNames';
import s from './OrderDelivered.module.scss';
import { Api } from '@/services';
import { useState } from 'react';
import { formatDateString } from '@/utils/formatDateString';

interface PropsType {
	date: string;
	orderId: number;
	activeDisplay: number[];
	index: number;
	activeStep: number;
	setActiveStep: (n: number) => void;
}

export const OrderDelivered = ({
	date,
	orderId,
	activeDisplay,
	index,
	setActiveStep,
	activeStep,
}: PropsType) => {
	const api = Api();

	const changeStatusCompleted = async () => {
		try {
			await api.sellerOrder.changeStatus({
				id: orderId,
				status: 'completed',
			});
			setActiveStep(8);
		} catch (error) {
			console.error('changeStatusCompleted error:', error);
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
				<p>kfkkfkf</p>
			</div>

			<div
				className={classNames(
					s.wrapper,
					activeDisplay.includes(index) && s.wrapper_active
				)}
			>
				{activeStep > 7 && (
					<div className={s.info}>
						<span className={s.info_data}>01/05/2023</span>
						<span className={s.info_title}>Order is delivered</span>
					</div>
				)}

				{activeStep <= 7 && (
					<div className={s.wrapper_inner}>
						<button
							onClick={() => {
								changeStatusCompleted();
							}}
							className={s.wrapper_inner_btn}
						>
							Mark as delivered
						</button>
						<p className={s.wrapper_inner_title}>
							Please contact customer support to report product issues within 15 days
							of order delivery.
						</p>
					</div>
				)}
			</div>
		</>
	);
};
