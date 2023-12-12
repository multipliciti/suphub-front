'use client';
import { classNames } from '@/utils/classNames';
import { Delivery } from '@/types/services/Orders';
import s from './OrderShipped.module.scss';
import { formatDateString } from '@/utils/formatDateString';

interface PropsType {
	date: string;
	preparingForShipmentDate: string;
	activeDisplay: number[];
	index: number;
	delivery: Delivery | null;
}

export const OrderShipped = ({
	date,
	preparingForShipmentDate,
	activeDisplay,
	index,
	delivery,
}: PropsType) => {
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
				<div className={s.wrapper_inner}>
					<div className={s.info}>
						<span className={s.info_data}>
							{formatDateString(preparingForShipmentDate)}
						</span>
						<p className={s.info_title}>Preparing for shipment</p>
					</div>
					{/* //   */}
					{delivery && (
						<div className={s.info}>
							<span className={s.info_data}>{formatDateString(date)}</span>
							<p className={s.info_title}>
								Order has shipped. Carrier: <span>Ocean Freight.</span> Tracking
								number
								{delivery?.trackingNumber &&
								delivery?.trackingNumber.toString().length > 0 ? (
									<span className={s.info_got}> {delivery.trackingNumber} </span>
								) : (
									<span className={s.info_got}> (not number) </span>
								)}
								Bill of lading
								{delivery.bill ? (
									<a download href={delivery.bill.url} className={s.info_got}>
										<span> Download</span>
									</a>
								) : (
									<span className={s.info_got}> No File Available</span>
								)}
							</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
};
