'use client';
import Image from 'next/image';

import s from './NoResult.module.scss';
import { setModal } from '@/redux/slices/modal';
import { useAppDispatch } from '@/redux/hooks';
import no_rfq_icon from '@/imgs/Buyer&Seller/noRFQ.svg';

export const NoResult = () => {
	const dispatch = useAppDispatch();

	return (
		<div className={s.wrapper}>
			<Image src={no_rfq_icon} alt="no_rfq_icon" width={80} height={80} />
			<div className={s.info}>
				<p className={s.info_title}>No RFQs yet</p>
				<button
					onClick={() => dispatch(setModal('addRequestManually'))}
					className={s.request}
				>
					Add new request
				</button>

				{/* {test && (
					<p className={s.info_subtitle}>
						To create a product inquiry, add a category that belongs to your product,
						and then add a product to that division.
					</p>
				)} */}
			</div>
		</div>
	);
};
