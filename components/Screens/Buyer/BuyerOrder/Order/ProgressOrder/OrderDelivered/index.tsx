'use client';
import { classNames } from '@/utils/classNames';
import s from './OrderDelivered.module.scss';
import { useState } from 'react';

interface PropsType {
	activeDisplay: number[];
	index: number;
}

export const OrderDelivered = ({ activeDisplay, index }: PropsType) => {
	const [testShow, setTestShow] = useState<boolean>(false);
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
				{testShow && (
					<div className={s.info}>
						<span className={s.info_data}>01/05/2023</span>
						<span className={s.info_title}>Order is delivered</span>
					</div>
				)}

				{!testShow && (
					<div className={s.wrapper_inner}>
						<button
							onClick={() => setTestShow(true)}
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
