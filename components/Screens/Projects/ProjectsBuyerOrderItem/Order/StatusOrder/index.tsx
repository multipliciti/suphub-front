'use client';
import { classNames } from '@/utils/classNames';
import s from './StatusOrder.module.scss';

interface PropsType {
	code: string;
	status: string;
}

export const StatusOrder = ({ code, status }: PropsType) => {
	return (
		<div className={s.info}>
			<span className={s.info_code}>Order PO#{code}</span>
			<span
				className={classNames(
					s.info_status,
					status === 'confirmed' && s.info_status_issued,
					status === 'depositWaiting' && s.info_status_pending,
					status === 'inProduction' && s.info_status_inproduction,
					// status === 'productionCompleted' && s.info_status_inproduction,
					status === 'paymentWaiting' && s.info_status_pending,
					status === 'preShipment' && s.info_status_preshipment,
					status === 'shipped' && s.info_status_intransit,
					status === 'delivered' && s.info_status_delivered,
					status === 'completed' && s.info_status_delivered
				)}
			>
				{status === 'confirmed' && 'PO issued'}
				{status === 'depositWaiting' && 'Payment pending'}
				{status === 'inProduction' && 'In production'}
				{/* {status === 'productionCompleted' && 'Production Completed'} */}
				{status === 'paymentWaiting' && 'Payment pending'}
				{status === 'preShipment' && 'Pre-shipment'}
				{status === 'shipped' && 'In transit'}
				{status === 'delivered' && 'Delivered'}
				{status === 'completed' && 'Delivered'}
			</span>
		</div>
	);
};
