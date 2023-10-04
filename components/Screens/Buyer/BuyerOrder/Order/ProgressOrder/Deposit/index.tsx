'use client';
import s from './Deposit.module.scss';
import { classNames } from '@/utils/classNames';

interface PropsType {
	activeDisplay: number;
}

export const Deposit = ({ activeDisplay }: PropsType) => {
	return (
		<div className={classNames(s.wrapper, activeDisplay === 1 && s.wrapper_active)}>
			<p className={s.title}>To start production pay Deposit</p>
			<button className={s.btn}>Pay $1,390.50 now</button>
		</div>
	);
};
