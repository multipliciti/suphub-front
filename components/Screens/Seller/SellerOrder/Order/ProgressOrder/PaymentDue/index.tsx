'use client';
import s from './PaymentDue.module.scss';
import { classNames } from '@/utils/classNames';

interface PropsType {
	activeDisplay: number[];
	index: number;
}

export const PaymentDue = ({ activeDisplay, index }: PropsType) => {
	return (
		<div
			className={classNames(
				s.wrapper,
				activeDisplay.includes(index) && s.wrapper_active
			)}
		>
			<p className={s.status}>Payment pending</p>
		</div>
	);
};
