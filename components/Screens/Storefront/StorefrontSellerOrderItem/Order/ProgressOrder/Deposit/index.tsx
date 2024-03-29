'use client';
import s from './Deposit.module.scss';
import { classNames } from '@/utils/classNames';
import { formatDateString } from '@/utils/formatDateString';

interface PropsType {
	date: string;
	activeDisplay: number[];
	index: number;
	status: string;
}

export const Deposit = ({ activeDisplay, index, status, date }: PropsType) => {
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
				<p className={classNames(s.status, status !== 'confirmed' && s.status_paid)}>
					{status !== 'depositWaiting' ? 'Paid' : 'Payment pending'}
				</p>
			</div>
		</>
	);
};
