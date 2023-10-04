'use client';
import { classNames } from '@/utils/classNames';
import s from './StatusOrder.module.scss';

interface PropsType {
	code: string;
	status_info: string;
	status: string;
}

export const StatusOrder = ({ code, status_info, status }: PropsType) => {
	return (
		<div className={s.info}>
			<span className={s.info_code}>{code}</span>
			<span
				className={classNames(
					s.info_status,
					status_info === 'pending' && s.info_status_pending
				)}
			>
				{status}
			</span>
		</div>
	);
};
