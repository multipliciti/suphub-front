'use client';
import { useState } from 'react';
import s from './NoResult.module.scss';
import Image from 'next/image';
import no_rfq_icon from '@/imgs/Buyer&Seller/noRFQ.svg';

export const NoResult = () => {
	const [test, setTest] = useState<boolean>(false);

	return (
		<div className={s.wrapper}>
			<Image src={no_rfq_icon} alt="no_rfq_icon" width={80} height={80} />
			<div className={s.info}>
				<p className={s.info_title}>No RFQs yet</p>
				{!test && (
					<button onClick={() => setTest(!test)} className={s.request}>
						Add new request
					</button>
				)}
				{test && (
					<p className={s.info_subtitle}>
						To create a product inquiry, add a category that belongs to your product,
						and then add a product to that division.
					</p>
				)}
			</div>
		</div>
	);
};
