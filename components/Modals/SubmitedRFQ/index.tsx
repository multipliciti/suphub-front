'use client';
import s from './SubmitedRFQ.module.scss';
import Image from 'next/image';
import { useAppDispatch } from '@/redux/hooks';
import { setModal } from '@/redux/slices/modal';
import submitedRFQ from '@/imgs/Buyer&Seller/submitedRFQ.svg';
import close_img from '@/imgs/close.svg';

export const SubmitedRFQ = () => {
	const dispatch = useAppDispatch();
	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<Image
					onClick={() => dispatch(setModal(''))}
					className={s.header_close}
					src={close_img}
					alt="close_img"
					width={20}
					height={20}
				/>
			</div>
			<div className={s.wrapper_inner}>
				<Image src={submitedRFQ} alt="submitedRFQ" width={128} height={128} />

				<div className={s.description}>
					<h3 className={s.title}>RFQ submitted</h3>
					<p className={s.subtitle}>
						RFQ request has been successfully sent to suppliers
					</p>
				</div>

				<button
					onClick={() => dispatch(setModal('addRequestManually'))}
					className={s.submit}
				>
					Submit another request
				</button>
			</div>
		</div>
	);
};
