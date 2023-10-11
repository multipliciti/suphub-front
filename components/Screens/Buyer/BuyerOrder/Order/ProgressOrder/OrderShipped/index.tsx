'use client';
import { classNames } from '@/utils/classNames';
import s from './OrderShipped.module.scss';

interface PropsType {
	activeDisplay: number[];
	index: number;
}

export const OrderShipped = ({ activeDisplay, index }: PropsType) => {
	return (
		<>
			<div
				className={classNames(
					s.data_wrapper,
					!activeDisplay.includes(index) && s.data_active
				)}
			>
				<p>01/05/2023</p>
			</div>

			<div
				className={classNames(
					s.wrapper,
					activeDisplay.includes(index) && s.wrapper_active
				)}
			>
				<div className={s.wrapper_inner}>
					<div className={s.info}>
						<span className={s.info_data}>01/05/2023</span>
						<p className={s.info_title}>Preparing for shipment</p>
					</div>

					<div className={s.info}>
						<span className={s.info_data}>01/05/2023</span>
						<p className={s.info_title}>
							Order has shipped. Carrier: <span>Ocean Freight.</span> Tracking number
							<span className={s.info_got}> #9400650065600 </span>
							Bill of lading <span className={s.info_got}>Download</span>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};
