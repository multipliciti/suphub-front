'use client';
import { classNames } from '@/utils/classNames';
import s from './StatusOrder.module.scss';

interface PropsType {
	code: string;
	status: string;
}

export const StatusOrder = ({ code, status }: PropsType) => {
	console.log('code', code, 'status_info', status, 'status', status);
	return (
		<div className={s.info}>
			<span className={s.info_code}>Order PO#{code}</span>
			<span
				className={classNames(
					s.info_status,
					status === 'pending' && s.info_status_pending,
					status === 'confirmed' && s.info_status_confirmed,
					status === 'inProduction' && s.info_status_inProduction,
					status === 'preShipment' && s.info_status_preShipment
				)}
			>
				{status}
			</span>
		</div>
	);
};
