'use client';
import s from './Deposit.module.scss';
import { classNames } from '@/utils/classNames';

interface PropsType {
	activeDisplay: number[];
	index: number;
}

export const Deposit = ({ activeDisplay, index }: PropsType) => {
	return (
		<div
			className={classNames(
				s.wrapper,
				activeDisplay.includes(index) && s.wrapper_active
			)}
		>
			<p className={s.title}>Payment pending</p>
		</div>
	);
};
